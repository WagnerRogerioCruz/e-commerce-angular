import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaProdutos } from './lista-produtos';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { Produto, ItemProduto } from '../../services/produto';
import { of } from 'rxjs';
import { vi } from 'vitest';

describe('ListaProdutos', () => {
  let component: ListaProdutos;
  let fixture: ComponentFixture<ListaProdutos>;
  let produtoServiceMock: any;

  const mockProdutos: ItemProduto[] = [
    { id: 1, title: 'Camiseta Angular', price: 50, category: 'roupas', description: 'Camiseta legal', image: 'url1' },
    { id: 2, title: 'Livro TypeScript', price: 80, category: 'livros', description: 'Livro bom', image: 'url2' }
  ];

  beforeEach(async () => {
    produtoServiceMock = {
      obterProdutos: vi.fn().mockReturnValue(of(mockProdutos))
    };

    await TestBed.configureTestingModule({
      imports: [ListaProdutos],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideMockStore(),
        { provide: Produto, useValue: produtoServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaProdutos);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Aciona o ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar os produtos ao inicializar', () => {
    expect(produtoServiceMock.obterProdutos).toHaveBeenCalled();
    expect(component.produtos().length).toBe(2);
    expect(component.carregando()).toBe(false);
  });

  it('deve filtrar os produtos corretamente através da busca reativa', () => {
    // Simula a digitação no campo de busca
    component.campoBusca.setValue('TypeScript');

    expect(component.produtos().length).toBe(1);
    expect(component.produtos()[0].title).toBe('Livro TypeScript');
  });

  it('deve restaurar todos os produtos quando a busca estiver vazia', () => {
    component.campoBusca.setValue('TypeScript');
    expect(component.produtos().length).toBe(1);

    // Limpa a busca
    component.campoBusca.setValue('');
    expect(component.produtos().length).toBe(2);
  });
});
