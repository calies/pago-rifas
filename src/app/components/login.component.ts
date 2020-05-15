import { Component, EventEmitter, Output, OnInit, ViewChild }   from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../auth.service';
import { ActionsService } from '../services/actions.service';
import { UserService }         from "../services/user.service";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: '../views/login.html'
})
export class LoginComponent implements OnInit {
  // @Output('childData') outgoingData = new EventEmitter<boolean>();

  @ViewChild('loginForm') form: NgForm;

  public ret;

  message: string = '';
  mailTxt: string = '';
  passTxt: string = '';
  loading: boolean = false;
  forgot: boolean = false;

  public forgetPassMail;
  public showForgetPassword;
  public showLoginMsg;
  public forgetPasswordSent;
  public working;

  constructor(
    public _authService: AuthService, 
    public _actionsService: ActionsService, 
    private _userService: UserService,
    public router: Router
    ) {}

  ngOnInit(){
    this._actionsService.getLoadingStatus()
          .subscribe(item => {
            this.loading = item;
          });

    this.forgot = false;
    this.forgetPassMail = "";
    this.working = false;
  }

  triggerSubmit(){
    // alert(1);
    this.message = '';
    // alert(2);
    if( this.mailTxt != '' && this.passTxt != '' ){
      this.form.ngSubmit.emit();
    }else{
      this.message = 'Debes completar todos los campos';
    }
    // alert(3);
  }

  login() {
    this.message = this._authService.login(this.mailTxt, this.passTxt, false, '/dashboard/rifas');
  }

  logout() {
    this._authService.logout();
  }

  onSubmit(){
  	this.login();
  }

  showForgot(){
    this.forgot = true;
  }

  showLogin(){
    this.forgot = false;
    this.message = '';
  }

  validateEmail( mail ) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test( mail )){
      return true;
    }
    return false;
  }

  forgotPassword(){
    this.working = true;
    console.log("forgot password");
    if ( this.forgetPassMail != '' ) {
      this._userService.forgetPassword(this.forgetPassMail).subscribe(
        response => {
        	/*if(response.status != undefined){
        		let status = response.status;
  	      		
  	      		if(status != 'success'){
  	      		  status = 'error';
  	      		} else {
  	      		  this.message = 'Verifique su casilla de correo para obtener instrucciones sobre cómo recuperar su contraseña.';
  	      		  this.showForgetPassword = false;
  	      		  this.showLoginMsg = true;
  	      		  this.forgetPasswordSent = true;
  	      		}
  	      	}*/

  	      	console.log(response);
          
          
        },
        error => {
          this.message = 'Hubo un error al procesar su solicitud. Por favor intente nuevamente más tarde';
          this.showForgetPassword = false;
          this.showLoginMsg = true;
          this.forgetPasswordSent = true;
        }
      );
    } else {
      this.message = "Ingrese mail";
    }
  }
}