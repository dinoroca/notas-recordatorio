import { Component } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  //Onyección de dependencia para llamar al servicio
  constructor(private themeService: ThemeService) {}

  //Función para camboar els ervicio
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  //Función booleana para obtener el tema mediante el servicio
  // devuelve true si es dark y false si es light
  isDarkTheme(): boolean {
    return this.themeService.isDark();
  }

}
