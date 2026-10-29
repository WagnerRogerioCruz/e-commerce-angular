import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectItensCarrinho, selectValorItens, adicionarProduto, diminuirProduto, limparCarrinho } from '../../store/cart';
import { Carrinho } from '../../services/carrinho'; // <-- Mantemos para o sidebar abrir/fechar

@Component({
  imports: [CommonModule, CurrencyPipe, RouterLink],
  selector: 'app-carrinho-sidebar',
  styleUrl: './carrinho-sidebar.css',
  templateUrl: './carrinho-sidebar.html',
})
export class CarrinhoSidebar {
  private store = inject(Store);
  public cartService = inject(Carrinho) // <-- Controla o abrir/fechar

  // Pegando os dados reativos direto do NgRx Store
  itens = this.store.selectSignal(selectItensCarrinho);
  valorTotal = this.store.selectSignal(selectValorItens);

  aumentar(item: any) {
    this.store.dispatch(adicionarProduto({
      produto: item.produto,
      quantidade: 1,
      price: item.price
    }));
  }

  diminuir(produtoId: number) {
    this.store.dispatch(diminuirProduto({ produtoId }));
  }

  esvaziarCarrinho(): void {
    this.store.dispatch(limparCarrinho());
  }
}
