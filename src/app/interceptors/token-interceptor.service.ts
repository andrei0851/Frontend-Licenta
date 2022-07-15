import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthGuardService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getAuthToken()
    let headers = request.headers
      .set('Access-Control-Allow-Origin', '*')
      .set('Cache-control', 'no-cache')
      .set('Pragma', 'no-cache')
    if (token) {
      headers = headers
        .set('Authorization', 'Bearer ' + token);
      request = request.clone({headers: headers});
    }
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          window.localStorage.removeItem('token');
          window.location.reload();
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
