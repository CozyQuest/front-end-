import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
// @ts-ignore
import feather from 'feather-icons';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [],
    templateUrl: './header.html',
    styleUrl: './header.css'
})
export class Header implements AfterViewInit, OnInit, OnDestroy {

    private handleWindowClick = () => this.dismissDropdownMenu();

    ngOnInit(): void {
        this.highlightActiveLinks();
    }

    ngAfterViewInit(): void {
        feather.replace();
        this.setupDropdownListeners();
        window.addEventListener('click', this.handleWindowClick);
    }

    ngOnDestroy(): void {
        window.removeEventListener('click', this.handleWindowClick);
    }

    private setupDropdownListeners(): void {
        document.querySelectorAll(".dropdown").forEach((item) => {
            item.querySelectorAll(".dropdown-toggle").forEach((subitem) => {
                subitem.addEventListener("click", (event) => {
                    subitem.classList.toggle("block");

                    const dropdownMenu = item.querySelector(".dropdown-menu");
                    if (!subitem.classList.contains("block")) {
                        dropdownMenu?.classList.remove("block");
                        dropdownMenu?.classList.add("hidden");
                    } else {
                        this.dismissDropdownMenu();
                        dropdownMenu?.classList.add("block");
                        dropdownMenu?.classList.remove("hidden");

                        if (dropdownMenu?.classList.contains("block")) {
                            subitem.classList.add("block");
                        } else {
                            subitem.classList.remove("block");
                        }

                        event.stopPropagation();
                    }
                });
            });
        });
    }

    private dismissDropdownMenu(): void {
        document.querySelectorAll(".dropdown-menu").forEach((item) => {
            item.classList.remove("block");
            item.classList.add("hidden");
        });
        document.querySelectorAll(".dropdown-toggle").forEach((item) => {
            item.classList.remove("block");
        });
    }

    highlightActiveLinks(): void {
        const menuItems = document.getElementsByClassName('sub-menu-item') as HTMLCollectionOf<HTMLAnchorElement>;
        let matchingMenuItem: HTMLAnchorElement | null = null;

        for (let i = 0; i < menuItems.length; i++) {
            if (menuItems[i].href === window.location.href) {
                matchingMenuItem = menuItems[i];
                break;
            }
        }

        if (matchingMenuItem) {
            matchingMenuItem.classList.add('active');
            const immediateParent = this.getClosest(matchingMenuItem, 'li');
            immediateParent?.classList.add('active');

            const parent = this.getClosest(matchingMenuItem, '.parent-menu-item');
            if (parent) {
                parent.classList.add('active');
                const parentMenuitem = parent.querySelector('.menu-item');
                parentMenuitem?.classList.add('active');

                const parentOfParent = this.getClosest(parent, '.parent-parent-menu-item');
                parentOfParent?.classList.add('active');
            } else {
                const parentOfParent = this.getClosest(matchingMenuItem, '.parent-parent-menu-item');
                parentOfParent?.classList.add('active');
            }
        }
    }

    getClosest(elem: HTMLElement | null, selector: string): HTMLElement | null {
        while (elem && elem !== document.documentElement) {
            if (elem.matches(selector)) return elem;
            elem = elem.parentElement;
        }
        return null;
    }
}
