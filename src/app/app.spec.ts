import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import * as CartActions from './store/cart/cart.actions';
import { vi } from 'vitest';

describe('App', () => {
  let store: MockStore;

  const initialState = {
    cart: { itens: [] }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideMockStore({ initialState })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('deve disparar a action carregarCarrinhoSupabase no ngOnInit', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges(); // Aciona o ngOnInit

    expect(dispatchSpy).toHaveBeenCalledWith(CartActions.carregarCarrinhoSupabase());
  });

  it('deve renderizar a estrutura principal com cabeçalho, rodapé e sidebar do carrinho', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('app-cabecalho')).toBeTruthy();
    expect(compiled.querySelector('app-rodape')).toBeTruthy();
    expect(compiled.querySelector('app-carrinho-sidebar')).toBeTruthy();
  });
});
