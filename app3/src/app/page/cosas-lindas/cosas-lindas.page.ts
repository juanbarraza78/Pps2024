import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonFooter,
  IonButtons,
  IonImg,
  IonIcon,
  IonButton,
  IonFab,
  IonFabButton,
  IonFabList,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
} from '@angular/fire/storage';
import { StorageService } from 'src/app/service/storage.service';
import { AuthService } from 'src/app/service/auth.service';
import { imgIdInterface, imgInterface } from 'src/app/interface/img-interface';
import { GraficoBarrasComponent } from 'src/app/components/grafico-barras/grafico-barras.component';
import { DataService } from 'src/app/service/data.service';
import { GraficoBarrasRealComponent } from 'src/app/components/grafico-barras-real/grafico-barras-real.component';

@Component({
  selector: 'app-cosas-lindas',
  templateUrl: './cosas-lindas.page.html',
  styleUrls: ['./cosas-lindas.page.scss'],
  standalone: true,
  imports: [
    IonFabList,
    IonFabButton,
    IonFab,
    IonButton,
    IonIcon,
    IonImg,
    IonButtons,
    IonFooter,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    GraficoBarrasComponent,
    GraficoBarrasRealComponent,
  ],
})
export class CosasLindasPage implements OnInit {
  router = inject(Router);
  storage = inject(Storage);
  firestorage = inject(StorageService);
  authService = inject(AuthService);
  data = inject(DataService);

  images: imgIdInterface[] = [];

  constructor() {}

  likeImg(id: string, img: imgIdInterface) {
    let likeActualizado;
    let arrayActualizado = img.listaLikes;

    let index = img.listaLikes.indexOf(
      this.authService.currentUserSig()?.email || 'Usuario anonimo'
    );
    if (index != -1) {
      likeActualizado = --img.likes;
      arrayActualizado = arrayActualizado.filter(
        (user) => user !== this.authService.currentUserSig()?.email
      );
    } else {
      likeActualizado = ++img.likes;
      arrayActualizado.push(
        this.authService.currentUserSig()?.email || 'Usuario anonimo'
      );
    }
    this.firestorage.updateImg(id, {
      date: img.date,
      likes: likeActualizado,
      listaLikes: arrayActualizado,
      listaDislikes: img.listaDislikes,
      dislikes: img.dislikes,
      user: img.user,
      url: img.url,
      lindoFeo: img.lindoFeo,
    });
  }

  disLikeImg(id: string, img: imgIdInterface) {
    let likeActualizado;
    let arrayActualizado = img.listaDislikes;

    let index = img.listaDislikes.indexOf(
      this.authService.currentUserSig()?.email || 'Usuario anonimo'
    );
    if (index != -1) {
      likeActualizado = --img.dislikes;
      arrayActualizado = arrayActualizado.filter(
        (user) => user !== this.authService.currentUserSig()?.email
      );
    } else {
      likeActualizado = ++img.dislikes;
      arrayActualizado.push(
        this.authService.currentUserSig()?.email || 'Usuario anonimo'
      );
    }
    this.firestorage.updateImg(id, {
      date: img.date,
      likes: img.likes,
      listaLikes: img.listaLikes,
      listaDislikes: arrayActualizado,
      dislikes: likeActualizado,
      user: img.user,
      url: img.url,
      lindoFeo: img.lindoFeo,
    });
  }

  goRegister() {
    this.router.navigateByUrl('/register');
  }

  goLogin() {
    this.router.navigateByUrl('/login');
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }

  goCosasLindas() {
    this.router.navigateByUrl('/cosas-lindas');
  }

  goCosasFeas() {
    this.router.navigateByUrl('/cosas-feas');
  }

  ngOnInit() {
    this.firestorage.getImgs().subscribe((imgs) => {
      imgs.sort(this.compararFechas);
      this.images = imgs;
    });

    this.data.agregarLikes();
    this.data.agregarDislikes();
  }

  async takeFoto() {
    console.log(this.router.url);
    try {
      if (Capacitor.getPlatform() != 'web') Camera.requestPermissions();
      const image = await Camera.getPhoto({
        quality: 40,
        source: CameraSource.Prompt,
        // allowEditing: false,
        width: 600,
        resultType: CameraResultType.DataUrl,
      });
      const blob = this.dataURLtoblob(image.dataUrl);
      const url = await this.uploadImage(blob, image);
      let imgNuevo;
      if (this.router.url == '/cosas-lindas') {
        imgNuevo = {
          date: new Date(),
          likes: 0,
          dislikes: 0,
          listaLikes: [],
          listaDislikes: [],
          user: this.authService.currentUserSig()?.email || 'Usuario anonimo',
          url: url,
          lindoFeo: '/cosas-lindas',
        };
      } else {
        imgNuevo = {
          date: new Date(),
          likes: 0,
          dislikes: 0,
          listaLikes: [],
          listaDislikes: [],
          user: this.authService.currentUserSig()?.email || 'Usuario anonimo',
          url: url,
          lindoFeo: '/cosas-feas',
        };
      }
      this.firestorage.createImg(imgNuevo);
    } catch (e) {
      console.log(e);
    }
  }

  dataURLtoblob(dataUrl: any) {
    var arr = dataUrl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  async uploadImage(blob: any, imageData: any) {
    try {
      const currentDate = Date.now();
      const filePath = `app3/${currentDate}.${imageData.format}`;
      const fileRef = ref(this.storage, filePath);
      const task = await uploadBytes(fileRef, blob);
      console.log('task:', task);
      const url = getDownloadURL(fileRef);
      return url;
    } catch (e) {
      throw e;
    }
  }

  compararFechas(a: imgInterface, b: imgInterface) {
    if (a.date < b.date) {
      return 1;
    }
    if (a.date > b.date) {
      return -1;
    }
    return 0;
  }
}
