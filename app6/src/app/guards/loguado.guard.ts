import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthFirebaseService } from '../services/auth-firebase.service';

export const loguadoGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthFirebaseService);
  if (auth.currentUserSig()) {
    return true;
  } else {
    return false;
  }
};
