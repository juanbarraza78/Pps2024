import { Component, inject } from '@angular/core';
import { AuthFirebaseService } from './services/auth-firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  authService = inject(AuthFirebaseService);
  router = inject(Router);

  ngOnInit(): void {
    this.router.navigateByUrl('/');

    this.authService.user$.subscribe((user) => {
      if (user) {
        this.authService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!,
        });
      } else {
        this.authService.currentUserSig.set(null);
      }
      // console.log(this.authService.currentUserSig());
    });
  }
}
