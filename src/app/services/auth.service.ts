// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/config'; // Importa el archivo de configuración

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseUrl; // Ahora usa la URL base desde el archivo de configuración

  constructor(private http: HttpClient) {}

  // Método para registrar un nuevo usuario
  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register/`, userData);
  }

  // Método para iniciar sesión
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login/`, credentials);
  }
  //RECUPERACION DE CONTRASE
  //iniciar el proceso de recuperación de contraseña
  recu(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/initiate-password-recovery`, credentials);
  }
  //verificar el código OTP
  verOTP(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/verify-otp`, credentials);
  }
  //reestablecer la contraseña
  resContra(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/reset-password`, credentials);
  }
 
}
