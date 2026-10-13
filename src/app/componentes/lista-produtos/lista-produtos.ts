import { Component } from '@angular/core';
import { Carrinho } from '../../services/carrinho';
import { Produto, ItemProduto } from '../../services/produto';
import { CardProduto } from '../card-produto/card-produto';

@Component({
  imports: [CardProduto],
  selector: 'app-lista-produtos',
  styleUrl: './lista-produtos.css',
  templateUrl: './lista-produtos.html',
})

export class ListaProdutos {
  produtos: ItemProduto[] = [];

  constructor(
    private productService: Produto,
    private cartService: Carrinho
  
  ) {
    this.produtos = this.productService.produtos;
  }

  receberProduto(produto: any) {
    console.log('Produto adicionado:', produto?.title);
    this.cartService.adicionar(produto);
  }
}
