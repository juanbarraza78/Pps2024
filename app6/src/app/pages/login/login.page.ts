import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ngOnInit() {}
  router = inject(Router);
  fb = inject(FormBuilder);
  authService = inject(AuthFirebaseService);
  elementRef = inject(ElementRef);
  isToastOpen = false;

  constructor() {}

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
  onSubmit(): void {
    const value = this.form.getRawValue();
    this.authService.login(value.email, value.password).subscribe({
      next: () => {
        setTimeout(() => {
          this.router.navigateByUrl('/home');
          this.form.setValue({ email: '', password: '' });
        }, 1000);
      },
      error: () => {
        this.setOpen(true);
        this.form.setValue({ email: '', password: '' });
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
  userA() {
    this.form.setValue({ email: 'admin@admin.com', password: '111111' });
  }
  userB() {
    this.form.setValue({ email: 'invitado@invitado.com', password: '222222' });
  }
  userC() {
    this.form.setValue({
      email: 'usuario@usuario.com',
      password: '333333',
    });
  }
  userD() {
    this.form.setValue({
      email: 'anonimo@anonimo.com',
      password: '444444',
    });
  }
  userE() {
    this.form.setValue({
      email: 'tester@tester.com',
      password: '555555',
    });
  }
}
