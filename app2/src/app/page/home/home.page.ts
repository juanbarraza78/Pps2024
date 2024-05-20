import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonIcon,
  IonNavLink,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { FirebaseChatService } from 'src/app/service/firebase-chat.service';
import { messageInterface } from 'src/app/interface/message.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
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
    ReactiveFormsModule,
    NgFor,
    CommonModule,
  ],
})
export class HomePage implements OnInit {
  constructor() {}

  authService = inject(AuthService);
  router = inject(Router);
  chat = inject(FirebaseChatService);
  fb = inject(FormBuilder);

  goRegister() {
    this.router.navigateByUrl('/register');
  }

  goLogin() {
    this.router.navigateByUrl('/login');
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }

  goChat4A() {
    this.router.navigateByUrl('/chat4a');
  }

  goChat4B() {
    this.router.navigateByUrl('/chat4b');
  }
  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  estaActivo = true;

  cambiarEstado() {
    this.estaActivo = !this.estaActivo;
  }

  messages?: messageInterface[] = [];

  ngOnInit() {}
}
