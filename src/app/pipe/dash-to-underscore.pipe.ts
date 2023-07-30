import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dashToUnderscore',
  standalone: true
})
export class DashToUnderscorePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value.replace(/\-/, '_');
  }

}
