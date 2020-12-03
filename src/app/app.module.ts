import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders} from './app.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { AsideComponent } from './components/aside/aside.component';
import { HeaderComponent } from './components/header/header.component';
import { ContainerComponent } from './components/container/container.component';
import { SearchComponent } from './components/search/search.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoadOneComponent } from './components/load-one/load-one.component';
import { LoadVariousComponent } from './components/load-various/load-various.component';

@NgModule({
  declarations: [
    AppComponent,
    AsideComponent,
    HeaderComponent,
    ContainerComponent,
    SearchComponent,
    GalleryComponent,
    UsuarioComponent,
    LoginComponent,
    RegistroComponent,
    LoadOneComponent,
    LoadVariousComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
