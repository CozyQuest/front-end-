import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHostRequestsService } from '../../../core/services/dashboard/user-host-requests.service';
import { UserHostRequest } from '../../../core/interfaces/dashboard/user-host-request.model';

@Component({
  selector: 'app-user-host-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-host-requests.html',
  styleUrl: './user-host-requests.css'
})
export class UserHostRequests implements OnInit {
  selectedImageUrl: string | null = null;
  userRequests: UserHostRequest[] = [];

  constructor(private userHostService: UserHostRequestsService) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  private loadRequests(): void {
    this.userHostService.getUserHostRequests().subscribe({
      next: (data) => (this.userRequests = data),
      error: (err) => console.error('Failed to load user host requests:', err)
    });
  }

  approve(user: UserHostRequest): void {
    this.userHostService.approveRequest(user.id).subscribe({
      next: () => {
        this.userRequests = this.userRequests.filter(u => u.id !== user.id);
        console.log(`Approved host request for ${user.fname} ${user.lname}`);
      },
      error: err => console.error('Approve failed:', err)
    });
  }

  reject(user: UserHostRequest): void {
    this.userHostService.rejectRequest(user.id).subscribe({
      next: () => {
        this.userRequests = this.userRequests.filter(u => u.id !== user.id);
        console.log(`Rejected host request for ${user.fname} ${user.lname}`);
      },
      error: err => console.error('Reject failed:', err)
    });
  }
}
