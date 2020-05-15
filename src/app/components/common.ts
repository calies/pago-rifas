import { PageEvent } 			from '@angular/material';
import { CRUDAbstractService } 	from '../services/crud-abstract.service';
import { ActionsService } 		from '../services/actions.service';
import { Router }      			from '@angular/router';

export class Common {  
	public title 				= '';
	public pageSize 			= 2000;
	public pageSizeOptions 		= [5, 10, 20, 50, 100, 150, 200, 300, 400, 500, 1000];
	public customData 			= <any>{};
	public loading: boolean		= true;
	public loaderBar: boolean 	= false;
	public modelName:string 	= '';
    public finalData;
	public completeData;
	public length;
	public sortedData;
	public collection;
	public status: string;
	public errorMessage: string;
	public instance:any;
	public pageEvent: PageEvent;
	public router: Router;
	public action: ActionsService;
  public fileInput: any = '';  
  public filterText = '';

  public editorConfig = {
      "editable": true,
      "spellcheck": true,
      "height": "auto",
      "minHeight": "10000",
      "width": "auto",
      "minWidth": "0",
      "translate": "yes",
      "enableToolbar": true,
      "showToolbar": true,
      "placeholder": "Enter text here...",
      "imageEndPoint": "",
      "toolbar": [
          ["bold", "italic", "underline", "strikeThrough", "superscript", "subscript"],
          ["fontName", "fontSize", "color"],
          ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent"],
          ["cut", "copy", "delete", "removeFormat", "undo", "redo"],
          ["paragraph", "blockquote", "removeBlockquote", "horizontalLine", "orderedList", "unorderedList"],
          ["link", "unlink", "image", "video"]
      ]
  }

  constructor(
      public _crudAbsServ: CRUDAbstractService,
      public _actionsService: ActionsService,
      pTitle = '',
      pModelName = '',
      ){
      this.title = pTitle;
      this.modelName = pModelName;
      this.router = this._actionsService.router;
      this.action = this._actionsService;
  }

  getFinalData(){
      if (this.pageEvent == undefined) {
         this.finalData = this.sortedData.slice();
         this.finalData = this.finalData.slice( 0, this.pageSize );
     }else{
         this.finalData = this.sortedData.slice();
         this.finalData = this.finalData.slice( this.pageEvent.pageIndex * this.pageEvent.pageSize, (this.pageEvent.pageIndex * this.pageEvent.pageSize)+this.pageEvent.pageSize );
     }
 }

    compare(a, b, isAsc) {
        let auxA;
        let auxB;

        if(a == null){
            a = '';
        }

        if(b == null){
            b = '';
        }

        auxA = (isNaN(a) ? a.toLowerCase() : a);
        auxB = (isNaN(b) ? b.toLowerCase() : b);

        return (auxA < auxB ? -1 : 1) * (isAsc ? 1 : -1);
    }

openSnackBar(message: string, action: string) {
 this.action.openSnackBar(message, action);
}

getAll( pCustomData: any = '', pName:string = '', pCustomGet:string = '', pClient:string = '', pActive:string = '' ){
    //console.log("getAll common.ts");
    this.loading = true;
    if( pCustomGet == 'filtered' ) {
        this._crudAbsServ.getFiltered(pClient, pActive).subscribe(
          response => {
            this.status = response.status;
            //console.log(response);
            if (this.status != 'success') {
              this.status = 'error';
            }else{
              this.collection = response.data;
              //console.log(this.collection);
              this.sortedData = this.collection.slice();
              this.loading = false;
              this.length = this.sortedData.length;
              this.getFinalData();
            }
          },
          error => {
              this.errorMessage = <any>error;

              if (this.errorMessage != null) {
                  this.openSnackBar('Error en la petición', 'CERRAR');
              }
          }
      );
    }
    if( pCustomGet == 'active' ) {
       this._crudAbsServ.getActive().subscribe(
          response => {
             this.status = response.status;
             //console.log(response);
             if (this.status != 'success') {
                this.status = 'error';
            }else{
                this.collection = response.data;
                //console.log(this.collection);
                this.sortedData = this.collection.slice();
                this.loading = false;
                this.length = this.sortedData.length;
                this.getFinalData();
            }
        },
        error => {
          this.errorMessage = <any>error;

          if (this.errorMessage != null) {
              this.openSnackBar('Error en la petición', 'CERRAR');
          }
      }
      );
   }
   if( pCustomGet == 'inactive' ) {
       this._crudAbsServ.getInactive().subscribe(
          response => {
             this.status = response.status;
             //console.log(response);
             if (this.status != 'success') {
                this.status = 'error';
            }else{
                this.collection = response.data;
                //console.log(this.collection);
                this.sortedData = this.collection.slice();
                this.loading = false;
                this.length = this.sortedData.length;
                this.getFinalData();
            }
        },
        error => {
          this.errorMessage = <any>error;

          if (this.errorMessage != null) {
              this.openSnackBar('Error en la petición', 'CERRAR');
          }
      }
      );
   }
   if (pCustomData == '' && pCustomGet == '') {
       this._crudAbsServ.getAll().subscribe(
          response => {
             this.status = response.status;
             //console.log(response);
             if (this.status != 'success') {
                this.status = 'error';
            }else{
                this.collection = response.data;
                //console.log(this.collection);
                this.sortedData = this.collection.slice();
                this.loading = false;
                this.length = this.sortedData.length;
                this.getFinalData();
            }
        },
        error => {
          this.errorMessage = <any>error;

          if (this.errorMessage != null) {
              this.openSnackBar('Error en la petición', 'CERRAR');
          }
      }
      );
   }else{
       //console.log("pCustomData != ''");
       <CRUDAbstractService>pCustomData.getAll().subscribe(
          response => {
           this.status = response.status;
           //console.log(this.status);

           if (this.status != 'success') {
              this.status = 'error';
              this.openSnackBar('Ocurrió un error!', 'CERRAR');
          }else{
              this.loading = false;
              //console.log(response.data);
              this.customData[pName] = response.data;
              //console.log(this.customData[pName]);
          }
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          this.openSnackBar('Error en la petición', 'CERRAR');
      }
  } 
  );
   }
}

