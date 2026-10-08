import { Component } from '@angular/core';
import { CardProduto } from '../card-produto/card-produto';

@Component({
  imports: [CardProduto],
  selector: 'app-lista-produtos',
  styleUrl: './lista-produtos.css',
  templateUrl: './lista-produtos.html',
})
export class ListaProdutos {}
