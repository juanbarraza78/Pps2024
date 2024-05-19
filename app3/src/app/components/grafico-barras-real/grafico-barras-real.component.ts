import { Component, OnInit, inject } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-grafico-barras-real',
  templateUrl: './grafico-barras-real.component.html',
  styleUrls: ['./grafico-barras-real.component.scss'],
  standalone: true,
  imports: [NgxChartsModule],
})
export class GraficoBarrasRealComponent implements OnInit {
  ngOnInit() {}
  data = inject(DataService);
  view: [number, number] = [400, 400];

  get dislikes() {
    return this.data.dislikesData;
  }

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  constructor() {
    // Object.assign(this, { single })
  }

  onSelect(event: any) {
    console.log(event);
  }
}
