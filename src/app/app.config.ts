import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';  // Importa tus rutas

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),  // Configura HttpClient para usar fetch
    provideRouter(routes),           // Configura el enrutador con las rutas
    // Puedes agregar más configuraciones aquí, como interceptores o servicios adicionales
  ]
};

