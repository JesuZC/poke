import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params} from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input()
  query!: string;
  nombre: FormControl = new FormControl(this.query , [
    Validators.required,
    Validators.minLength(4),
  ]);
  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.query = '';
  };

  ngOnInit(): void {
  };
  onSubmitName(): {} {
    const val: any = /[^ \.A-Za-z \-]/g.test(this.nombre.value?.trim());
    if (val){
      this.nombre.setValue('');
      alert('no se pueden ingresar numeros o caracteres especiales');
      return {};
    }
    this.query = this.nombre.value.toLowerCase();
    console.log(this.query);
    return {};
  };
  onSubmitID(): {} {
    const val = this.query;
    if (typeof val !== 'number'){
      this.query = '';
      alert('you need to brin integer numberrs');
      return {};
    }
    else if ( val < 1 || val > 400){
      this.query = '';
      alert('you need to bring a integer number between 1 and 400');
      return {};
    }
    return {};
  };
  onSubmitType(): {} {
    console.log(this.query);
    return {};
  };
}
