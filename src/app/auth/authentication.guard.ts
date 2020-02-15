import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router,} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import { AuthenticationService } from '../core/services/authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const currentUser = this.authenticationService.currentUserValue;
    if (!currentUser) {
      this.router.navigate(['/auth']);
    }
    return currentUser != null;
  }
}
