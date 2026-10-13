import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ItemProduto } from '../../services/produto';

@Component({
  imports: [],
  selector: 'app-card-produto',
  styleUrl: './card-produto.css',
  templateUrl: './card-produto.html',
})

export class CardProduto {
  @Input() produto?: ItemProduto;
  @Output() adicionar = new EventEmitter<any>();

  clicouComprar() {
    this.adicionar.emit(this.produto)
  }
}
