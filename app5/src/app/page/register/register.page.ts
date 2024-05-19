import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  IonItem,
  IonInput,
  IonToast,
  IonChip,
  IonAvatar,
  IonLabel,
  IonIcon,
  IonText,
  IonRow,
  IonCol,
  IonFabButton,
  IonFab,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonFab,
    IonFabButton,
    IonCol,
    IonRow,
    IonText,
    IonIcon,
    IonLabel,
    IonAvatar,
    IonChip,
    IonToast,
    IonInput,
    IonItem,
    IonButtons,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class RegisterPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  authService = inject(AuthService);
  router = inject(Router);
  elementRef = inject(ElementRef);
  fb = inject(FormBuilder);
  isToastOpen = false;

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    username: ['', Validators.required],
  });

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  onSubmit(): void {
    const value = this.form.getRawValue();
    this.authService
      .register(value.email, value.username, value.password)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/home');
        },
        error: () => {
          this.setOpen(true);
        },
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
  logout(): void {
    this.authService.logout();
  }
}
