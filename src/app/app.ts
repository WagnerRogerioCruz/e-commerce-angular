import { Component } from '@angular/core';
import { Cabecalho } from './componentes/cabecalho/cabecalho';
import { Rodape } from './componentes/rodape/rodape';
import { ListaProdutos } from './componentes/lista-produtos/lista-produtos';

@Component({
  imports: [Cabecalho, Rodape, ListaProdutos],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  
}
