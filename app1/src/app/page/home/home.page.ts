import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonIcon,
  IonNavLink,
  IonAlert,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import {
  DeviceMotion,
  DeviceMotionAccelerationData,
} from '@ionic-native/device-motion/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonAlert,
    IonNavLink,
    IonIcon,
    IonButtons,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class HomePage implements OnInit {
  //Injecciones
  auth = inject(AuthService);
  authService = inject(AuthService);
  router = inject(Router);
  deviceMotion = inject(DeviceMotion);
  flashlight = inject(Flashlight);
  vibration = inject(Vibration);

  audioIzquierda = '../../../assets/sonidos/1.mp3';
  audioDerecha = '../../../assets/sonidos/2.mp3';
  audioVertical = '../../../assets/sonidos/3.mp3';
  audioHorizontal = '../../../assets/sonidos/4.mp3';

  posicionActualCelular = 'plano';
  accionActivo: boolean = false;
  subscription: any;
  accelerationX: any;
  accelerationY: any;
  accelerationZ: any;
  estaBloqueado: boolean = false;

  constructor() {}

  //Form - Alert
  async formAlert() {
    const { value: password } = await Swal.fire({
      title: 'Ingrese su contraseña',
      input: 'password',
      heightAuto: false,
      inputAttributes: {
        autocapitalize: 'off',
      },
      confirmButtonText: 'DESACTIVAR',
    });
    if (password) {
      this.authService
        .login(this.authService.currentUserSig()?.email || '', password)
        .subscribe({
          next: () => {
            this.cambiarBloqueado();
          },
          error: () => {
            this.incorrecto();
          },
        });
    }
  }
  //Ruteo
  goRegister() {
    this.router.navigateByUrl('/register');
  }
  goLogin() {
    this.router.navigateByUrl('/login');
  }
  goHome() {
    this.router.navigateByUrl('/home');
  }
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
  //Init - Destroy
  ngOnInit() {}
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  //Main
  playSound(soundFile: string) {
    const audio = new Audio(`assets/sounds/${soundFile}`);
    audio.play();
    audio.onended = () => {
      this.accionActivo = false;
    };
  }
  turnOnLight(miliSecond: number) {
    this.flashlight.switchOn();
    setTimeout(() => {
      this.flashlight.switchOff();
    }, miliSecond);
  }
  vibrate(miliSecond: number) {
    this.vibration.vibrate(miliSecond);
  }
  cambiarBloqueado() {
    if (this.estaBloqueado) {
      this.estaBloqueado = false;
      this.stopMotionHandle();
    } else {
      this.estaBloqueado = true;
      this.startMotionHandle();
    }
  }
  startMotionHandle() {
    this.subscription = this.deviceMotion
      .watchAcceleration({ frequency: 300 })
      .subscribe((acceleration: DeviceMotionAccelerationData) => {
        this.accelerationX = Math.floor(acceleration.x);
        this.accelerationY = Math.floor(acceleration.y);
        this.accelerationZ = Math.floor(acceleration.z);
        if (
          acceleration.x > 5 &&
          acceleration.x < 10 &&
          this.posicionActualCelular != 'Izquierda' &&
          this.accionActivo == false
        ) {
          this.izquierda();
        } else if (
          acceleration.x < -5 &&
          acceleration.x > -10 &&
          this.posicionActualCelular != 'Derecha' &&
          this.accionActivo == false
        ) {
          this.derecha();
        } else if (
          (acceleration.y >= 9 || acceleration.y <= -10) &&
          this.posicionActualCelular != 'Vertical' &&
          this.accionActivo == false
        ) {
          this.vertical();
        } else if (
          (acceleration.x <= -10 || acceleration.x >= 10) &&
          this.posicionActualCelular != 'Horizontal' &&
          this.accionActivo == false
        ) {
          this.hotizontal();
        }
      });
  }
  stopMotionHandle() {
    this.subscription.unsubscribe();
  }
  izquierda() {
    this.accionActivo = true;
    this.posicionActualCelular = 'Izquierda';
    this.vibrate(2000);
    this.playSound(this.audioIzquierda);
  }
  derecha() {
    this.accionActivo = true;
    this.posicionActualCelular = 'Derecha';
    this.vibrate(2000);
    this.playSound(this.audioDerecha);
  }
  vertical() {
    this.accionActivo = true;
    this.posicionActualCelular = 'Vertical';
    this.turnOnLight(5000);
    this.playSound(this.audioVertical);
  }
  hotizontal() {
    this.accionActivo = true;
    this.posicionActualCelular = 'Horizontal';
    this.vibrate(5000);
    this.playSound(this.audioHorizontal);
  }
  incorrecto() {
    this.vibrate(5000);
    this.turnOnLight(5000);
    this.playSound(this.audioHorizontal);
  }
}
