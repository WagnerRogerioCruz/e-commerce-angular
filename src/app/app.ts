import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Cabecalho } from './componentes/cabecalho/cabecalho';
import { Rodape } from './componentes/rodape/rodape';
import { RouterOutlet } from '@angular/router';
import { CarrinhoSidebar } from './componentes/carrinho-sidebar/carrinho-sidebar';
import { Carrinho } from './services/carrinho';
import * as CartActions from './store/cart/cart.actions';

@Component({
  imports: [Cabecalho, Rodape, RouterOutlet, CarrinhoSidebar],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})

export class App implements OnInit {
  private store = inject(Store);
  cartService = inject(Carrinho);

  ngOnInit() {
    // Ao abrir ou recarregar a página (F5), busca o carrinho salvo no Supabase
    this.store.dispatch(CartActions.carregarCarrinhoSupabase());
  }
}
