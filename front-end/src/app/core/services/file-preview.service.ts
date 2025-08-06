import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilePreviewService {
  private objectUrls: string[] = [];
  private imageUrlCache: { [key: string]: string } = {};

  getImagePreview(file: File): string {
    if (!file || !(file instanceof File)) {
      console.warn('getImagePreview: Invalid file object:', file);
      return '';
    }
    
    // Create a unique key for the file
    const fileKey = `${file.name}_${file.size}_${file.lastModified}`;
    
    // Check if we already have a cached URL for this file
    if (this.imageUrlCache[fileKey]) {
      return this.imageUrlCache[fileKey];
    }
    
    try {
      const objectUrl = URL.createObjectURL(file);
      this.objectUrls.push(objectUrl);
      this.imageUrlCache[fileKey] = objectUrl;
      return objectUrl;
    } catch (error) {
      console.error('Error creating object URL for file:', file.name, error);
      return '';
    }
  }

  // Call this when component is destroyed or when files are no longer needed
  cleanupObjectUrls(): void {
    this.objectUrls.forEach(url => {
      try {
        URL.revokeObjectURL(url);
      } catch (error) {
        console.warn('Error revoking object URL:', error);
      }
    });
    this.objectUrls = [];
    this.imageUrlCache = {};
  }

  // Clean up a specific object URL
  revokeObjectUrl(url: string): void {
    const index = this.objectUrls.indexOf(url);
    if (index > -1) {
      try {
        URL.revokeObjectURL(url);
        this.objectUrls.splice(index, 1);
        
        // Remove from cache
        Object.keys(this.imageUrlCache).forEach(key => {
          if (this.imageUrlCache[key] === url) {
            delete this.imageUrlCache[key];
          }
        });
      } catch (error) {
        console.warn('Error revoking object URL:', error);
      }
    }
  }
}