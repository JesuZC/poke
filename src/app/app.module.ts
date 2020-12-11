import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders} from './app.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';

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
import { TinycardsComponent } from './components/tinycards/tinycards.component';
import { CardsComponent } from './components/cards/cards.component';
import { FooterComponent } from './components/footer/footer.component';

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
    LoadVariousComponent,
    TinycardsComponent,
    CardsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
