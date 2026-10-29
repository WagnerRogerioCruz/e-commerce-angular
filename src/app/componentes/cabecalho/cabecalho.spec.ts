import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cabecalho } from './cabecalho';
import { provideRouter } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Carrinho } from '../../services/carrinho';
import { selectQuantItens, selectValorItens } from '../../store/cart';
import { vi } from 'vitest';

describe('Cabecalho', () => {
  let component: Cabecalho;
  let fixture: ComponentFixture<Cabecalho>;
  let store: MockStore;
  let carrinhoServiceMock: any;

  const initialState = {
    cart: { itens: [] }
  };

  beforeEach(async () => {
    carrinhoServiceMock = {
      alternarCarrinho: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [Cabecalho],
      providers: [
        provideRouter([]),
        provideMockStore({
          initialState,
          selectors: [
            { selector: selectQuantItens, value: 0 },
            { selector: selectValorItens, value: 0 }
          ]
        }),
        { provide: Carrinho, useValue: carrinhoServiceMock }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(Cabecalho);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve alternar o estado do sinal menuAberto quando alternarMenu for chamado', () => {
    expect(component.menuAberto()).toBeFalsy();
    component.alternarMenu();
    expect(component.menuAberto()).toBeTruthy();
    component.alternarMenu();
    expect(component.menuAberto()).toBeFalsy();
  });

  it('deve disparar a action de limpar carrinho quando esvaziarCarrinho for chamado', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    component.esvaziarCarrinho();
    expect(dispatchSpy).toHaveBeenCalled();
  });
});