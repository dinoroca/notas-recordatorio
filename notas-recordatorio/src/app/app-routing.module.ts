import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authenticatedUserGuard } from './guards/authenticated-user.guard';
import { authUserGuard } from './guards/auth-user.guard';

const routes: Routes = [
  //Lazy load de mudulo auth
  {
    path: 'auth',
    loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule),
    canActivate: [authenticatedUserGuard]
  },

  // Lazy load del módulo user (requiere autenticación)
  {
    path: 'user',
    loadChildren: () => import('./components/user/user.module').then(m => m.UserModule),
    canActivate: [authUserGuard]
  },

  //Rutas del modulo main (Acceso publico)
  {
    path: '',
    loadChildren: () => import('./components/main/main.module').then(m => m.MainModule),
    canActivate: [authenticatedUserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
