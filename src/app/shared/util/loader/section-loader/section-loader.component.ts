import { Component, 
         OnInit,
         Input } from '@angular/core';

@Component({
  selector: 'section-loader',
  templateUrl: './section-loader.component.html',
  styleUrls: ['./section-loader.component.css']
})
export class SectionLoaderComponent implements OnInit {

  @Input() loadType: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
