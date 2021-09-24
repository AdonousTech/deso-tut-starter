import { Component, OnInit } from '@angular/core';
import { MenuDropDownAnimation } from '../../shared/animations';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  animations: [ MenuDropDownAnimation ]
})
export class LandingComponent implements OnInit {

  dropdownMenuState: 'show' | 'hide' | undefined;

  constructor() { 
    this.dropdownMenuState = 'hide';
  }

  ngOnInit(): void {
  }

  toggleDropDownMenuState() {
    this.dropdownMenuState == 'hide' ? this.dropdownMenuState = 'show' : this.dropdownMenuState = 'hide';
  }

}
