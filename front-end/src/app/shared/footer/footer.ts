import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, FileIcon, Mail, Facebook, Instagram, ShoppingCart, Twitter, Linkedin, LUCIDE_ICONS, LucideIconProvider,MapPin,Phone } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterModule, FormsModule, LucideAngularModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ Mail, Facebook, Instagram, ShoppingCart, Twitter, Linkedin, FileIcon, MapPin, Phone })
  }]
})
export class Footer {
  // Current year for the footer
  currentYear: number = new Date().getFullYear();
  email: string = '';

  companyLinks = [
    { name: 'About us', url: '/aboutus' },
    { name: 'Services', url: '/features' },
    { name: 'Pricing', url: '/pricing' },
    { name: 'Blog', url: '/blog' },
    { name: 'Login', url: '/auth-login' }
  ];

  usefulLinks = [
    { name: 'Terms of Services', url: '/terms' },
    { name: 'Privacy Policy', url: '/privacy' },
    { name: 'Listing', url: '/listing-one' },
    { name: 'Contact', url: '/contact' }
  ];

  socialLinks = [
    { icon: 'shopping-cart', url: 'https://1.envato.market/hously' },
    { icon: 'facebook', url: 'https://facebook.com/shreethemes' },
    { icon: 'linkedin', url: 'http://linkedin.com/company/shreethemes' },
    { icon: 'instagram', url: 'https://www.instagram.com/shreethemes/' },
    { icon: 'twitter', url: 'https://twitter.com/shreethemes' },
    { icon: 'mail', url: 'mailto:support@shreethemes.in' }
  ];

  subscribe(): void {
    if (this.email) {
      console.log('Subscribed email:', this.email);
      // you can send this.email to your API here
      this.email = '';
    }
  }
}
