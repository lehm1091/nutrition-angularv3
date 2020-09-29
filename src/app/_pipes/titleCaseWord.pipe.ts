
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'titleCaseWord' })
export class TitleCaseWord implements PipeTransform {
  transform(word: string): string {
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }
}

