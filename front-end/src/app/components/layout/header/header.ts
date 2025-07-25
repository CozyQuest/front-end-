import { Component, AfterViewInit, OnDestroy } from '@angular/core';
// @ts-ignore
import feather from 'feather-icons';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [],
    templateUrl: './header.html',
    styleUrl: './header.css'
})
export class Header implements AfterViewInit, OnDestroy {

    private handleWindowClick = () => this.dismissDropdownMenu();

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
}
