import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  colors: Array<string>;

  constructor() {       

    this.colors = [
      '#e57373',
      '#f06292',
      '#ba68c8',
      '#9575cd',
      '#7986cb',
      '#64b5f6',
      '#4db6ac',
      '#81c784',
      '#aed581',
      '#dce775',
      '#dce775',
      '#ffd54f',
      '#ff8a65'
    ]
  }  

  getColours(num: number): Array<string>{
    return this.colors.slice(0,num);
  }

  // Returns num of colors randomly from the array colors
  getColoursRandomly(num: number): Array<string> {    
    var colors: Array<string> = [];
    for (let i = 0; i <= (num-1);i++){
      while(colors.length == i){
        let random = this.getRandomInt(0,this.colors.length);
        if (colors.indexOf(this.colors[random]) < 0){
          colors.push(this.colors[random]);          
        }
      }      
    }    
    return colors;
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

}
