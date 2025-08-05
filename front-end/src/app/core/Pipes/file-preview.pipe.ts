import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filePreview',
  standalone: true
})
export class FilePreviewPipe implements PipeTransform {
  transform(file: File | string): string {
    if (!file) return '';
    if (file instanceof File) {
      return URL.createObjectURL(file);
    }
    return file;
  }
}