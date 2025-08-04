import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileValidationResult, FileValidationOptions } from '../interfaces/become-host.interface';

@Injectable({
  providedIn: 'root'
})
export class FileValidationService {
  
  private readonly defaultOptions: FileValidationOptions = {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
  };

  /**
   * Validate file size and type
   * @param file - File to validate
   * @param options - Validation options (optional)
   * @returns Validation result with error message if invalid
   */
  validateFile(file: File, options?: Partial<FileValidationOptions>): FileValidationResult {
    const validationOptions = { ...this.defaultOptions, ...options };

    // Validate file size
    if (file.size > validationOptions.maxSize) {
      return {
        isValid: false,
        error: `File size must be less than ${this.formatFileSize(validationOptions.maxSize)}`
      };
    }

    // Validate file type
    if (!this.isValidFileType(file, validationOptions.allowedTypes)) {
      return {
        isValid: false,
        error: 'Please select a valid image file (JPEG, PNG, GIF, or WebP)'
      };
    }

    return { isValid: true };
  }

  /**
   * Check if file type is allowed
   * @param file - File to check
   * @param allowedTypes - Array of allowed MIME types
   * @returns True if file type is allowed
   */
  private isValidFileType(file: File, allowedTypes: string[]): boolean {
    return allowedTypes.some(type => file.type.startsWith(type.split('/')[0]) || file.type === type);
  }

  /**
   * Format file size in human readable format
   * @param bytes - File size in bytes
   * @returns Formatted file size string
   */
  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Create preview URL for image file
   * @param file - Image file
   * @returns Observable that emits data URL
   */
  createImagePreview(file: File): Observable<string> {
    return new Observable<string>(observer => {
      if (!file.type.startsWith('image/')) {
        observer.error(new Error('File is not an image'));
        return;
      }

      const reader = new FileReader();
      
      reader.onload = () => {
        observer.next(reader.result as string);
        observer.complete();
      };
      
      reader.onerror = () => {
        observer.error(new Error('Failed to read file'));
      };
      
      reader.readAsDataURL(file);

      // Cleanup function (called when Observable is unsubscribed)
      return () => {
        reader.abort();
      };
    });
  }
}