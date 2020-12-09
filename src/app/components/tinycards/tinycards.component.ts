import { Component, OnInit , Input} from '@angular/core';
import { LoadVariousService } from './../../services/loadVarious.service';

@Component({
  selector: 'app-tinycards',
  templateUrl: './tinycards.component.html',
  styleUrls: ['./tinycards.component.scss']
})
export class TinycardsComponent implements OnInit {
  @Input () pokemon?: any;
  public resp: any;
  constructor(
    public _loadVariousService: LoadVariousService
  ) { }

  ngOnInit(): void {
    this.resp = this._loadVariousService.getOneByOne(this.pokemon.pokemon.url).subscribe({
      next: data => {
        this.pokemon.pokemon.front = data.sprites.front_default;
        this.pokemon.pokemon.back = data.sprites.back_default;
        this.resp = data;
      },
      error: error => {
          console.log(this.pokemon.pokemon.url);
          console.error('There was an error!', error);
          this.resp = error;
      }
    });
  }
  onSeeGallery(): void {
    console.log('lets go to the Gallery');
  }
  onAddToGallery(name: string): void {
    console.log('lets add:  ' + name);
    let pokemons: any = localStorage.getItem('pokemonsGallery');
    pokemons = JSON.parse(pokemons);
    console.log('all:  ' + pokemons);
    if(pokemons === null){
      pokemons = [ name, ];
      localStorage.setItem('pokemonsGallery', JSON.stringify(pokemons));
      alert('se agrego: ' + name);
    } else {
      console.log("problem");
      console.log(pokemons);
      const found = pokemons.includes( name );
      if (found)
        return alert("este pokemon ya esta regustrado");
      pokemons.push(name);
      localStorage.setItem('pokemonsGallery', JSON.stringify(pokemons));
      alert('se agrego: ' + name);
      console.log(pokemons);
    }
  }
}
