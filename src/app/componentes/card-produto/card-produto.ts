import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { ItemProduto } from '../../services/produto';
import { TruncatePipe } from '../../pipes/truncate-pipe';

@Component({
  imports: [CurrencyPipe, UpperCasePipe, TruncatePipe],
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
