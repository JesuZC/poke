import { Component, OnInit, } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  public pokemons: any;
  public control?: any;
  public slideIndex: number;
  constructor() {
    this.slideIndex = 1;
    this.pokemons = [];
  }

  ngOnInit(): void {
    let list: any = localStorage.getItem('pokemonsGallery');
    this.pokemons = JSON.parse(list);
  }
  valueResponse(respuesta: any): void {
    this.control = this.pokemons.splice(respuesta, 1);
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
        slides[i]!.style!.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.slideIndex-1]!.style!.display = "block";
    dots[this.slideIndex-1]!.className! += " active";
  }
}
