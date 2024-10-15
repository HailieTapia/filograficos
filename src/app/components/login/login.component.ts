import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Asegúrate de que la ruta sea correcta
import { CommonModule } from '@angular/common'; // Importa CommonModule
import zxcvbn from 'zxcvbn';
import { RecaptchaModule } from 'ng-recaptcha'; // Importa el módulo aquí

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule,RecaptchaModule]
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;
  passwordStrength: string = '';
  passwordStrengthWidth: string = '';
  captchaSuccess: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.errorMessage = null;
    if (this.loginForm.invalid || !this.captchaSuccess) {
      this.errorMessage = 'Por favor, completa el formulario correctamente.';
      return;
    }

    this.loading = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('Inicio de sesión exitoso:', response);
        this.loading = false; // Reset loading state
        // Aquí puedes guardar el token en localStorage o en una cookie
        localStorage.setItem('token', response.token); // Asumiendo que la respuesta tiene un token
        this.router.navigate(['/dashboard']); // Redirigir a la página principal después de iniciar sesión
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'Error en el inicio de sesión.';
        console.error('Error en el inicio de sesión:', error);
        this.loading = false; // Reset loading state
      },
    });
  }

  checkPasswordStrength() {
    const password = this.loginForm.get('password')!.value; // Use non-null assertion operator
    const result = zxcvbn(password);
    this.passwordStrength = result.score === 0 ? 'Muy débil' :
                           result.score === 1 ? 'Débil' :
                           result.score === 2 ? 'Moderada' :
                           result.score === 3 ? 'Fuerte' : 'Muy fuerte';
    
    this.passwordStrengthWidth = `${(result.score + 1) * 20}%`; // Ancho de la barra
}
  onCaptchaSuccess() {
    this.captchaSuccess = true;
  }
}