import { Injectable }       from '@angular/core';
import {
    CanActivate, CanActivateChild, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
}                           from '@angular/router';
import { AuthService }      from './auth.service';
import { User }             from './models/user.model'; 

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private _authService: AuthService, 
        private router: Router
    ) {}
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url:string = state.url;
        let roles:string[] = route.data['roles'];

        if (this._authService.internalUser == undefined && this._authService.getToken() != null) {
            this._authService.initUser().subscribe(
                response => {
                    let lResponse:any = response;
                    console.log('start');
                    if (lResponse.status == 'success') {
                        this._authService.identity = JSON.parse(lResponse.data);

                        this._authService.internalUser = new User(this._authService.identity.sub, this._authService.identity.name, this._authService.identity.role, this._authService.identity.email);

                        if (url == '/login') {
                            this.router.navigate(['/dashboard/rifas']);
                        }else{
                            this.router.navigate([url]);
                        }
                    }else{
                        this._authService.logout();
                    }

                    console.log(lResponse);
                }
            );
        }else if(url == '/login'){
            return true;
        }else{
            return this.checkLogin(url) && this.checkRole(roles);
        }
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url:string = state.url;
        let roles:string[] = route.data['roles'];

        if (this._authService.internalUser == undefined && this._authService.getToken() != null) {
            this._authService.initUser().subscribe(
                response => {
                    let lResponse:any = response;
                    if (lResponse.status == 'success') {
                        this._authService.identity = JSON.parse(lResponse.data);
                        this._authService.internalUser = new User(this._authService.identity.sub, this._authService.identity.name, this._authService.identity.role, this._authService.identity.email);

                        this.router.navigate([url]);
                    }else{
                        this.router.navigate(['/login']);
                    }

                    console.log(lResponse);
                }
            );
        }else{
            let isLogged = this.checkLogin(url); 
            let hasRole = this.checkRole(roles);
            if (isLogged && !hasRole) {
                this.redirectUserWithoutAuth('/dashboard/rifas');
            } 

            return isLogged && hasRole;
        }
    }

    checkLogin(url: string): boolean {
        if (this._authService.isAuthenticated()) { return true; }

        this._authService.redirectUrl = url;
        this.router.navigate(['/login']);

        return false;
    }

    checkRole(pRole){
        if (pRole == undefined || pRole.length == 0 || this._authService.hasRole(pRole)) {
            return true;
        }

        return false; 
    }

    redirectUserWithoutAuth(pUrl){
        this._authService.redirectUrl = pUrl;
        this.router.navigate([this._authService.redirectUrl]);
    }
}