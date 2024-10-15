import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RecuperaComponent } from './components/recupera/recupera.component';
import { NewPassComponent } from './components/newpass/newpass.component'; // Asegúrate de importar el componente

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recupera', component: RecuperaComponent },
  { path: 'newpass', component: NewPassComponent },
  { path: '**', redirectTo: '' } // Redirigir cualquier ruta no encontrada a Home
];
