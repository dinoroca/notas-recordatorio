import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const authenticatedUserGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.isAutenticatedUser()) {
    router.navigate(['/user']);
    return false;
  }

  return true;
};
