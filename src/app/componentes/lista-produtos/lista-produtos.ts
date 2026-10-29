import { Component, OnInit, signal, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
//import { adicionarProduto } from '../../store/cart';
import { Produto, ItemProduto } from '../../services/produto';
import { CardProduto } from '../card-produto/card-produto';

@Component({
  imports: [CardProduto, ReactiveFormsModule],
  selector: 'app-lista-produtos',
  styleUrl: './lista-produtos.css',
  templateUrl: './lista-produtos.html',
})

export class ListaProdutos implements OnInit {

  produtosOriginais: ItemProduto[] = []; // Guarda a lista completa da API
  produtos = signal<ItemProduto[]>([]); // Guarda a lista filtrada exibida na tela
  carregando = signal(true);

  // Requisito do documento: FormControl para busca reativa
  campoBusca = new FormControl('');

  private productService = inject(Produto);
  private store = inject(Store); // Injetando a Store do NgRx

  ngOnInit(): void {
    this.carregarProdutos();
    this.configurarBuscaReativa();
  }

  carregarProdutos(): void {
    this.carregando.set(true);
    
    // Chamando a API
    this.productService.obterProdutos().subscribe({
      next: (dadosDaApi) => {
        console.log('Dados recebidos com sucesso da API:', dadosDaApi); // Verifique o F12 do navegador
        this.produtosOriginais = dadosDaApi;
        this.produtos.set(dadosDaApi); // Atualiza o signal com os dados reais do banco/API
        this.carregando.set(false); // Desativa o "Carregando..."
      }, 
      error: (erro) => {
        console.error('Erro ao buscar produtos da API:', erro.message);
        this.carregando.set(false); // Desativa o "Carregando..."
        alert('Erro ao carregar a lista de produtos')
      }
    });
  }

  // Requisito técnico do PDF: Usar valueChanges (Observable) para reagir às digitações
  configurarBuscaReativa(): void {
    this.campoBusca.valueChanges.subscribe((termoBusca) => {
      const termo = (termoBusca || '').toLowerCase().trim();
      
      if (!termo) {
        this.produtos.set(this.produtosOriginais);
      } else {
        const filtrados = this.produtosOriginais.filter(p => 
          p.title.toLowerCase().includes(termo) || 
          p.category.toLowerCase().includes(termo)
        );
        this.produtos.set(filtrados);
      }
    });
  }
}
