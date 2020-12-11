import { Component, OnInit , Input} from '@angular/core';
import { Router } from '@angular/router';
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
    private _router: Router,
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
  onAddToGallery(name: string): void {
    let pokemons: any = localStorage.getItem('pokemonsGallery');
    pokemons = JSON.parse(pokemons);
    if(pokemons === null){
      pokemons = [ name, ];
      localStorage.setItem('pokemonsGallery', JSON.stringify(pokemons));
      alert('It add\'s: ' + name);
    } else {
      const found = pokemons.includes( name );
      if (found)
        return alert("This pokemon is already registered");
      pokemons.push(name);
      localStorage.setItem('pokemonsGallery', JSON.stringify(pokemons));
      alert('It add\'s: ' + name);
    }
  }
  onLook():void{
    this._router.navigate(['/search',this.pokemon.pokemon.name]);
  }
}
