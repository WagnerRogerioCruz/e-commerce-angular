import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalhesProduto } from './detalhes-produto';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Produto, ItemProduto } from '../../services/produto';
import { adicionarProduto } from '../../store/cart';
import { of } from 'rxjs';
import { vi } from 'vitest';

describe('DetalhesProduto', () => {
  let component: DetalhesProduto;
  let fixture: ComponentFixture<DetalhesProduto>;
  let store: MockStore;
  let produtoServiceMock: any;

  const mockProduto: ItemProduto = {
    id: 1,
    title: 'Smartphone Teste',
    price: 200,
    description: 'Smartphone de alta tecnologia',
    category: 'eletronicos',
    image: 'https://via.placeholder.com/150'
  };

  beforeEach(async () => {
    produtoServiceMock = {
      obterProdutos: vi.fn().mockReturnValue(of([mockProduto]))
    };

    await TestBed.configureTestingModule({
      imports: [DetalhesProduto],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideMockStore(),
        { provide: Produto, useValue: produtoServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'id' ? '1' : null)
              }
            }
          }
        }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(DetalhesProduto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar os detalhes do produto com base no ID da rota', () => {
    expect(produtoServiceMock.obterProdutos).toHaveBeenCalled();
    expect(component.produto()).toEqual(mockProduto);
    expect(component.carregando()).toBe(false);
  });

  it('deve disparar a action adicionarProduto com desconto quando o preço for maior que 100', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    component.adicionarAoCarrinho();

    // Preço original 200 com 15% de desconto = 170
    expect(dispatchSpy).toHaveBeenCalledWith(
      adicionarProduto({
        produto: mockProduto,
        quantidade: 1,
        price: 170
      })
    );
  });
});