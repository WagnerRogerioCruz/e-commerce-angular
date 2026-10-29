import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Produto, ItemProduto } from '../../services/produto';
import { adicionarProduto } from '../../store/cart';
import { DiscountPipe } from '../../pipes/discount-pipe';

@Component({
  imports: [CommonModule, CurrencyPipe, DiscountPipe, RouterLink],
  selector: 'app-detalhes-produto',
  styleUrl: './detalhes-produto.css',
  templateUrl: './detalhes-produto.html',
})

export class DetalhesProduto implements OnInit {
  private route = inject(ActivatedRoute);
  private produtoService = inject(Produto);
  private store = inject(Store);

  produto = signal<ItemProduto | null>(null);
  carregando = signal(true);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.carregarDetalhes(id);
    }
  }

  carregarDetalhes(id: number): void {
    this.carregando.set(true);
    // Busca todos os produtos do Supabase e filtra pelo ID correspondente
    this.produtoService.obterProdutos().subscribe({
      next: (produtos) => {
        const encontrado = produtos.find(p => p.id === id);
        this.produto.set(encontrado || null);
        this.carregando.set(false);
      },
      error: (err) => {
        console.error('Erro ao carregar detalhes:', err);
        this.carregando.set(false);
      }
    });
  }

  adicionarAoCarrinho(): void {
    const item = this.produto();
    if (item) {

      // Calcula o preço aplicando a regra de desconto caso seja maior que 100
      const precoFinal = item.price > 100 ? item.price - (item.price * (15 / 100)) : item.price;

      this.store.dispatch(adicionarProduto({
        produto: item,
        quantidade: 1,
        price: precoFinal
      }));
    }
  }
}
