import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {DataLoginComponent} from "./data-login/data-login.component";
import {TokenStorageService} from "./data-services/token-storage.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private languageRu : boolean;
  public language : string = 'Русский';
  public topTitle : string = 'ЎЗБЕКИСТОН РЕСПУБЛИКАСИ';
  public bottomTitle : string = 'ОЛИЙ СУДИ';
  public headerTitle : string = 'Ўзбекистон Республикаси фуқаролик ишлари бўйича суд қарорлари банки';
  public loginTitle : string ='Тизимга кириш';
  public logoutTitle : string ='Тизимдан чикиш';
  constructor(public dialog : MatDialog,private tokenStorage:TokenStorageService){

  }
  public ngOnInit(): void {
    switch (this.tokenStorage.getLanguage()) {
      case "ru" : this.languageRu=true;break;
      case "uz" : this.languageRu=false;break;
      default :
        this.languageRu=false;
        this.tokenStorage.setLanguage("uz");
      break;
    }
    this.language = this.languageRu ? 'Ўзбек' : 'Русский';
    this.topTitle = this.languageRu ? 'Верховный суд' : 'ЎЗБЕКИСТОН РЕСПУБЛИКАСИ';
    this.bottomTitle = this.languageRu ? 'Республики Узбекистан' : 'ОЛИЙ СУДИ';
    this.headerTitle = this.languageRu ? 'Банк судебных решений судов по гражданским делам Республики Узбекистан' : 'Ўзбекистон Республикаси фуқаролик ишлари бўйича суд қарорлари банки';;
    this.loginTitle = this.languageRu ? 'Вход в систему':'Тизимга кириш';
    this.logoutTitle = this.languageRu ? 'Выход':'Тизимдан чикиш';
  }

  public languageChanged(): void {
    this.tokenStorage.setLanguage(this.languageRu ? 'uz' : 'ru');
    location.replace('/');
  }

  public openLoginDialog() :void {
    const  dialogConfig=new MatDialogConfig();
    dialogConfig.autoFocus=true;
    this.dialog.open(DataLoginComponent,dialogConfig)
      .afterClosed()
      .subscribe(
        data=>{
          if(data){

          }
        });
  }


  public username():string{
    return this.tokenStorage.getUsername();
  }

  public logout() : void{
    this.tokenStorage.signOut();
  }

  public isLoggedIn() :boolean{
    return this.tokenStorage.getToken()!=null;
  }
}
