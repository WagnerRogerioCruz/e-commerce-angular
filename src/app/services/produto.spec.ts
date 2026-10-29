import { TestBed } from '@angular/core/testing';
import { Produto, ItemProduto } from './produto';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

describe('Produto', () => {
  let service: Produto;
  let httpMock: HttpTestingController;

  const mockProdutos: ItemProduto[] = [
    { id: 1, title: 'Produto Supabase 1', price: 150, description: 'Desc 1', category: 'geral', image: 'img1.png' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Produto,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(Produto);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve obter a lista de produtos da API do Supabase com os headers corretos', () => {
    service.obterProdutos().subscribe(produtos => {
      expect(produtos).toEqual(mockProdutos);
    });

    const req = httpMock.expectOne('https://vatfcszylgblokqgrtqr.supabase.co/rest/v1/produtos?select=*');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.has('apikey')).toBe(true);
    expect(req.request.headers.has('Authorization')).toBe(true);

    req.flush(mockProdutos);
  });

  it('deve obter um produto específico por ID utilizando o filtro do Supabase', () => {
    service.obterProdutoPorId(1).subscribe(produto => {
      expect(produto).toEqual(mockProdutos[0]);
    });

    const req = httpMock.expectOne('https://vatfcszylgblokqgrtqr.supabase.co/rest/v1/produtos?select=*&id=eq.1');
    expect(req.request.method).toBe('GET');

    req.flush(mockProdutos);
  });
});