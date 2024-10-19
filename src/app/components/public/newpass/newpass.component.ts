import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-new-pass',
  standalone: true,
  templateUrl: './newpass.component.html',
  styleUrls: ['./newpass.component.css'],
  imports: [FormsModule,CommonModule],
})
export class NewPassComponent implements OnInit {
  email: string = ''; 
  newPassword: string = ''; 
  confirmPassword: string = ''; 
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute 
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.email = params['email']; 
    });
  }

  resetPassword(event: Event): void {
    event.preventDefault(); 

    this.successMessage = '';
    this.errorMessage = '';

    if (!this.newPassword || !this.confirmPassword) {
      this.errorMessage = 'Por favor, completa ambos campos.';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    this.authService.resContra({ email: this.email, newPassword: this.newPassword }).subscribe({
      next: (response) => {
        this.successMessage = 'Contraseña restablecida con éxito.';
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.errorMessage = 'Error al restablecer la contraseña. Por favor, inténtalo de nuevo.';
        console.error(error);
      }
    });
  }
}
