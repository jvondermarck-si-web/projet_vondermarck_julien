import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { LoaderService } from "../services/loader.service";
import { finalize, of } from "rxjs";
import { catchError, retryWhen, tap } from 'rxjs/operators';

import { delay } from 'rxjs/operators';

export const loaderInterceptor: HttpInterceptorFn = (req, next,) => {
    const loadingService = inject(LoaderService);
    loadingService.show();
    return next(req).pipe(
      retryWhen(errors =>
        errors.pipe(
          tap(() => {
            console.log('Retrying to reconnect with the backend...');
            loadingService.show();
          }),
          delay(1000) // Retry every 1 seconds
        )
      ),
      catchError((error) => {
        // Handle the error here if the request still fails after retries
        throw error;
      }),
      finalize(() => loadingService.hide()) // Hide the loader when the request completes
    );
  };
