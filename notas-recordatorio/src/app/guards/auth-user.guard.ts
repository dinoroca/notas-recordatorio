import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const authUserGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (!userService.isAutenticatedUser()) {
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};
