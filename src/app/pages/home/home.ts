import { Component } from '@angular/core';
import { ListaProdutos } from '../../componentes/lista-produtos/lista-produtos';

@Component({
  imports: [ListaProdutos],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {}
