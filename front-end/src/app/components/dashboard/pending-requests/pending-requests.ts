import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingRequestsService } from '../../../core/services/pending-requests.service';
import { PendingProperty } from '../../../core/interfaces/pending-property.model';

@Component({
  selector: 'app-pending-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pending-requests.html',
  styleUrl: './pending-requests.css'
})
export class PendingRequests implements OnInit {
  @Output() propertyApproved = new EventEmitter<void>();

  pendingProperties: PendingProperty[] = [];

  constructor(private pendingService: PendingRequestsService) {}

  ngOnInit(): void {
    this.pendingService.getPendingRequests().subscribe({
      next: (data) => (this.pendingProperties = data),
      error: (err) => console.error('Failed to load pending requests', err)
    });
  }

  approve(property: PendingProperty) {
    this.pendingService.approveRequest(property.id).subscribe({
      next: () => {
        this.pendingProperties = this.pendingProperties.filter(p => p.id !== property.id);
        this.propertyApproved.emit(); // notify parent
      },
      error: err => console.error('Approve failed:', err)
    });
  }

  reject(property: PendingProperty) {
    this.pendingService.rejectRequest(property.id).subscribe({
      next: () => {
        this.pendingProperties = this.pendingProperties.filter(p => p.id !== property.id);
      },
      error: err => console.error('Reject failed:', err)
    });
  }
}
