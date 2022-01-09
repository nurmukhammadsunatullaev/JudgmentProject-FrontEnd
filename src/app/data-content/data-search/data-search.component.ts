import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {Attribute} from "../../data-models/attribute";
import {AttributeService} from "../../data-services/attribute.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-data-search',
  templateUrl: './data-search.component.html',
  styleUrls: ['./data-search.component.css']
})
export class DataSearchComponent implements OnInit {

  regions:Attribute[]=[];
  courts:Attribute[]=[];
  categories:Attribute[]=[];
  requirements:Attribute[]=[];
  searchForm :FormGroup;

  constructor( private attributeService : AttributeService,private builder:FormBuilder, @Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<DataSearchComponent>) {

  }

  public ngOnInit() : void {
    let currentDate=new Date();
    this.searchForm=this.builder.group({
      fromDate:[new Date(currentDate.getFullYear(),currentDate.getMonth()-1,1),[Validators.required]],
      toDate:[currentDate,[Validators.required]],
      regionId:[0,[Validators.required]],
      courtId:[0,[Validators.required]],
      categoryId:[0,[Validators.required]],
      requirementId:[0,[Validators.required]],
    });

    this.attributeService.findAllByParentId("/api/regions").subscribe(data=>this.regions=data);
    this.attributeService.findAllByParentId("/api/categories").subscribe(data=>this.categories=data);
    this.attributeService.findAllByParentId("/api/regions",this.searchForm.controls['regionId'].value).subscribe(data=>this.courts=data);
    this.attributeService.findAllByParentId("/api/categories",this.searchForm.controls['categoryId'].value).subscribe(data=>this.requirements=data);
  }

  public updateAttributes(attribute : string, id : number) : void {
    this.attributeService.findAllByParentId(`/api/${attribute}`,id).subscribe(
      data=>{
        switch (attribute) {
            case 'regions' : this.courts=data; break;
            case 'categories' : this.requirements=data; break;
        }
      });
  }

  public closeDialog() : void {
    this.dialogRef.close(this.searchForm.value);
  }

  public close() : void {
    this.dialogRef.close();
  }

}
