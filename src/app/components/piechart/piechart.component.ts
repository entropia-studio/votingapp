import { Component, OnInit, Input } from '@angular/core';
import { GooglePieChartService } from '../../services/google-pie-chart.service';
import { PieChartConfig } from '../../interfaces/pie-chart-config';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {

  @Input() data: any[];
  @Input() config: PieChartConfig;
  @Input() elementId: string;

  constructor(
    private googlePieChartService: GooglePieChartService
  ) { }

  ngOnInit() {
    this.googlePieChartService.BuildPieChart(this.elementId,this.data,this.config);
  }

}
