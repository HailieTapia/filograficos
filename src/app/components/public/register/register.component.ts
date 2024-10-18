import { Component, OnInit } from '@angular/core'; // Importa Component y OnInit desde Angular core
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Importa herramientas para construir formularios reactivos
import { Router } from '@angular/router'; // Importa Router para la navegación
import { AuthService } from '../../services/auth.service'; // Importa el servicio de autenticación
import { CommonModule } from '@angular/common'; // Importa CommonModule

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

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required,Validators.pattern(/^[a-zA-Z\s]+$/) , Validators.minLength(3), Validators.maxLength(20)]], 
      email: ['', [Validators.required, Validators.email]], 
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]], 
      tipo_usuario: ['cliente'], 
      mfa_activado: [false] 
    });
  }

  ngOnInit(): void { } // Método del ciclo de vida que se ejecuta al inicializar el componente

  get f() { // Método para obtener los controles del formulario
    return this.registerForm.controls; // Devuelve los controles del formulario para facilitar el acceso
  }
  onSubmit() { // Método que se ejecuta al enviar el formulario
    this.errorMessage = null; // Reinicia el mensaje de error
    this.successMessage = null; // Reinicia el mensaje de éxito
    if (this.registerForm.invalid) { // Verifica si el formulario es inválido
      return; // Sale si hay errores en el formulario
    }
  
    this.loading = true; // Cambia el estado de carga a verdadero
    const formData = this.registerForm.value; // Obtiene los valores del formulario
  
    // Llama al servicio de autenticación para registrar al usuario
    this.authService.register(formData).subscribe(
      response => {
        // Maneja la respuesta exitosa
        this.loading = false; // Cambia el estado de carga a falso
        this.successMessage = "¡Registro exitoso! Se ha enviado un boton a su correo, presionelo para poder dar de alta su cuenta."; // Establece un mensaje de éxito
        // Opcionalmente, redirige después de un breve retraso
        setTimeout(() => {
          this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
        }, 8000); // Espera 2 segundos antes de redirigir
      },
      error => {
        // Maneja el error
        this.loading = false; // Cambia el estado de carga a falso
        this.errorMessage = error.error.message || 'Error al crear la cuenta. Inténtalo de nuevo.'; // Establece un mensaje de error
      }
    );
  }
  
}
