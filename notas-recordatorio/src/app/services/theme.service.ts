// theme.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkTheme: boolean = false;

  constructor() {

    //Inicializa el tema obteniendo desde localstorage
    const localTheme = localStorage.getItem('theme');
    if (localTheme) {
      this.isDarkTheme = localTheme === 'dark';
    }
    this.applyTheme();
  }

  //Función que cambia el tema en función al click
  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
    this.applyTheme();
  }

  //Función que aplica el tema en función al click
  private applyTheme(): void {
    const theme = this.isDarkTheme ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', theme);
  }

  //Devuelve true o false dependiendo de si el tema es dark o light
  isDark(): boolean {
    return this.isDarkTheme;
  }
}