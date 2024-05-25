import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { PasoUnaVezService } from '../services/paso-una-vez.service';

export const pasoUnaVezGuard: CanActivateFn = (route, state) => {
  const asoUnaVezService = inject(PasoUnaVezService);
  return !asoUnaVezService.pasoUnaVez;
};
