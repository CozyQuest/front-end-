import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Card } from '../../shared/card/card';

@Component({
  selector: 'app-submission-under-review',
  imports: [CommonModule, ButtonModule, Card],
  templateUrl: './submission-under-review.html',
  styleUrl: './submission-under-review.css'
})
export class SubmissionUnderReview implements OnInit {
  showBackToBecomeHost = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Check if user came from become-host page or navigated directly
    // If they navigated directly, show option to go back to become-host
    this.checkNavigationSource();
  }

  private checkNavigationSource(): void {
    // Simple check - if no referrer or didn't come from become-host, show back option
    const referrer = document.referrer;
    if (!referrer || (!referrer.includes('/BecomeHost') && !referrer.includes('/become-host'))) {
      this.showBackToBecomeHost = true;
    }
  }

  getCurrentTimestamp(): string {
    return Date.now().toString().slice(-8).toUpperCase();
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  goToBrowse(): void {
    this.router.navigate(['/rent']);
  }

  goToBecomeHost(): void {
    this.router.navigate(['/BecomeHost']);
  }
}
