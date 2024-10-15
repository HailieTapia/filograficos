import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-pass',
  standalone: true,
  templateUrl: './newpass.component.html',
  styleUrls: ['./newpass.component.css'],
  imports: [FormsModule]
})
export class NewPassComponent {
  email: string = ''; // Correo electrónico del usuario
  newPassword: string = ''; // Nueva contraseña
  confirmPassword: string = ''; // Confirmación de la nueva contraseña

  constructor(private authService: AuthService, private router: Router) {}

  resetPassword(event: Event): void {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    if (!this.newPassword || !this.confirmPassword) {
      alert('Por favor, completa ambos campos.');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    this.authService.resContra({ email: this.email, newPassword: this.newPassword }).subscribe({
      next: (response) => {
        alert('Contraseña restablecida con éxito.');
        this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
      },
      error: (error) => {
        alert('Error al restablecer la contraseña. Por favor, inténtalo de nuevo.');
        console.error(error);
      }
    });
  }
}
