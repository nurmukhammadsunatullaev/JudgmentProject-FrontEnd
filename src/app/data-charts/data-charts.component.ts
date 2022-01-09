import {Chart} from 'chart.js';
import {Component, OnInit} from "@angular/core";
import {Attribute} from "../data-models/attribute";
import {AttributeService} from "../data-services/attribute.service";

@Component({
  selector: 'app-data-charts',
  templateUrl: './data-charts.component.html',
  styleUrls: ['./data-charts.component.css']
})
export class DataChartsComponent implements OnInit{

  regionId:number = 0;

  attributes:Attribute[];

  urls:string[]=[
    'regions',
    'categories',
    'judgements'
  ];

  constructor(private attributeService:AttributeService) {

  }

  ngOnInit() {
     this.attributeService.findAllByParentId('/api/regions').subscribe(
       data=>{
         this.attributes=data;
         console.log(data);
       }
     )
  }


  public regionSelected() : void{
    let path=[
      'regions',
      'categories',
      'judgements'
    ];
    for (var i=0;i<this.urls.length; i++){
      this.urls[i]=path[i].concat(`/${this.regionId}`);
    }
  }
}
