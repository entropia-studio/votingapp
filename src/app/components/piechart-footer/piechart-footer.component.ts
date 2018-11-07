import { Component, Input } from '@angular/core';


interface Item{
  name: string;
  votes: Array<string>;
}

@Component({
  selector: 'app-piechart-footer',
  templateUrl: './piechart-footer.component.html',
  styleUrls: ['./piechart-footer.component.css']
})
export class PiechartFooterComponent {

  @Input() items: Array<Item>;
  @Input() colors: Array<string>; 
  
}
