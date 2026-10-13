import { Component } from '@angular/core';
import { Carrinho } from '../../services/carrinho';

@Component({
  imports: [],
  selector: 'app-cabecalho',
  styleUrl: './cabecalho.css',
  templateUrl: './cabecalho.html',
})

export class Cabecalho {
  constructor(public cartService: Carrinho) {};
}
