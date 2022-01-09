import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataContentComponent } from './data-content/data-content.component';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import {
  MAT_DIALOG_DEFAULT_OPTIONS, MatButtonModule,
  MatCardModule, MatDatepickerModule, MatDialogModule, MatExpansionModule,
  MatFormFieldModule, MatGridListModule, MatIconModule,
  MatInputModule, MatMenuModule, MatNativeDateModule, MatOptionModule,
  MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule, MatSlideToggleModule,
  MatSortModule,
  MatTableModule, MatTabsModule, MatToolbarModule
} from "@angular/material";
import { FlexLayoutModule} from "@angular/flex-layout";
import { DataSearchComponent } from './data-content/data-search/data-search.component';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RouterModule, Routes} from "@angular/router";
import { DataLoginComponent } from './data-login/data-login.component';
import {httpInterceptorProviders} from "./data-services/auth-interceptor";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import { DataDialogComponent } from './data-dialog/data-dialog.component';
import { DataChartsComponent } from './data-charts/data-charts.component';
import { DataChartComponent } from './data-charts/data-chart/data-chart.component';
import { DataBlockListComponent } from './data-block-list/data-block-list.component';


const appRoutes:Routes=[
  { path:'', component: DataContentComponent},
  { path:'charts', component: DataChartsComponent},
  { path:'blocks', component: DataBlockListComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    DataContentComponent,
    DataSearchComponent,
    DataLoginComponent,
    DataDialogComponent,
    DataChartsComponent,
    DataChartComponent,
    DataBlockListComponent,
  ],
  entryComponents:[
    DataSearchComponent,
    DataLoginComponent,
    DataDialogComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatCardModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatTabsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    httpInterceptorProviders,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false}}],
  bootstrap: [AppComponent],
  exports: [
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class AppModule { }