create(pRedirect = ''){
    this.loaderBar = true;
    this._crudAbsServ.create(this.instance).subscribe(
        response => {
            this.status = response.status;

            if (this.status != 'success') {
                this.status = 'error';
                this.loaderBar = false;
                this.openSnackBar(response.data, 'CERRAR');
            }else{
                this.instance = response.data;
                this.loaderBar = false;
                this.router.navigate([pRedirect]);
                this.openSnackBar(this.modelName+' ingresado correctamente!', 'CERRAR');
            }
        },
        error => {
            this.errorMessage = <any>error;

            if (this.errorMessage != null) {
                this.openSnackBar('Error en la petición', 'CERRAR');
            }
        }
    );
}

uploadImage(){
    var filesToUpload: Array<File>;
    var resultUpload;    

    filesToUpload = <Array <File>>this.fileInput.target.files;

    const formData: FormData = new FormData();

    for (let i = 0; i < filesToUpload.length; i++) {
        formData.append('imageToUpload', filesToUpload[i], filesToUpload[i].name);
    }

    return this._crudAbsServ.uploadImage(formData);
}

read(pId, pRedirect = ''){
    return this._crudAbsServ.read(pId);
}

fileChangeEvent(pFileInput: any){
  this.fileInput = pFileInput;
}

update(pRedirect = ''){
    this.loaderBar = true;
    this._crudAbsServ.update(this.instance).subscribe(
       response => {
          this.status = response.status;

          if (this.status != 'success') {
             this.status = 'error';
             this.openSnackBar(response.data, 'CERRAR');
         }else{
             this.instance = response.data;
             this.loaderBar = false;
             this.router.navigate([pRedirect]);
             this.openSnackBar(response.data, 'CERRAR');
         }
     },
     error => {
       this.errorMessage = <any>error;

       if (this.errorMessage != null) {
           this.openSnackBar('Error en la petición', 'CERRAR');
       }
   } 
   );
}

getHumanDate( pTimestamp ){
    let lDate = new Date(pTimestamp * 1000);
    console.log('getHumanDate');
    console.log(pTimestamp);
    console.log(lDate);
    return 	(lDate.getMonth()+1) +'/'+ lDate.getDate() +'/'+ lDate.getFullYear();
}

getHumanDatePicker( pTimestamp ){
  let lDate = new Date(pTimestamp).toISOString();
  return lDate;
}

applyFilter(){
  this.finalData = this.collection.filter( item => { 
    return JSON.stringify(item).trim().toLowerCase().includes(this.filterText);
  } );
}



}