import {Directive, ElementRef, Input, NgZone, OnInit, Renderer2, ViewContainerRef} from '@angular/core';
import {fromEvent, take} from "rxjs";
import {LoadingComponent} from "../component/loading/loading.component";
import getAverageColor from "../utils/averageColor";


@Directive({
  selector: '[appLoadingImg]',
  standalone: true
})
export class LoadingImgDirective implements OnInit {
  @Input({required: true}) appLoadingImg: { index: number; el: HTMLDivElement; } | undefined;
  @Input({required: false,}) name: string = '';

  constructor(private el: ElementRef<HTMLImageElement>, private render: Renderer2, private vc: ViewContainerRef, private zone: NgZone) {

  }

  ngOnInit() {
    const loadingRef = this.vc.createComponent(LoadingComponent);
    this.render.appendChild(
      this.el.nativeElement,
      loadingRef.location.nativeElement
    );
    const imgEl = this.render.createElement('img');
    imgEl.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.appLoadingImg?.index}.png`;
    imgEl.hidden = true;
    imgEl.crossOrigin = `Anonymous`;
    fromEvent(imgEl, 'load').pipe(
      take(1),
      getAverageColor(imgEl, this.zone)
    )
      .subscribe({
        next: (res) => {
          loadingRef.destroy();
          this.render.setStyle(this.appLoadingImg!.el, 'background-color', res);
        }
      });
    this.render.appendChild(this.el.nativeElement, imgEl);
  }


}

