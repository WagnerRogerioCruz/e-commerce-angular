import { TestBed } from '@angular/core/testing';
import { SupabaseCartService } from './supabase-cart';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

describe('SupabaseCartService', () => {
  let service: SupabaseCartService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SupabaseCartService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(SupabaseCartService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve enviar o payload de salvar/atualizar carrinho com o header Prefer resolution=merge-duplicates (UPSERT)', () => {
    const payloadMock = {
      user_id: 1,
      products: [{ id: 1, quantity: 2 }],
      date: new Date().toISOString()
    };

    service.salvarCarrinhoNoSupabase(payloadMock).subscribe(resposta => {
      expect(resposta).toBeTruthy();
    });

    const req = httpMock.expectOne('https://vatfcszylgblokqgrtqr.supabase.co/rest/v1/carts?on_conflict=user_id');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Prefer')).toBe('resolution=merge-duplicates');
    expect(req.request.headers.get('apikey')).toBeTruthy();
    expect(req.request.body).toEqual(payloadMock);

    req.flush({ status: 'success' });
  });

  it('deve obter o carrinho mais recente do usuario filtrando por user_id', () => {
    const userId = 1;
    const respostaMock = [
      { id: 10, user_id: 1, products: [], date: '2026-03-01' }
    ];

    service.obterCarrinhoDoSupabase(userId).subscribe(carrinho => {
      expect(carrinho).toEqual(respostaMock);
    });

    const req = httpMock.expectOne('https://vatfcszylgblokqgrtqr.supabase.co/rest/v1/carts?user_id=eq.1&order=date.desc&limit=1');
    expect(req.request.method).toBe('GET');

    req.flush(respostaMock);
  });
});