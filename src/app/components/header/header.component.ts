import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userRole: string | null = null;
  isNightMode: boolean = false; 

  constructor(private authService: AuthService) {}

  toggleTheme() {
    this.isNightMode = !this.isNightMode;
  }

  ngOnInit() {
    this.authService.userRole$.subscribe((role) => {
      this.userRole = role;
    });
  }
}
