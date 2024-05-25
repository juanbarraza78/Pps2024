import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { PasoUnaVezService } from 'src/app/services/paso-una-vez.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {
  router = inject(Router);
  auth = inject(AuthFirebaseService);
  pasoUnaVezService = inject(PasoUnaVezService);
  ngOnInit() {
    setTimeout(() => {
      this.pasoUnaVezService.pasoUnaVez = true;
      if (this.auth.currentUserSig()) {
        this.router.navigateByUrl('/home');
      } else {
        this.router.navigateByUrl('/login');
      }
    }, 6000);
  }
}
