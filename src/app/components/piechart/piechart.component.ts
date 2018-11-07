import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { GooglePieChartService } from '../../services/google-pie-chart.service';
import { PieChartConfig } from '../../interfaces/pie-chart-config';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnChanges {

  @Input() data: any[];
  @Input() config: PieChartConfig;
  @Input() elementId: string;

  constructor(
    private googlePieChartService: GooglePieChartService
  ) { } 
  
  ngOnChanges(){
    this.googlePieChartService.BuildPieChart(this.elementId,this.data,this.config);
  }

}
