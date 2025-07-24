import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { Footer } from '../footer/footer';
import { ThemeSwitcher } from '../theme-switcher/theme-switcher';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-app-shell',
    standalone: true,
    imports: [Header, Sidebar, Footer, ThemeSwitcher, RouterOutlet],
    templateUrl: './app-shell.html',
    styleUrl: './app-shell.css'
})
export class AppShell {

}
