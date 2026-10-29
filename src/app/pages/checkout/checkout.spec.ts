import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Checkout } from './checkout';
import { provideRouter } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { selectQuantItens, selectItensCarrinho, limparCarrinho } from '../../store/cart';
import { vi } from 'vitest';

describe('Checkout', () => {
  let component: Checkout;
  let fixture: ComponentFixture<Checkout>;
  let store: MockStore;

  const initialState = {
    cart: { itens: [] }
  };

  const itemMock = {
    produto: {
      id: 1,
      title: 'Produto Teste',
      price: 100,
      description: 'Desc',
      category: 'geral',
      image: 'img.png'
    },
    quantidade: 1,
    price: 100
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Checkout],
      providers: [
        provideRouter([]),
        provideMockStore({
          initialState,
          selectors: [
            { selector: selectQuantItens, value: 1 },
            { selector: selectItensCarrinho, value: [itemMock] }
          ]
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(Checkout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve marcar o formulário como inválido quando submetido vazio', () => {
    component.finalizarPedido();
    expect(component.checkoutForm.invalid).toBe(true);
    expect(component.tentouEnviar()).toBe(true);
    expect(component.pedidoConcluido()).toBe(false);
  });

  it('deve finalizar o pedido com sucesso quando o formulário for preenchido corretamente', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    // Preenche os campos obrigatórios do formulário
    component.checkoutForm.patchValue({
      nome: 'Wagner Rogerio',
      email: 'wagner@wrcruz.com.br',
      cep: '01234-567',
      endereco: 'Rua Principal, 100',
      cidade: 'São Paulo',
      pagamento: 'pix'
    });

    expect(component.checkoutForm.valid).toBe(true);

    component.finalizarPedido();

    expect(component.pedidoConcluido()).toBe(true);
    expect(dispatchSpy).toHaveBeenCalledWith(limparCarrinho());
  });

  it('deve formatar o número do cartão corretamente usando a máscara', () => {
    const eventoMock = { target: { value: '1234567812345678' } };
    component.onCartaoInput(eventoMock);

    expect(component.checkoutForm.get('numeroCartao')?.value).toBe('1234 5678 1234 5678');
  });

  it('deve formatar o CEP corretamente usando a máscara', () => {
    const eventoMock = { target: { value: '01234567' } };
    component.onCepInput(eventoMock);

    expect(component.checkoutForm.get('cep')?.value).toBe('01234-567');
  });
});
