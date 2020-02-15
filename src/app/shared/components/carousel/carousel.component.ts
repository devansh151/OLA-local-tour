import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { List, Map, is, fromJS } from 'immutable';

@Component({
  selector: 'ola-carousel',
  templateUrl: './carousel.component.pug',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @Input('imagesList') imagesList: List<any>;
  @ViewChild('videoEl') videoElement: ElementRef;
  activeIndex = 0;
  lastIndex;
  lastVideoSrc: String;

  constructor() { }

  ngOnInit() {
  }

  // loadVideo(e) {
  //   if (this.lastVideoSrc && e.target.src !== this.lastVideoSrc) {
  //     e.target.load();
  //   }
  //   this.lastVideoSrc = e.target.src;
  // }

  updateIndex(index) {
    if (this.videoElement) {
      if (this.activeIndex >= this.imagesList.size) {
        return;
      }
      else {
        this.videoElement.nativeElement.load();
      }
    }

    this.activeIndex += index;
    if (this.activeIndex < 0) {
      this.activeIndex = 0
    }
    else if (this.activeIndex >= this.imagesList.size) {
      this.lastIndex = this.imagesList.size - 1;
      this.activeIndex = this.lastIndex;
    }
  }

}
