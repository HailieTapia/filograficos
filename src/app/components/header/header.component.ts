import { Component } from '@angular/core';
import { faSearch, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  faSearch = faSearch;
  faShoppingCart = faShoppingCart;
  faUser = faUser;

  userRole: string = 'guest'; // Puede ser 'admin', 'client', 'guest'
  isAuthenticated: boolean = false; // Cambia este valor basado en la autenticación real
  isDarkMode: boolean = false; // Definido para el modo oscuro

  constructor(private router: Router) {}

  login() {
    this.router.navigate(['/login']);
  }

  createAccount() {
    this.router.navigate(['/register']);
  }

  logout() {
    // Implementa la lógica de cierre de sesión aquí
    this.isAuthenticated = false;
    this.userRole = 'guest'; // Vuelve a un estado no autenticado
  }
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
}

}
