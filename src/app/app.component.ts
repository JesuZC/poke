import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'poke';
  valueResp(respuesta: string): void {
    alert(respuesta);
    console.log(respuesta);
   }
}
