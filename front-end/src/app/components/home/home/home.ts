import { Component } from '@angular/core';
import { Hero } from "../hero/hero";
import { Info } from "../info/info";
import { FeaturedProperties } from "../featured-properties/featured-properties";

@Component({
  selector: 'app-home',
  imports: [Hero, Info, FeaturedProperties],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
