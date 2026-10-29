import { Component, OnInit, signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { limparCarrinho, selectQuantItens, selectValorItens } from '../../store/cart';
import { RouterLink } from '@angular/router';
import { Carrinho } from '../../services/carrinho';
import { CurrencyPipe } from '@angular/common';

@Component({
  imports: [CurrencyPipe, RouterLink],
  selector: 'app-cabecalho',
  styleUrl: './cabecalho.css',
  templateUrl: './cabecalho.html',
})

export class Cabecalho {
  private store = inject(Store);
  public cartService = inject(Carrinho); // <-- para o botão do topo abrir o sidebar

  // Signal para controlar se o menu mobile está aberto
  menuAberto = signal(false);

  // LENDO O COFRE - // Convertendo os seletores do NgRx em Signals reativos
  quantidade = this.store.selectSignal(selectQuantItens);
  valorTotal = this.store.selectSignal(selectValorItens);

  alternarMenu(): void {
    this.menuAberto.update(val => !val);
  }

    esvaziarCarrinho(): void {
    this.store.dispatch(limparCarrinho());
  }
}
