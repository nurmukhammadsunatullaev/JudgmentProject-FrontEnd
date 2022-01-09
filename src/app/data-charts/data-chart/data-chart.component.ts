import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Chart} from "chart.js";
import {Attribute} from "../../data-models/attribute";
import {HttpClient} from "@angular/common/http";
import {MatRadioChange} from "@angular/material";

@Component({
  selector: 'app-data-chart',
  templateUrl: './data-chart.component.html',
  styleUrls: ['./data-chart.component.css']
})
export class DataChartComponent implements OnInit {

  @Input()
  private typeUrl:string;

  @Input()
  private chartType:string;

  private data:number[]=[];
  private labels:string[]=[];
  private statistics:Attribute[]=[];
  @ViewChild('chartCanvas') chartCanvas:ElementRef;

  constructor(private http : HttpClient) { }

  ngOnInit() {
    let ctx = this.chartCanvas.nativeElement.getContext('2d');
    this.http.get<Attribute[]>(`/api/statistics/${this.typeUrl}`).subscribe(data=>{
      this.statistics=data;
      this.data=this.getValues();
      this.labels=this.getLabels();
      this.makeChart(ctx);
    });
  }
  private makeChart(ctx) : Chart{
    return new Chart(ctx, {
      type: this.chartType,
      data: {
        labels: this.labels,
        datasets: [{
          label: '# of Votes',
          data: this.data,
          backgroundColor: this.pieColors(this.data.length,0.5),
          borderColor: this.pieColors(this.data.length,1),
          borderWidth: 1
        }]
      },
      options: {
        responsive:true,
        maintainAspectRatio: false,
        title:{
          text:"Маълумотлар",
          display:true
        },
        legend: {
          display: true,
          labels: {
            fontColor: 'rgb(255, 99, 132)'
          },
          position:'top'
        },
        'onClick' : function (evt, item) {
          console.log ('legend onClick', evt);
          console.log('legd item', item);
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true,
              max: Math.max(... this.getValues())
            }
          }]
        }
      }
    });

  }

  public getLabels(): string[] {
    return  this.statistics.map(cd => cd.attributeName);
  }
  public getValues(): number[] {
    return  this.statistics.map(cd => cd.attributeValue);
  }

  private pieColor(value : number) : string{
    let red:number = Math.floor(Math.random() * 255);
    let green:number = Math.floor(Math.random() * 255);
    let blue:number = Math.floor(Math.random() * 255);
    return `rgba(${red}, ${green}, ${blue}, ${value})`;
  }

  private pieColors(n : number,value :number) :string[]{
    var colors:string[]=[];
    while(colors.length < n) {
      let currentColor=this.pieColor(value);
      if(!colors.includes(currentColor)){
        colors.push(currentColor);
      }
    }
    return colors;
  }


}
