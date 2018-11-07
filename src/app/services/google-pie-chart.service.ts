import { Injectable } from '@angular/core';
import { GoogleChartsBaseService } from './google-charts-base.service';
import { PieChartConfig } from '../interfaces/pie-chart-config';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GooglePieChartService extends GoogleChartsBaseService{

  constructor() { super(); }

  public BuildPieChart(elementId: string, data: any[], config: PieChartConfig) : void {  
    var chartFunc = () => { return new google.visualization.PieChart(document.getElementById(elementId)); };
    var options = {
            title: config.title,
            pieHole: config.pieHole,            
            legend: 'none',
            slices: this.getSlices(config.colors),
            backgroundColor: 'none',
            chartArea:{width:'100%',height:'100%'}

      };

    this.buildChart(data, chartFunc, options);
  }

  // Formar the colors array to the Google options format
  getSlices(colors: string[]){
    var slices = [];
    colors.map(color => {
      slices.push({'color': color});
    })        
    return slices;
  }

}
