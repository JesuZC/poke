import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { LoadVariousService } from './../../services/loadVarious.service';
import { LoadVarious } from '../../models/loadVarious';

@Component({
  selector: 'app-load-various',
  templateUrl: './load-various.component.html',
  styleUrls: ['./load-various.component.scss'],
  providers: [LoadVariousService]
})
export class LoadVariousComponent implements OnInit {

  @Input() type: {
    looking: any,
    continue: boolean
  };
  @Output () valueResponse: EventEmitter<string> = new EventEmitter();
  status: number;
  tProfile?: LoadVarious;
  public resp: any;
  constructor(
    private _loadVariousService: LoadVariousService
  ) {
    this.status = 0;
    this.resp = {};
    this.type = {
      looking: 0,
      continue: false
    };
  }
  ngOnInit(): void {
    console.log(this._loadVariousService.pruebas());
    this.resp = this._loadVariousService.getAll(this.type.looking).subscribe({
      next: data => {
        console.log(data);},
      error: error => {
          console.error('There was an error!', error);
      }});
  }
  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    if (this.type.continue === true){
      console.log(typeof this.type , this.type);
      this.resp = this._loadVariousService.getType(this.type.looking).subscribe({
        next: data => {
          console.log(data);
          this.type.continue = false;
          this.tProfile = {
            _id: data.id,
            name: data.name,
            pokemon: data.pokemon,
            moves: data.moves,
            damage_relations: data.damage_relations,
            ischarged: true
          };
          this.valueResponse.emit(this.resp.name);
          this.status = 200;
        },
        error: error => {
            console.error('There was an error!', error);
            this.type.continue = false;
        }
      });
      this.type.continue = false;
    }
    if(typeof this.tProfile !== 'undefined' && this.status !== 0){
      console.log(this.resp, this.tProfile);
      this.status = 0;
    }
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.type = {
      looking: 0,
      continue: false
    };
  }
}
