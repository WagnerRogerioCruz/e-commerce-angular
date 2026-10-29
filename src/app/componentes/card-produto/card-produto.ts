import { Component, Input, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { ItemProduto } from '../../services/produto';
import { adicionarProduto } from '../../store/cart';
import { TruncatePipe } from '../../pipes/truncate-pipe';
import { DiscountPipe } from '../../pipes/discount-pipe';


@Component({
  imports: [CommonModule, CurrencyPipe, UpperCasePipe, TruncatePipe, DiscountPipe, RouterLink],
  selector: 'app-card-produto',
  styleUrl: './card-produto.css',
  templateUrl: './card-produto.html',
})

export class CardProduto {
  @Input({ required: true }) produto?: ItemProduto;

  private store = inject(Store);

  adicionarAoCarrinho(): void {
    const item = this.produto;
    if (item) {
      // Aplica a mesma regra de desconto da página de detalhes
      const precoFinal = item.price > 100 ? item.price - (item.price * (15 / 100)) : item.price;

      this.store.dispatch(adicionarProduto({
        produto: item,
        quantidade: 1,
        price: precoFinal
      }));
    }
  }
}
