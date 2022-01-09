export class Search {
   public constructor() {
     const currentDate=new Date();
     this.fromDate=new Date(currentDate.getFullYear(),currentDate.getMonth()-2,1);
     this.toDate=currentDate;
   }

   fromDate : any;
   toDate : any;
   regionId:number = 0;
   courtId : number = 0;
   categoryId :number = 0;
   requirementId : number = 0;
}
