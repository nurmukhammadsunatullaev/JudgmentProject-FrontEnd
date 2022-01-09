import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {BlockedService} from "../data-services/blocked.service";

@Component({
  selector: 'app-data-block-list',
  templateUrl: './data-block-list.component.html',
  styleUrls: ['./data-block-list.component.css']
})
export class DataBlockListComponent implements OnInit {

  dataSource=new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private displayedColumns = [
    "id",
    "attributeName",
    "attributeValue",
    "reasonValue",
    "fromDate",
    "toDate"
  ];

  constructor(private blockService: BlockedService) { }

  ngOnInit() {
    this.blockService.findAll().subscribe(
      data=>{
        this.dataSource.data=data;
        this.dataSource.paginator=this.paginator;
      }
    )
  }

}
