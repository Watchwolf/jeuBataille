import {
 HttpEvent,
 HttpInterceptor,
 HttpHandler,
 HttpRequest,
 HttpResponse,
 HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { retry, catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export class HttpError{
    static BadRequest = 400;
    static Unauthorized = 401;
    static Forbidden = 403;
    static NotFound = 404;
    static TimeOut = 408;
    static Conflict = 409;
    static InternalServerError = 500;
}

/**
 * Intercepts HTTP responses to handle errors
 */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private translate: TranslateService,
    private snackBar: MatSnackBar) { }

 intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
     .pipe(
       catchError((error: HttpErrorResponse) => {
         switch (error.status) {
          case HttpError.Unauthorized:
            var msg = this.translate.instant("Due to a technical error you have been disconnected, please reconnect.");
            this.snackBar.open(msg, this.translate.instant('Close'), { duration: 3000 });
            break;
          case HttpError.Forbidden:
            var msg = this.translate.instant("Access to this page is prohibited.");
            this.snackBar.open(msg, this.translate.instant('Close'), { duration: 3000 });
            break;
          case HttpError.BadRequest:
          case HttpError.NotFound:
          case HttpError.TimeOut:
          case HttpError.Conflict:
          case HttpError.InternalServerError:
            var msg = this.translate.instant("An error has occurred, our teams have been notified and will intervene quickly.");
            this.snackBar.open(msg, this.translate.instant('Close'), { duration: 3000 });
            break;
          case undefined:
            break;
          default:
            break;
         }
         return throwError(error.error);
       })
      )
 }
}


