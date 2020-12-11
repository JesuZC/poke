import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LoadUnoService } from '../../services/loadUno.service';
import { Gallery } from '../../models/gallery';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  providers: [LoadUnoService]
})
export class CardsComponent implements OnInit {
  @Input() name: any;
  @Output () valueResponse: EventEmitter<number> = new EventEmitter();
  public resp: any;
  public item?: Gallery;
  constructor(
    private _router: Router,
    private _loadUnoService: LoadUnoService
    ) {
      this.name = '';
      this.resp = {};
    }

  ngOnInit(): void {
    this.resp = this._loadUnoService.getName(this.name).subscribe({
      next: data => {
        this.item = {
          _id: data.id,
          name: data.name,
          types: data.types,
          sprites: data.sprites,
          ischarged: true
        };
        let arrImg: any[] = [];
        let i: number = 0;
        for (const key in this.item.sprites) {
          if (Object.prototype.hasOwnProperty.call(this.item.sprites, key)) {
              if ( i < 8){
                arrImg[i] = this.item.sprites[key];
                i = i+1;
              };
          }
        }
        for (const key in this.item.types) {
          if (Object.prototype.hasOwnProperty.call(this.item.types, key)) {
            this.item.types[key].type.url = "../../../assets/img/sys/elements/icons/"+this.item.types[key].type.name+".png";
          }
        }
        this.item.sprites = arrImg;
        this.resp = data;
      },
      error: error => {
          console.error('There was an error!', error);
          this.resp = error;
          this.item = {
            _id: 0,
            name: '',
            types: [],
            sprites: {},
            ischarged: false,
          }
      }
    });
  }
  onBeFree(): void{
    let list: any = localStorage.getItem('pokemonsGallery');
    list = JSON.parse(list);
    let key: number = list.findIndex((element: string) => element === this.name);
    let removed = list.splice(key, 1);
    localStorage.setItem('pokemonsGallery', JSON.stringify(list));
    alert('Deleted: ' + this.name);
    this.item = {
      _id: 0,
      name: '',
      types: [],
      sprites: {},
      ischarged: false,
    };
    this.name = '';
    this.valueResponse.emit(key);
  }
  onLook():void{
    this._router.navigate(['/search',this.name]);
  }
}
