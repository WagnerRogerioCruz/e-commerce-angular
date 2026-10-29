import { TestBed } from '@angular/core/testing';
import { Carrinho } from './carrinho';

describe('Carrinho', () => {
  let service: Carrinho;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Carrinho);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve alternar o estado de abertura do carrinho', () => {
    expect(service.estaAberto()).toBe(false);

    service.alternarCarrinho();
    expect(service.estaAberto()).toBe(true);

    service.alternarCarrinho();
    expect(service.estaAberto()).toBe(false);
  });
});
