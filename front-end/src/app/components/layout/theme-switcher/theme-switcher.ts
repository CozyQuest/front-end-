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
        try {
            const htmlTag = document.documentElement;
            const themeBtn = document.getElementById('theme-mode');
            const chk = document.getElementById('chk') as HTMLInputElement | null;

            const toggleTheme = (e?: Event) => {
                e?.preventDefault();
                htmlTag.classList.toggle('dark');
                htmlTag.classList.toggle('light');
                if (chk) chk.checked = htmlTag.classList.contains('dark');
            };

            themeBtn?.addEventListener('click', toggleTheme);
            chk?.addEventListener('change', toggleTheme);
        } catch (err) {
            console.error('Theme switch error:', err);
        }
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