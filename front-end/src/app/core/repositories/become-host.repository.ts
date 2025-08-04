import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BecomeHostService } from '../services/become-host.service';
import { BecomeHostResponse, BecomeHostCheckResponse } from '../interfaces/become-host.interface';

/**
 * Repository pattern implementation for BecomeHost data operations
 * This provides an abstraction layer between the service and components
 * Useful for caching, data transformation, or multiple data sources
 */
@Injectable({
  providedIn: 'root'
})
export class BecomeHostRepository {

  constructor(private becomeHostService: BecomeHostService) {}

  /**
   * Check if user has already submitted a become host request
   * @returns Observable of the check response
   */
  checkHostApplicationStatus(): Observable<BecomeHostCheckResponse> {
    return this.becomeHostService.checkBecomeHostRequest();
  }

  /**
   * Submit become host request
   * @param frontImage - Front side of ID document
   * @param backImage - Back side of ID document
   * @returns Observable of the API response
   */
  submitHostApplication(frontImage: File, backImage: File): Observable<BecomeHostResponse> {
    // Here you could add:
    // - Request caching
    // - Data transformation
    // - Request queuing
    // - Offline support
    // - Analytics tracking
    
    return this.becomeHostService.submitBecomeHostRequest(frontImage, backImage);
  }

  /**
   * Validate application data before submission
   * @param frontImage - Front side of ID document
   * @param backImage - Back side of ID document
   * @returns True if data is valid for submission
   */
  validateApplicationData(frontImage: File | null, backImage: File | null): boolean {
    return !!(frontImage && backImage);
  }

  /**
   * Get application submission requirements
   * @returns Object containing submission requirements
   */
  getSubmissionRequirements() {
    return {
      requiredFiles: ['frontImage', 'backImage'],
      maxFileSize: 5 * 1024 * 1024, // 5MB
      allowedFormats: ['JPEG', 'PNG', 'GIF', 'WebP'],
      processingTimeEstimate: '2-3 business days'
    };
  }
}