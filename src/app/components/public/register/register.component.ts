import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; 
import { CommonModule } from '@angular/common';
import zxcvbn from 'zxcvbn';

@Component({
  selector: 'app-register', 
  standalone: true, 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  isPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑäöüÄÖÜ\s]+$/), Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email], Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      tipo_usuario: ['cliente'],
      mfa_activado: [false]
    });
  }
  passwordStrength(password: string): number {
    return zxcvbn(password).score;
  }

  getPasswordStrengthClass(score: number): string {
    switch (score) {
      case 0:
        return 'Insuficiente';
      case 1:
        return 'Baja';
      case 2:
        return 'Moderada';
      case 3:
        return 'Fuerte';
      case 4:
        return 'Robusta';
      default:
        return 'Desconocida';
    }
  }

  ngOnInit(): void { } 

  get f() { 
    return this.registerForm.controls; 
  }
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  toggleConfirmPasswordVisibility() {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }
  onSubmit() {
    this.errorMessage = null;
    this.successMessage = null;
    if (this.registerForm.invalid) {
      return;
    }
    // Validar la fortaleza de la contraseña
    const passwordScore = this.passwordStrength(this.registerForm.get('password')!.value);
    if (passwordScore < 4) {
      this.errorMessage = 'La contraseña debe ser robusta.';
      return;
    }
    this.loading = true;
    const formData = this.registerForm.value; // los valores del formulario

    this.authService.register(formData).subscribe({
      next: (response) => {
        this.loading = false;
        this.successMessage = "¡Registro exitoso! Ha recibido un correo con instrucciones para activar su cuenta.";
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 7000);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error.message || 'Error al crear la cuenta. Inténtalo de nuevo.';
      }
    });
  }
}