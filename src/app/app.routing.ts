import { ModuleWithProviders} from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// principal

import {LoginComponent} from './components/login/login.component';
import {RegistroComponent} from './components/registro/registro.component';

import {UsuarioComponent} from './components/usuario/usuario.component';
import {ContainerComponent} from './components/container/container.component';
import {SearchComponent} from './components/search/search.component';
import {GalleryComponent} from './components/gallery/gallery.component';
// routes
const appRoutes: Routes = [
    {path: 'profile', component: UsuarioComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegistroComponent},
    {path: '', component: SearchComponent},
    {path: 'gallery', component: GalleryComponent},
    {path: '**', component: ContainerComponent},
];
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);
