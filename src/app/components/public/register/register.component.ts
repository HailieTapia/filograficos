import { Component, OnInit } from '@angular/core'; // Importa Component y OnInit desde Angular core
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Importa herramientas para construir formularios reactivos
import { Router } from '@angular/router'; // Importa Router para la navegación
import { AuthService } from '../../services/auth.service'; // Importa el servicio de autenticación
import { CommonModule } from '@angular/common'; // Importa CommonModule
import zxcvbn from 'zxcvbn';

@Component({
  selector: 'app-register', // Nombre del selector para este componente
  standalone: true, // Indica que este componente es autónomo
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

  ngOnInit(): void { } //ciclo de vida 

  get f() { // Método para obtener los controles del formulario
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