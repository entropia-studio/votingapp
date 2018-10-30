import { TestBed } from '@angular/core/testing';

import { GooglePieChartService } from './google-pie-chart.service';

describe('GooglePieChartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GooglePieChartService = TestBed.get(GooglePieChartService);
    expect(service).toBeTruthy();
  });
});
