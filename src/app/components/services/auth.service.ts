// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/config'; // Importa el archivo de configuración
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.baseUrl}`; // Usar baseUrl para la API
  private userRoleSubject = new BehaviorSubject<string | null>(null);
  userRole$ = this.userRoleSubject.asObservable();

  constructor(private http: HttpClient) { }


  login(credentials: { email: string; password: string; recaptchaToken: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login/`, credentials).pipe(
      tap((response: any) => {
        this.userRoleSubject.next(response.tipo);
      })
    );
  }

  // Método para registrar un nuevo usuario
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register/`, userData);
  }
  //RECUPERACION DE CONTRASE
  //iniciar el proceso de recuperación de contraseña
  recu(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/initiate-password-recovery`, credentials);
  }
  //verificar el código OTP
  verOTP(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/verify-otp`, credentials);
  }
  //reestablecer la contraseña
  resContra(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/reset-password`, credentials);
  }
  // Método para obtener el perfil del usuario
  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/profile/`, { withCredentials: true }).pipe(
      tap((profile) => {
        // Aquí puedes manejar el perfil si es necesario
        console.log('Perfil del usuario:', profile);
      })
    );
  }

  // Método para cerrar sesión
  logout() {
    this.userRoleSubject.next(null); // Resetea el rol al cerrar sesión
  }

}
