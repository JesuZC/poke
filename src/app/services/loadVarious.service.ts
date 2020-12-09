import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
@Injectable()
export class LoadVariousService{
  public url: string;
  constructor(
    private _http: HttpClient
  ){
    this.url = Global.url;
  }
  getType(name: string): Observable<any>{
    return this._http.get(this.url + 'type/' + name);
  }
  getAll(name: string): Observable<any>{
    return this._http.get(this.url + 'pokemon/');
  }
  getOneByOne(name: string): Observable<any>{
    return this._http.get(name);
  }
  pruebas(){
    return "prueba sobre RxJS various";
  }
}
