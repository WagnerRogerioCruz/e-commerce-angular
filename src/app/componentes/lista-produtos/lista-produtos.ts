import { Component } from '@angular/core';
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

  constructor(private productService: Produto) {
    this.produtos = this.productService.produtos;
  }
}
