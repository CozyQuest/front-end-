// Response interfaces for BecomeHost API
export interface BecomeHostResponse {
  respond: string;
}

export interface BecomeHostCheckResponse {
  respond: string;
}

export interface BecomeHostErrorResponse {
  respond: string;
  message?: string;
  title?: string;
  detail?: string;
  Message?: string;
  errors?: Array<{
    message: string;
    field?: string;
  }>;
}

// File validation interfaces
export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}

export interface FileValidationOptions {
  maxSize: number;
  allowedTypes: string[];
}

// UI state interfaces
export interface ImageUploadState {
  file: File | null;
  preview: string | null;
}

export interface BecomeHostFormState {
  frontImage: ImageUploadState;
  backImage: ImageUploadState;
  isSubmitting: boolean;
  errorMessage: string;
  successMessage: string;
}

// Component event types
export type ImageUploadType = 'front' | 'back';

export interface FileDropEvent {
  event: DragEvent;
  type: ImageUploadType;
}

export interface FileSelectEvent {
  event: Event;
  type: ImageUploadType;
}