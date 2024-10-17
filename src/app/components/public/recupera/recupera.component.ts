import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recupera',
  standalone: true,
  templateUrl: './recupera.component.html',
  styleUrls: ['./recupera.component.css'],
  imports: [FormsModule]
})
export class RecuperaComponent {
  email: string = ''; // Variable para almacenar el correo electrónico
  otp: string = ''; // Variable para almacenar el código OTP

  isModalOpen = false; // Controla la visibilidad del modal

  constructor(private authService: AuthService, private router: Router) { }

  // Método para iniciar el proceso de recuperación de contraseña
  initiatePasswordRecovery(event: Event): void {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    if (!this.email) {
      alert('Por favor, ingresa tu correo electrónico.');
      return;
    }

    this.authService.recu({ email: this.email }).subscribe({
      next: (response) => {
        console.log(`Se envió un correo de recuperación a: ${this.email}`);
        this.openModal(); // Abrir modal de verificación de OTP
      },
      error: (error) => {
        alert('Error al enviar el correo de recuperación. Por favor, inténtalo de nuevo.');
        console.error(error);
      }
    });
  }

  // Método para verificar el código OTP
  verifyOTP(event: Event): void {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    if (!this.otp) {
      alert('Por favor, ingresa el código OTP.');
      return;
    }

    this.authService.verOTP({ email: this.email, otp: this.otp }).subscribe({
      next: (response) => {
        alert(response.message); // Mensaje de éxito
        this.closeModal(); // Cerrar modal
        // Redirigir al usuario después de la verificación del OTP
        this.router.navigate(['/newpass']); // Cambia '/reset-password' por la ruta de tu componente de restablecimiento

      },
      error: (error) => {
        alert(error.error.message); // Mostrar mensaje de error
        console.error(error);
      }
    });
  }

  // Método para cerrar el modal
  closeModal(): void {
    this.isModalOpen = false;
    this.resetFields(); // Reiniciar los campos al cerrar el modal
  }

  // Método para reiniciar los campos
  private resetFields(): void {
    this.otp = ''; // Limpiar el campo OTP
  }

  // Método para abrir el modal
  private openModal(): void {
    this.isModalOpen = true;
  }
}
