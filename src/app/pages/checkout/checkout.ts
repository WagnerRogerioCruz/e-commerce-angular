import { Component, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { limparCarrinho, selectItensCarrinho, selectQuantItens } from '../../store/cart';

@Component({
  imports: [CommonModule, ReactiveFormsModule, RouterLink, CurrencyPipe],
  selector: 'app-checkout',
  styleUrl: './checkout.css',
  templateUrl: './checkout.html',
})
export class Checkout {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  quantidade = this.store.selectSignal(selectQuantItens);
  itens = this.store.selectSignal(selectItensCarrinho);

  pedidoConcluido = signal(false);
  tentouEnviar = signal(false);
  codigoPixCopiado = signal(false);
  formaPagamentoSelecionada = signal('cartao');

  checkoutForm: FormGroup = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    cep: ['', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$|^\d{8}$/)]],
    endereco: ['', [Validators.required, Validators.minLength(5)]],
    cidade: ['', [Validators.required, Validators.minLength(2)]],
    pagamento: ['cartao', [Validators.required]],
    numeroCartao: ['', [Validators.required]],
    codigoSeguranca: ['', [Validators.required]]
  });

  constructor() {
    // Ajusta as validações do cartão dinamicamente caso o usuário troque a forma de pagamento
    this.checkoutForm.get('pagamento')?.valueChanges.subscribe(tipo => {
      this.formaPagamentoSelecionada.set(tipo); // 👈 Garante que atualiza o signal aqui
      const cartaoCtrl = this.checkoutForm.get('numeroCartao');
      const cvvCtrl = this.checkoutForm.get('codigoSeguranca');

      if (tipo === 'cartao') {
        cartaoCtrl?.setValidators([Validators.required, Validators.pattern(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$|^\d{16}$/)]);
        cvvCtrl?.setValidators([Validators.required, Validators.pattern(/^\d{3}$/)]);
      } else {
        cartaoCtrl?.clearValidators();
        cvvCtrl?.clearValidators();
      }
      cartaoCtrl?.updateValueAndValidity();
      cvvCtrl?.updateValueAndValidity();
    });
  }

  // Máscara para Cartão de Crédito (bloqueia letras e insere espaço a cada 4 dígitos)
  onCartaoInput(event: any): void {
    let valor = event.target.value.replace(/\D/g, '').substring(0, 16);
    valor = valor.replace(/(\d{4})(?=\d)/g, '$1 ');
    this.checkoutForm.get('numeroCartao')?.setValue(valor, { emitEvent: false });
  }

  // Máscara para CEP (bloqueia letras e formata 00000-000)
  onCepInput(event: any): void {
    let valor = event.target.value.replace(/\D/g, '').substring(0, 8);
    if (valor.length > 5) {
      valor = valor.replace(/^(\d{5})(\d+)/, '$1-$2');
    }
    this.checkoutForm.get('cep')?.setValue(valor, { emitEvent: false });
  }

  // Máscara para CVV (apenas números, máx 3 dígitos)
  onCvvInput(event: any): void {
    let valor = event.target.value.replace(/\D/g, '').substring(0, 3);
    this.checkoutForm.get('codigoSeguranca')?.setValue(valor, { emitEvent: false });
  }

  // Exibe o erro apenas se o campo foi tocado ou se tentou enviar o formulário
  isCampoInvalido(campo: string): boolean {
    const controle = this.checkoutForm.get(campo);
    return !!(controle && controle.invalid && (controle.touched || this.tentouEnviar()));
  }

  copiarChavePix(): void {
    navigator.clipboard.writeText('00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-4266141740005204000053039865802BR5925Loja Virtual Exemplo Ltda6304ABCD');
    this.codigoPixCopiado.set(true);
    setTimeout(() => this.codigoPixCopiado.set(false), 3000);
  }

  finalizarPedido(): void {
    this.tentouEnviar.set(true);

    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      // Rola a página suavemente para o topo para que o usuário veja o alerta de erro
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    this.pedidoConcluido.set(true);
    this.store.dispatch(limparCarrinho());
  }
}
