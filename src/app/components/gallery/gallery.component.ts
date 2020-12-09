import { Component, OnInit, } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  public pokemons: [];
  public control?: any;
  constructor() {
    this.pokemons = [];
  }

  ngOnInit(): void {
    let list: any = localStorage.getItem('pokemonsGallery');
    this.pokemons = JSON.parse(list);
    console.log('all:  ' + this.pokemons, typeof this.pokemons, this.pokemons);
  }
  valueResponse(respuesta: any): void {
    this.control = this.pokemons.splice(respuesta, 1);
    console.log(this.pokemons);
   }
}
