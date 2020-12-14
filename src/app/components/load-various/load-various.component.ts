import { Component, OnInit , OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import { LoadVariousService } from './../../services/loadVarious.service';
import { LoadVarious } from '../../models/loadVarious';

@Component({
  selector: 'app-load-various',
  templateUrl: './load-various.component.html',
  styleUrls: ['./load-various.component.scss'],
  providers: [LoadVariousService]
})
export class LoadVariousComponent implements OnInit, OnDestroy{

  @Input() type: {
    looking: any,
    continue: boolean
  };
  @Output () valueResponse: EventEmitter<string> = new EventEmitter();
  status: number;
  public ruteImgType?: string;
  tProfile?: LoadVarious;
  public slideIndex: number;
  public resp: any;
  constructor(
    private _loadVariousService: LoadVariousService
  ) {
    this.slideIndex = 1;
    this.status = 0;
    this.resp = {};
    this.type = {
      looking: 0,
      continue: false
    };
  }
  ngOnInit(): void {
  }
  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    if (this.type.continue === true){
      this.resp = this._loadVariousService.getType(this.type.looking).subscribe({
        next: data => {
          this.type.continue = false;
          this.tProfile = {
            _id: data.id,
            name: data.name,
            pokemon: data.pokemon,
            moves: data.moves,
            damage_relations: data.damage_relations,
            ischarged: true
          };
          this.ruteImgType = "../../../assets/img/sys/elements/icons/"+this.tProfile.name+".png";
          this.status = 200;
          this.showSlides(this.slideIndex);
          this.type = {
            looking: 0,
            continue: false
          };
        },
        error: error => {
            console.error('There was an error!', error);
            this.type.continue = false;
        }
      });
      this.type.continue = false;
    }
    if(typeof this.tProfile !== 'undefined' && this.status !== 0){
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
  // Next/previous controls
  plusSlides(n:number) {
    this.showSlides(this.slideIndex += n);
  }

  // Thumbnail image controls
  currentSlide(n:number) {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n:number) {
    let i;
    let slides:any = document.getElementsByClassName("mySlides");
    let dots:any = document.getElementsByClassName("dot");
    if (n > slides.length) {this.slideIndex = 1}
    if (n < 1) {this.slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      if (typeof slides[i].style !== 'undefined') {
        slides[i].style.display = "none";
      }
    }
    for (i = 0; i < dots.length; i++) {
      if (typeof dots[i].className !== 'undefined') {
        dots[i].className = dots[i].className.replace(" active", "");
      }
    }
    if (typeof slides[this.slideIndex-1].style !== 'undefined') {
      slides[this.slideIndex-1].style.display = "block";
    }
    if (typeof dots[this.slideIndex-1] !== 'undefined') {
      dots[this.slideIndex-1].className += " active";
    }
  }
}
