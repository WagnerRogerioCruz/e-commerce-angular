import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { cartReducer } from './store/cart/cart.reducer';
import { CartEffects } from './store/cart/cart.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(),
  provideHttpClient(),
  provideRouter(routes),
  // REGISTRO OBRIGATÓRIO DO NGRX STORE E EFFECTS:
  provideStore({
    cart: cartReducer // Registra a fatia 'cart' que os seletores procuram
  }),
  provideEffects([CartEffects])],
};
