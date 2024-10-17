import { Component,OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  userProfile: any = null;
  errorMessage: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUserProfile().subscribe({
      next: (profile) => {
        this.userProfile = profile; // Almacena el perfil del usuario
        console.log('userId:', profile.userId); 
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar el perfil.';
      }
    });
  }
}
