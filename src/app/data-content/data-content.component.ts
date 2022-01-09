import {AfterViewInit, Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {ClaimService} from "../data-services/claim.service";
import {Claim} from "../data-models/claim";
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {DataSearchComponent} from "./data-search/data-search.component";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "../data-services/token-storage.service";
import {DataDialogComponent} from "../data-dialog/data-dialog.component";

@Component({
  selector: 'app-data-content',
  templateUrl: './data-content.component.html',
  styleUrls: ['./data-content.component.css']
})
export class DataContentComponent implements OnInit {

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  claimsTableDataSource=new MatTableDataSource();
  progress:boolean=true;
  private displayedColumns = [
    {columnName: "caseId", guestShow : true},
    {columnName: "demandantName",guestShow:false},
    {columnName: "defendantName",guestShow:false},
    {columnName: "courtName", guestShow : true},
    {columnName: "caseTypeName", guestShow : true},
    {columnName: "caseDateAdd", guestShow : true},
    {columnName: "levelName", guestShow : true},
    {columnName: "judgeName", guestShow : true},
    {columnName: "caseGlobalNumber", guestShow : true},
    {columnName: "caseResult", guestShow : true},
    {columnName: "actLink", guestShow : true},
    {columnName: "judgementId", guestShow : false},
  ];

  private displayedColumnsTitles={};

  constructor(private claimService : ClaimService, public dialog:MatDialog,private storageService:TokenStorageService) { }

  ngOnInit() {
   this.claimService.findAllClaims().subscribe(
      data=>{
        this.progress=false;
        this.claimsTableDataSource.data=data;
        this.claimsTableDataSource.sort=this.sort;
        this.claimsTableDataSource.paginator=this.paginator;
      }
    );
   let lang=this.storageService.getLanguage()==='uz';
   this.displayedColumnsTitles={
     searchButton : lang ? "Кенгайтирилган кидириш":"Расширенный поиск",
     searchTitle : lang ? "Кидириш":"Поиск",
     caseId : "№",
     demandantName : lang ? "Даъвогар" :"Истец",
     defendantName : lang ? "Жавобгар" :"Ответчик",
     courtName : lang ? "Суд номи" :"Наименование суда",
     caseTypeName : lang ? "Талаб номи" :"Основная категория спора",
     caseDateAdd : lang ? "Хужжат чикарилган сана" :"Дата рассмотрения дела",
     levelName : lang ? "Суд инстанцияси" :"Судебная инстанция",
     judgeName : lang ? "Ишни курган судья ФИШ" :"Судья",
     caseGlobalNumber : lang ? "Иш раками" :"Номер дела",
     caseResult : lang ? "Иш натижаси" :"Результат дел",
     actLink : lang ? "Хужжат" :"Документ",
     judgementId : lang ? "Хужжат юклаш" :"Загрузка документа",
   };
  }

  public getDisplayedColumns(): string[] {
    return !this.isLoggedIn() ? this.displayedColumns.filter(cd => cd.guestShow).map(cd => cd.columnName) : this.displayedColumns.map(cd => cd.columnName);
  }

  public openSearchDialog() : void  {
    const  dialogConfig=new MatDialogConfig();
    dialogConfig.autoFocus=true;
    this.dialog.open(DataSearchComponent,dialogConfig)
      .afterClosed()
      .subscribe(
        data=>{
          if(data){
            this.progress=true;
            this.claimService.findAllClaims(data).subscribe(
              data=>{
                this.progress=false;
                this.claimsTableDataSource.data=data;
              });
          }
        });
  };

  public getColor(link : string) : string {
    if(link==='#'){
      return 'red';
    }
    else if(link.includes('/pdf/')){
      return 'green';
    }
    else {
      return 'blue';
    }
  }

  public doFilter = (value: string) => {
    this.claimsTableDataSource.filter = value.trim().toLocaleLowerCase();
  };


  public uploadFile(claim: Claim, $event) : void {
    if(this.isLoggedIn()){
      const formData=new FormData();
      formData.append('file',<File>$event.target.files[0]);
      this.claimService.fileUpload(claim,formData).subscribe(res=>{
        if(res["code"]==200){
          claim.actLink=`/pdf/${claim.caseId}_${claim.judgementId}.pdf`;
        }
        const  dialogConfig=new MatDialogConfig();
        dialogConfig.autoFocus=true;
        dialogConfig.data=res;
        this.dialog.open(DataDialogComponent,dialogConfig)
      });
    }
  }

  public isLoggedIn() :boolean {
     return this.storageService.getToken()!=null;
  }
}
