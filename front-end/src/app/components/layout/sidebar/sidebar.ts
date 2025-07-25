import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

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
        this.initSidebarDropdownClicks();
    }

    activateSidebarMenu(): void {
        const currentPath = this.router.url;

        const sidebarLinks = document.querySelectorAll("#sidebar a");

        sidebarLinks.forEach((link) => {
            const href = link.getAttribute("href");

            // Handle the default root path ("/") as "index.html"
            const isRoot = currentPath === '/' || currentPath === '';

            if (
                (isRoot && href === 'index.html') ||
                (!isRoot && href && currentPath.includes(href))
            ) {
                // Activate parent <li>
                link.classList.add("active");
                const parent = link.closest("li");
                if (parent) {
                    parent.classList.add("active");
                }

                // If inside a dropdown, open it
                let parentEl = link.parentElement;
                while (parentEl) {
                    if (parentEl.classList.contains("submenu")) {
                        parentEl.classList.add("block");
                        const parentLi = parentEl.closest("li");
                        if (parentLi) {
                            parentLi.classList.add("active");
                        }
                    }
                    parentEl = parentEl.parentElement;
                }
            }
        });
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
