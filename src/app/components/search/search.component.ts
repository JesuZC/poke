import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { LoadUnoService } from "../../services/loadUno.service";
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [LoadUnoService]
})
export class SearchComponent implements OnInit {
  @Output () valueResponse = new EventEmitter<string>();
  public query!: {
    looking: string,
    continue: boolean
  };
  public capture!: string;
  nombre: FormControl = new FormControl(this.capture , [
    Validators.required,
    Validators.minLength(4),
  ])
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private  LoadUnoService: LoadUnoService
  ) {
  this.capture = '';
  this.query = {
    looking: '',
    continue: false,
  }
  };

  ngOnInit(): void {
  };
  onSubmitName(): void {
    if (this.nombre.value === null || this.nombre.value === '') {
      alert("bring an pokemon name without special caracters");
      return;
    }
    const val: any = /[^ \.A-Za-z \-]/g.test(this.nombre.value?.trim());
    if (val){
      this.nombre.setValue('');
      this.query.looking = '';
      this.query.continue = false;
      alert('no special characters accepted');
      return;
    }
    this.query.looking = this.nombre.value.trim().toLowerCase();
    this.query.continue = true;
    this.capture = '';
    this.nombre.setValue('');
    this.valueResponse.emit('saludos desde search!!');
    console.log(this.query);
    return;
  };
  onSubmitID(): void {
    const val = this.capture;
    if (typeof val !== 'number'){
      this.query.looking = '';
      this.query.continue = false;
      this.capture = '';
      alert('you need to bring integer numberrs');
      return;
    }
    else if ( val < 1 || val > 898){
      this.query.looking = '';
      this.query.continue = false;
      this.capture = '';
      alert('you need to bring a integer number between 1 and 898');
      return;
    }
    this.query.looking = val;
    this.query.continue = true;
    this.capture = '';
    return;
  };
  onSubmitType(): void {
    let val: any = this.capture;
    if ( val === ''){
      this.query.looking = '';
      this.query.continue = false;
      this.capture = '';
      alert('you need to bring an option');
      return;
    }
    val = Number.parseInt(val, 10);
    if ( val < 1 || val > 18){
      this.query.looking = '';
      this.query.continue = false;
      this.capture = '';
      alert('you need to chosse one of a brings options for types');
      return;
    }
    this.query.looking = val;
    this.query.continue = true;
    this.capture = '';
    return;
  };
}
