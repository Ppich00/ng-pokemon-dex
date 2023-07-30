import {ChangeDetectorRef, Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  constructor(private cd: ChangeDetectorRef) {
    this.cd.detach()
  }

}
