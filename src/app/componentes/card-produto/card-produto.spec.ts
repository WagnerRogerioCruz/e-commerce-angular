import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardProduto } from './card-produto';
import { provideRouter } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { adicionarProduto } from '../../store/cart';
import { vi } from 'vitest';

describe('CardProduto', () => {
  let component: CardProduto;
  let fixture: ComponentFixture<CardProduto>;
  let store: MockStore;

  const initialState = {
    cart: { itens: [] }
  };

  const produtoMock = {
    id: 1,
    title: 'Camiseta Teste',
    price: 120,
    description: 'Descrição de teste para o produto',
    category: 'roupas',
    image: 'https://via.placeholder.com/150'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardProduto],
      providers: [
        provideRouter([]),
        provideMockStore({ initialState })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CardProduto);
    component = fixture.componentInstance;
    
    // Atribui o Input obrigatório antes de detectar alterações
    component.produto = produtoMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve disparar a action adicionarProduto com o preço com desconto aplicado quando o preço for maior que 100', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    
    component.adicionarAoCarrinho();

    // Preço original 120 com 15% de desconto = 102
    expect(dispatchSpy).toHaveBeenCalledWith(
      adicionarProduto({
        produto: produtoMock,
        quantidade: 1,
        price: 102
      })
    );
  });

  it('deve disparar a action adicionarProduto com o preço normal quando o preço for menor ou igual a 100', () => {
    component.produto = { ...produtoMock, price: 80 };
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    component.adicionarAoCarrinho();

    expect(dispatchSpy).toHaveBeenCalledWith(
      adicionarProduto({
        produto: component.produto,
        quantidade: 1,
        price: 80
      })
    );
  });
});
