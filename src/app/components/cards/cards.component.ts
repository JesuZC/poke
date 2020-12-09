import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LoadUnoService } from '../../services/loadUno.service';
import { Gallery } from '../../models/gallery';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  providers: [LoadUnoService]
})
export class CardsComponent implements OnInit {
  @Input() name: string;
  @Output () valueResponse: EventEmitter<number> = new EventEmitter();
  public resp: any;
  public item?: Gallery;
  constructor(
    private _loadUnoService: LoadUnoService
    ) {
      this.name = '';
      this.resp = {};
    }

  ngOnInit(): void {
    console.log(this.name);
    this.resp = this._loadUnoService.getName(this.name).subscribe({
      next: data => {
        console.log(data);
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
    console.log(this.name);
    let list: any = localStorage.getItem('pokemonsGallery');
    list = JSON.parse(list);
    let key: number = list.findIndex((element: string) => element === this.name);
    let removed = list.splice(key, 1);
    console.log(removed, list);
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
}
