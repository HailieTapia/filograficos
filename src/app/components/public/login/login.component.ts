import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common'; 
import { RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RecaptchaModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null; 
  successMessage: string | null = null;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Validación de email
      password: ['', [Validators.required, Validators.minLength(8)]], // Contraseña mínima de 8 caracteres
      recaptcha: ['', Validators.required], // Inicializa como string vacío
    });
  }

onSubmit() {
  this.errorMessage = null;
  this.successMessage = null;

  if (this.loginForm.valid) {
    this.loading = true;
    const { email, password, recaptcha } = this.loginForm.value;

    if (recaptcha) {
      this.authService.login({ email, password, recaptchaToken: recaptcha }).subscribe({
        next: (response: any) => {
          console.log(response);
          this.successMessage = 'Inicio de sesión exitoso';
          console.log('userId:', response.userId);
          console.log('tipo:', response.tipo);
          console.log('message:', response.message);
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Error en el inicio de sesión';
          setTimeout(() => {
            location.reload(); // Recargar la página completa
          }, 2000);
        },
        complete: () => {
          this.loading = false;
        }
      });
    } else {
      this.errorMessage = 'El reCAPTCHA es obligatorio.';
      this.loading = false;
    }
  }
}

  // Asegúrate de que el tipo de captchaResponse sea string
  onRecaptchaResolved(captchaResponse: string | null) {
    if (captchaResponse) {
      this.loginForm.patchValue({ recaptcha: captchaResponse }); // Almacena el token en el formulario
    }
  }
}
