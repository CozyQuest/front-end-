import { Component, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-theme-switcher',
    imports: [],
    templateUrl: './theme-switcher.html',
    styleUrl: './theme-switcher.css'
})
export class ThemeSwitcher implements AfterViewInit {

    ngAfterViewInit(): void {
        this.setupThemeToggle();
        this.setupDirectionToggle();
    }

    private setupThemeToggle(): void {
        const themeBtn = document.getElementById('theme-mode');
        const chk = document.getElementById('chk') as HTMLInputElement;
        const html = document.documentElement;

        const toggleTheme = () => {
            html.className = html.classList.contains('dark') ? 'light' : 'dark';
        };

        themeBtn?.addEventListener('click', toggleTheme);
        chk?.addEventListener('change', toggleTheme);
    }

    private setupDirectionToggle(): void {
        const rtlBtn = document.getElementById('switchRtl');
        const html = document.documentElement;

        rtlBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            if (rtlBtn.innerText === 'LTR') {
                html.dir = 'ltr';
            } else {
                html.dir = 'rtl';
            }
        });
    }
}