import { Component ,OnInit} from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-recupera',
  standalone: true,
  templateUrl: './recupera.component.html',
  styleUrls: ['./recupera.component.css'],
  imports: [FormsModule, CommonModule]
})
export class RecuperaComponent implements OnInit {
  email: string = '';
  otp: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  isModalOpen = false;
  recoveryForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.recoveryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', Validators.required],
    });
  }
  ngOnInit(): void {}
  get f() {
    return this.recoveryForm.controls;
  }
  initiatePasswordRecovery(event: Event): void {
    event.preventDefault();

    if (!this.email) {
      this.errorMessage = 'Por favor, ingresa tu correo electrónico.';
      return;
    }

    this.authService.recu({ email: this.email }).subscribe({
      next: (response) => {
        this.successMessage = 'Se envió un correo de recuperación a: ${this.email}';
        this.successMessage = 'Se ha enviado un correo de recuperación.';
        this.errorMessage = '';
        this.openModal();
      },
      error: (error) => {
        this.errorMessage = 'Error al enviar el correo de recuperación. Por favor, inténtalo con un correo válido.';
        this.successMessage = '';
        console.error(error);
      }
    });
  }

  verifyOTP(event: Event): void {
    event.preventDefault();

    if (!this.otp) {
      this.errorMessage = 'Por favor, ingresa el código OTP.';
      return;
    }

    this.authService.verOTP({ email: this.email, otp: this.otp }).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        this.errorMessage = '';
        this.closeModal();
        setTimeout(() => {
          // Redirige al NewPassComponent pasando el email
          this.router.navigate(['/newpass', this.email]);
        }, 2000);
      },
      error: (error) => {
        this.errorMessage = error.error.message;
        this.successMessage = '';
        console.error(error);
      }
    });
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.resetFields(); // Reiniciar los campos al cerrar el modal
  }

  private resetFields(): void {
    this.otp = ''; // Limpiar el campo OTP
  }

  // Método para abrir el modal
  private openModal(): void {
    this.isModalOpen = true;
  }
}