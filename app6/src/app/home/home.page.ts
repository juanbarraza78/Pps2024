import { Component, OnInit, inject } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { LensFacing, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AuthFirebaseService } from '../services/auth-firebase.service';
import { Router } from '@angular/router';
import { FirestorageService } from '../services/firestorage.service';
import { User, UserId } from '../interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  segment = 'scan';
  qrText = 'Jota';
  scanResoult = '';
  jotaCoins: number = 0;

  usuarios?: UserId[];

  platform = inject(Platform);
  authService = inject(AuthFirebaseService);
  router = inject(Router);
  firestoreUser = inject(FirestorageService);

  // Toast
  isToastOpenCorrecto = false;
  setOpenCorrecto(isOpen: boolean) {
    this.isToastOpenCorrecto = isOpen;
  }
  isToastOpen = false;
  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
  isToastOpenCodigoInvalido = false;
  setOpenCodigoInvalido(isOpen: boolean) {
    this.isToastOpenCodigoInvalido = isOpen;
  }
  isToastOpenCantidad = false;
  setOpenCantidad(isOpen: boolean) {
    this.isToastOpenCantidad = isOpen;
  }

  constructor(private modalController: ModalController) {}
  ngOnInit(): void {
    if (this.platform.is('capacitor')) {
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners();
    }
    this.firestoreUser.getUsers().subscribe((users) => {
      this.usuarios = users;
      // console.log(this.usuarios);
      users.forEach((user) => {
        if (user.email == this.authService.currentUserSig()?.email) {
          this.jotaCoins = user.cantidadJotaCoins;
        }
      });
    });
  }

  // Ruteo
  goRegister() {
    this.router.navigateByUrl('/register');
  }

  goLogin() {
    this.router.navigateByUrl('/login');
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }
  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  // Main
  async startScan() {
    const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent,
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: {
        formats: [],
        lensfacing: LensFacing.Back,
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.scanResoult = data?.barcode?.displayValue;
    }
  }

  async scanearJotaCoins() {
    await this.startScan();
    //primero copara si el codigo es uno de los validos
    if (this.compararCodigo(this.scanResoult)) {
      this.usuarios?.forEach((user) => {
        if (user.email == this.authService.currentUserSig()?.email) {
          //comparo si es admin
          if (user.perfil == 'admin') {
            //Ver si contiene 2 veces el string en el array sino darle el ok
            const ocurrencias = user.codigosUtilizados.filter(
              (string) => string == this.scanResoult
            ).length;
            if (ocurrencias < 2) {
              //dar ok
              this.agregarCoinsCorrespondiente(user.id, user);
              this.setOpenCorrecto(true);
            } else {
              this.setOpenCantidad(true);
            }
          } else {
            //Ver si contiene 2 veces el string en el array sino darle el ok
            const ocurrencias = user.codigosUtilizados.filter(
              (string) => string == this.scanResoult
            ).length;
            if (ocurrencias < 1) {
              //dar ok
              this.agregarCoinsCorrespondiente(user.id, user);
              this.setOpenCorrecto(true);
            } else {
              this.setOpenCantidad(true);
            }
          }
        }
      });
    } else {
      this.setOpenCodigoInvalido(true);
    }
  }
  compararCodigo(codigo: string) {
    if (
      codigo == '8c95def646b6127282ed50454b73240300dccabc' ||
      codigo == 'ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 ' ||
      codigo == '2786f4877b9091dcad7f35751bfcf5d5ea712b2f'
    ) {
      return true;
    }
    return false;
  }
  agregarCoinsCorrespondiente(id: string, user: User) {
    let cantidadActualizada = user.cantidadJotaCoins;
    let arrayAux: string[] = user.codigosUtilizados;
    let flag = false;

    if (this.scanResoult == '8c95def646b6127282ed50454b73240300dccabc') {
      flag = true;
      cantidadActualizada += 10;
      arrayAux.push('8c95def646b6127282ed50454b73240300dccabc');
    } else if (
      this.scanResoult == 'ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 '
    ) {
      flag = true;
      cantidadActualizada += 50;
      arrayAux.push('ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 ');
    } else if (this.scanResoult == '2786f4877b9091dcad7f35751bfcf5d5ea712b2f') {
      flag = true;
      cantidadActualizada += 100;
      arrayAux.push('2786f4877b9091dcad7f35751bfcf5d5ea712b2f');
    }
    if (flag) {
      const userAux: User = {
        email: user.email,
        perfil: user.perfil,
        sexo: user.sexo,
        cantidadJotaCoins: cantidadActualizada,
        codigosUtilizados: arrayAux,
      };
      this.firestoreUser.updateUser(id, userAux);
    }
  }
  borrarCoins() {
    this.usuarios?.forEach((user) => {
      if (user.email == this.authService.currentUserSig()?.email) {
        const userAux: User = {
          email: user.email,
          perfil: user.perfil,
          sexo: user.sexo,
          cantidadJotaCoins: 0,
          codigosUtilizados: [],
        };
        this.firestoreUser.updateUser(user.id, userAux);
        this.setOpen(true);
      }
    });
  }
}
