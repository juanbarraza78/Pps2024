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
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonFab,
  IonFabButton,
  IonFabList,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { cuadroInterfaz } from 'src/app/interface/cuadros-interface';
import { COLORES } from 'src/app/models/colores';
import { ANIMALES } from 'src/app/models/animales';
import { NUMEROS } from 'src/app/models/numeros';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonFabList,
    IonFabButton,
    IonFab,
    IonImg,
    IonCol,
    IonRow,
    IonGrid,
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
  constructor() {}

  ngOnInit() {}

  // Injeccion
  authService = inject(AuthService);
  router = inject(Router);

  animales: cuadroInterfaz[] = ANIMALES;
  colores: cuadroInterfaz[] = COLORES;
  numeros: cuadroInterfaz[] = NUMEROS;
  tipo: string = 'animales';
  idioma: string = 'español';

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
  getImgTipo() {
    if (this.tipo == 'numeros') {
      return '../../../assets/numeros.png';
    } else if (this.tipo == 'colores') {
      return '../../../assets/paleta.png';
    } else {
      return '../../../assets/tortuga.png';
    }
  }
  getImgIdioma() {
    if (this.idioma == 'ingles') {
      return '../../../assets/ingles.png';
    } else if (this.idioma == 'español') {
      return '../../../assets/español.png';
    } else {
      return '../../../assets/portuges.png';
    }
  }
  public Reproducir(cuadro: cuadroInterfaz) {
    let audio = new Audio();
    if (this.idioma == 'español') {
      audio.src = cuadro.pathSonidoEspañol;
    } else if (this.idioma == 'ingles') {
      audio.src = cuadro.pathSonidoIngles;
    } else if (this.idioma == 'portugues') {
      audio.src = cuadro.pathSonidoPortugues;
    }
    audio.load();
    audio.play();
  }
  cambiarTipo(tipo: string) {
    this.tipo = tipo;
  }
  cambiarIdioma(idioma: string) {
    this.idioma = idioma;
  }
}
