import { Component, EventEmitter, Input, OnInit, Output, OnDestroy} from '@angular/core';
import { LoadUnoService } from '../../services/loadUno.service';
import { LoadUno } from './../../models/loadUno';
@Component({
  selector: 'app-load-one',
  templateUrl: './load-one.component.html',
  styleUrls: ['./load-one.component.scss'],
  providers: [LoadUnoService]
})
export class LoadOneComponent implements OnInit, OnDestroy {
  @Input() name: {
    looking: string;
    continue: boolean
  };
  @Input() number: {
    looking: any,
    continue: boolean
  };
  pProfile?: LoadUno;
  public resp: any;
  status: {
    status?: number,
    name?: string
  };
  constructor(
    private _loadUnoService: LoadUnoService
  ) {
    this.resp = {
    };
    this.status = {
      status: undefined,
      name: undefined
    };
    this.name = {
      looking: '',
      continue: false
    };
    this.number = {
      looking: 0,
      continue: false
    };
   }

  ngOnInit(): void {
  }
  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    if (this.name.continue === true){
      this.resp = this._loadUnoService.getName(this.name.looking).subscribe({
        next: data => {
          this.resp = data;
          this.status.name = data?.name,
          this.name.continue = false;
        },
        error: error => {
            console.error('There was an error!', error);
            this.resp = error;
            this.status.status = error.status;
            this.status.name = error.name,
            this.name.continue = false;
        }
      });
      this.name.continue = false;
      /* console.log(this.resp, Object.keys(this.resp).length); */
    }
    else if  (this.number?.continue === true){
      this.resp = this._loadUnoService.getName(this.number.looking).subscribe({
        next: data => {
          this.resp = data;
          this.status.name = data?.name,
          this.number.continue = false;
        },
        error: error => {
            console.error('There was an error!', error);
            this.resp = error;
            this.status.status = error.status;
            this.status.name = error.name,
            this.number.continue = false;
        }
      });
      this.number.continue = false;
      /* console.log(this.resp, Object.keys(this.resp).length); */
    }
    if (this.status.status !== undefined && this.resp.hasOwnProperty('status')){
      if (this.status.status === 404){
        this.status.status = undefined;
        alert('Pokemon dont found, try again');
      }
    }
    else if (this.status.name !== 'HttpErrorResponse' && this.resp.hasOwnProperty('name')){
      this.pProfile = {
        _id: this.resp.id,
        name: this.resp.name,
        types: this.resp.types,
        weight: this.resp.weight,
        height: this.resp.height,
        base_experience: this.resp.base_experience,
        abilities: this.resp.abilities,
        sprites: this.resp.sprites,
        moves: this.resp.moves,
        ischarged: true
      };
      for (const key in this.pProfile?.types) {
        if (Object.prototype.hasOwnProperty.call(this.pProfile.types, key)) {
          this.pProfile.types[key].type.url = "../../../assets/img/sys/elements/icons/"+this.pProfile.types[key].type.name+".png";
        }
      }
      this.resp = {};
    }
    return;
  }
  onAddToGallery(): void {
    let pokemons: any = localStorage.getItem('pokemonsGallery');
    pokemons = JSON.parse(pokemons);
    if(pokemons === null){
      pokemons = [ this.pProfile?.name, ];
      localStorage.setItem('pokemonsGallery', JSON.stringify(pokemons));
      alert('It add\'s: ' + this.pProfile?.name);
    } else {
      const found = pokemons.includes( this.pProfile?.name );
      if (found)
        return alert("this pokemon is already register");
      pokemons.push(this.pProfile?.name);
      localStorage.setItem('pokemonsGallery', JSON.stringify(pokemons));
      alert('It add\'s: ' + this.pProfile?.name);
    }
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.name = {
      looking: '',
      continue: false
    };
    this.number = {
      looking: 0,
      continue: false
    };
  }
}
