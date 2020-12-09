import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { LoadUnoService } from '../../services/loadUno.service';
import { LoadUno } from './../../models/loadUno';
@Component({
  selector: 'app-load-one',
  templateUrl: './load-one.component.html',
  styleUrls: ['./load-one.component.scss'],
  providers: [LoadUnoService]
})
export class LoadOneComponent implements OnInit {
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
      console.log(this.name);
      this.resp = this._loadUnoService.getName(this.name.looking).subscribe({
        next: data => {
          console.log(data);
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
      console.log(this.number);
      this.resp = this._loadUnoService.getName(this.number.looking).subscribe({
        next: data => {
          console.log(data);
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
      console.log(typeof this.resp, this.resp, this.status);
      if (this.status.status === 404){
        this.status.status = undefined;
        alert('Pokemon dont found, try again');
      }
    }
    else if (this.status.name !== 'HttpErrorResponse' && this.resp.hasOwnProperty('name')){
      console.log(typeof this.resp, this.resp, this.status);
      this.pProfile = {
        _id: this.resp.id,
        name: this.resp.name,
        types: this.resp.types,
        weight: this.resp.weight,
        height: this.resp.height,
        base_experience: this.resp.base_experience,
        abilities: this.resp.abilities,
        sprites: this.resp.sprites,
        ischarged: true
      };
      console.log(typeof this.name.looking, this.name.looking);
      this.resp = {};
      console.log(this.pProfile);
    }
    return;
  }
  onSeeGallery(): void {
    console.log('lets go to the Gallery');
  }
  onAddToGallery(): void {
    console.log('lets add:  ' + this.pProfile?.name);
    let pokemons: any = localStorage.getItem('pokemonsGallery');
    pokemons = JSON.parse(pokemons);
    console.log('all:  ' + pokemons);
    if(pokemons === null){
      pokemons = [ this.pProfile?.name, ];
      localStorage.setItem('pokemonsGallery', JSON.stringify(pokemons));
      alert('se agrego: ' + this.pProfile?.name);
    } else {
      console.log("problem");
      console.log(pokemons);
      const found = pokemons.includes( this.pProfile?.name );
      if (found)
        return alert("este pokemon ya esta regustrado");
      pokemons.push(this.pProfile?.name);
      localStorage.setItem('pokemonsGallery', JSON.stringify(pokemons));
      alert('se agrego: ' + this.pProfile?.name);
      console.log(pokemons);
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
  searchName( query: any): void {
    console.log(query);
  }
}
