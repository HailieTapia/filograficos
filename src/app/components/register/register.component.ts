import { Component, OnInit } from '@angular/core'; // Importa Component y OnInit desde Angular core
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms'; // Importa herramientas para construir formularios reactivos
import { Router } from '@angular/router'; // Importa Router para la navegación
import { AuthService } from '../../services/auth.service'; // Importa el servicio de autenticación
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-register', // Nombre del selector para este componente
  standalone: true, // Indica que este componente es autónomo
  templateUrl: './register.component.html', // Ruta al archivo HTML del componente
  styleUrls: ['./register.component.css'], // Ruta a los estilos del componente
  imports: [CommonModule, ReactiveFormsModule]})
export class RegisterComponent implements OnInit { // Define la clase del componente que implementa OnInit
  registerForm: FormGroup; // Variable para almacenar el formulario reactivo
  loading = false; // Variable para manejar el estado de carga
  errorMessage: string | null = null; // Variable para almacenar mensajes de error

  constructor(
    private fb: FormBuilder, // Inyecta FormBuilder para crear formularios
    private authService: AuthService, // Inyecta AuthService para manejar la autenticación
    private router: Router // Inyecta Router para la navegación
  ) {
    // Inicializa el formulario con validaciones
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required]], // Campo nombre: requerido
      email: ['', [Validators.required, Validators.email]], // Campo email: requerido y debe ser un email válido
      telefono: ['', [Validators.required]], // Campo teléfono: requerido
      password: ['', [Validators.required, Validators.minLength(8)]], // Campo contraseña: requerido y mínimo 8 caracteres
      tipo_usuario: ['', [Validators.required]], // Campo tipo_usuario: requerido
      mfa_activado: [false] // Campo mfa_activado: valor por defecto false
    });
  }

  ngOnInit(): void {} // Método del ciclo de vida que se ejecuta al inicializar el componente

  get f() { // Método para obtener los controles del formulario
    return this.registerForm.controls; // Devuelve los controles del formulario para facilitar el acceso
  }

  onSubmit() { // Método que se ejecuta al enviar el formulario
    this.errorMessage = null; // Reinicia el mensaje de error
    if (this.registerForm.invalid) { // Verifica si el formulario es válido
      return; // Si no es válido, sale del método
    }

    this.loading = true; // Cambia el estado a cargando

    // Llama al método de registro del servicio de autenticación
    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => { // Maneja la respuesta exitosa
        console.log('Registro exitoso:', response); // Imprime la respuesta en la consola
        this.loading = false; // Restablece el estado de carga
        this.router.navigate(['/']); 
      },
      error: (error) => { 
        this.errorMessage = error.error.message || 'Error en el registro.'; // Almacena el mensaje de error
        console.error('Error en el registro:', error); // Imprime el error en la consola
        this.loading = false; // Restablece el estado de carga
      },
    });
  }
}
