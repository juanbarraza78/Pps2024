import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { FirestorageService } from 'src/app/services/firestorage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  authService = inject(AuthFirebaseService);
  router = inject(Router);
  elementRef = inject(ElementRef);
  fb = inject(FormBuilder);
  isToastOpen = false;
  firestoreUser = inject(FirestorageService);

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
          const userAux = {
            email: value.email,
            perfil: 'usuario',
            sexo: 'indefinido',
            cantidadJotaCoins: 0,
            codigosUtilizados: [],
          };
          this.firestoreUser.createUser(userAux);
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
