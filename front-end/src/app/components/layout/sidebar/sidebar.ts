import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
// @ts-ignore
import feather from 'feather-icons';

@Component({
    selector: 'app-sidebar',
    imports: [],
    templateUrl: './sidebar.html',
    styleUrl: './sidebar.css'
})
export class Sidebar implements AfterViewInit {
    constructor(private router: Router) { }

    ngAfterViewInit(): void {
        this.activateSidebarMenu();

        const sidebarToggleBtn = document.getElementById('close-sidebar');
        if (sidebarToggleBtn) {
            sidebarToggleBtn.addEventListener('click', () => {
                document.getElementsByClassName('page-wrapper')[0]?.classList.toggle('toggled');
            });
        }

        this.initSidebarDropdownClicks();
    }

    activateSidebarMenu(): void {
        const current = this.router.url.split('/').pop();
        const sidebar = document.getElementById('sidebar');

        if (sidebar && current !== '') {
            const menuItems = sidebar.querySelectorAll('a');
            menuItems.forEach((link) => {
                const href = link.getAttribute('href');
                if (href && current && href.includes(current)) {
                    link.parentElement?.classList.add('active');

                    const submenu = link.closest('.sidebar-submenu');
                    const dropdown = link.closest('.sidebar-dropdown');

                    if (submenu) submenu.classList.add('block');
                    if (dropdown) dropdown.classList.add('active');
                }
            });
        }
    }

    initSidebarDropdownClicks(): void {
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return;

        const links = sidebar.querySelectorAll('a');
        links.forEach((link) => {
            link.addEventListener('click', (e: any) => {
                const target = e.target;
                const activeDropdown = document.querySelector('li.sidebar-dropdown.active');
                const activeSubmenu = document.querySelector('div.sidebar-submenu.block');

                // Collapse previously active
                if (activeDropdown && activeDropdown !== target.closest('.sidebar-dropdown')) {
                    activeDropdown.classList.remove('active');
                }
                if (activeSubmenu && activeSubmenu !== target.nextElementSibling) {
                    activeSubmenu.classList.remove('block');
                }

                // Toggle current
                if (target.getAttribute('href') === 'javascript:void(0)') {
                    target.parentElement?.classList.toggle('active');
                    target.nextElementSibling?.classList.toggle('block');
                }
            });
        });
    }
}
