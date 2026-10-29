import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarrinhoSidebar } from './carrinho-sidebar';
import { provideRouter } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Carrinho } from '../../services/carrinho';
import { selectItensCarrinho, selectValorItens, adicionarProduto, diminuirProduto, limparCarrinho } from '../../store/cart';
import { vi } from 'vitest';

describe('CarrinhoSidebar', () => {
  let component: CarrinhoSidebar;
  let fixture: ComponentFixture<CarrinhoSidebar>;
  let store: MockStore;
  let carrinhoServiceMock: any;

  const initialState = {
    cart: { itens: [] }
  };

  const itemMock = {
    produto: {
      id: 1,
      title: 'Produto Teste',
      price: 50,
      description: 'Descrição teste',
      category: 'geral',
      image: 'img.png'
    },
    quantidade: 2,
    price: 50
  };

  beforeEach(async () => {
    carrinhoServiceMock = {
      estaAberto: vi.fn().mockReturnValue(true),
      alternarCarrinho: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [CarrinhoSidebar],
      providers: [
        provideRouter([]),
        provideMockStore({
          initialState,
          selectors: [
            { selector: selectItensCarrinho, value: [itemMock] },
            { selector: selectValorItens, value: 100 }
          ]
        }),
        { provide: Carrinho, useValue: carrinhoServiceMock }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CarrinhoSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve disparar a action adicionarProduto ao aumentar a quantidade do item', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    
    component.aumentar(itemMock);

    expect(dispatchSpy).toHaveBeenCalledWith(
      adicionarProduto({
        produto: itemMock.produto,
        quantidade: 1,
        price: itemMock.price
      })
    );
  });

  it('deve disparar a action diminuirProduto ao diminuir a quantidade do item', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    
    component.diminuir(itemMock.produto.id);

    expect(dispatchSpy).toHaveBeenCalledWith(
      diminuirProduto({ produtoId: itemMock.produto.id })
    );
  });

  it('deve disparar a action limparCarrinho ao esvaziar o carrinho', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    
    component.esvaziarCarrinho();

    expect(dispatchSpy).toHaveBeenCalledWith(limparCarrinho());
  });
});
