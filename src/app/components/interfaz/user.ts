// src/models/user.interface.ts

export interface Direccion {
  calle?: string;
  ciudad?: string;
  estado?: string;
  codigo_postal?: string;
}

export interface User {
  nombre: string;
  email: string;
  telefono: string;
  direccion?: Direccion; // Direccion es opcional
  tipo_usuario?: 'cliente' | 'administrador'; // Valor por defecto: 'cliente'
  estado?: 'activo' | 'bloqueado' | 'pendiente'; // Valor por defecto: 'pendiente'
  mfa_activado?: boolean; // Indica si el MFA está activado
  verificacionCorreoToken?: string; // Token para verificar el correo
  verificacionCorreoExpira?: Date; // Fecha de expiración del token
  createdAt?: Date; // Campo generado automáticamente
  updatedAt?: Date; // Campo generado automáticamente
}
