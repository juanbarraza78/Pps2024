import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSpinner,
  IonButton,
  IonButtons,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/service/storage.service';
import { DataService } from 'src/app/service/data.service';
import { imgIdInterface } from 'src/app/interface/img-interface';
import { GraficoBarrasComponent } from 'src/app/components/grafico-barras/grafico-barras.component';
import { GraficoBarrasRealComponent } from 'src/app/components/grafico-barras-real/grafico-barras-real.component';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.page.html',
  styleUrls: ['./grafico.page.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonButton,
    IonSpinner,
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
export class GraficoPage implements OnInit {
  // Injecciones
  router = inject(Router);
  firestorage = inject(StorageService);
  data = inject(DataService);
  images: imgIdInterface[] = [];

  ngOnInit() {
    this.firestorage.getImgs().subscribe((imgs) => {
      this.images = imgs;
    });
    this.data.agregarLikes();
    this.data.agregarDislikes();
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }
}
