import { provideAnimations } from "@angular/platform-browser/animations";
import { TuiRootModule } from "@taiga-ui/core";
import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@ngneat/transloco';
import { NgxsModule } from '@ngxs/store';
import { BasketState } from "./shared/states/basket-state";
import { jwtInterceptor } from "./core/interceptors/jwt.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(), 
    provideRouter(routes), 
    importProvidersFrom(NgxsModule.forRoot([BasketState])), 
    importProvidersFrom(TuiRootModule), 
    provideHttpClient(), 
    provideHttpClient(withInterceptors([jwtInterceptor])),
    provideTransloco({
        config: { 
          availableLangs: ['en', 'it', 'fr'],
          defaultLang: 'en',
          // Remove this option if your application doesn't support changing language in runtime.
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
        },
        loader: TranslocoHttpLoader
      })]
};
