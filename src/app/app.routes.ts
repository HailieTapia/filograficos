import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/public/login/login.component';
import { RegisterComponent } from './components/public/register/register.component';
import { RecuperaComponent } from './components/public/recupera/recupera.component';
import { NewPassComponent } from './components/public/newpass/newpass.component'; // Asegúrate de importar el componente
import { ProfileComponent } from './components/user/profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recupera', component: RecuperaComponent },
  { path: 'newpass', component: NewPassComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', redirectTo: '' } // Redirigir cualquier ruta no encontrada a Home
];
