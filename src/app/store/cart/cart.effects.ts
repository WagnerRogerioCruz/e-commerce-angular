import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import * as CartActions from './cart.actions';
import { selectItensCarrinho } from './cart.selectors';
import { SupabaseCartService } from '../../services/supabase-cart';


@Injectable()
export class CartEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private supabaseCartService = inject(SupabaseCartService);

  // Synchronize cart state with Supabase on cart actions
  sincronizarCarrinhoSupabase$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CartActions.adicionarProduto,
          CartActions.diminuirProduto,
          CartActions.limparCarrinho
        ),
        withLatestFrom(this.store.select(selectItensCarrinho)),
        tap(([action, itens]) => {
          console.log('🔄 A sincronizar o carrinho com o Supabase...', itens);

          // Salva com a estrutura idêntica ao CartState do NgRx
          const payloadCarrinho = {
            user_id: 1, // ID do utilizador simulado na tabela users
            products: itens.map(i => ({
              produto: i.produto,
              quantidade: i.quantidade,
              price: i.price
            })),
            date: new Date().toISOString()
          };

          // Chamada real para o Supabase
          this.supabaseCartService.salvarCarrinhoNoSupabase(payloadCarrinho).subscribe({
            next: () => console.log('✅ Carrinho salvo com sucesso no Supabase!'),
            error: (err: any) => console.error('❌ Erro ao salvar o carrinho no Supabase:', err)
          });
        })
      ),
    { dispatch: false }
  );

  // Effect que busca os dados do Supabase quando o app inicia
  carregarCarrinho$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.carregarCarrinhoSupabase),
      switchMap(() =>
        this.supabaseCartService.obterCarrinhoDoSupabase(1).pipe(
          map((resposta) => {
            console.log('📡 Dados do carrinho obtidos do Supabase:', resposta);
            if (resposta && resposta.length > 0) {
              // Mapeia o JSON do Supabase de volta para a estrutura do Redux
              const itensDoBanco = resposta[0].products || [];
              return CartActions.carregarCarrinhoSucesso({ itens: itensDoBanco });
            }
            return CartActions.carregarCarrinhoSucesso({ itens: [] });
          }),
          catchError((err) => {
            console.error('❌ Erro ao carregar carrinho do Supabase:', err);
            return of(CartActions.carregarCarrinhoSucesso({ itens: [] }));
          })
        )
      )
    )
  );

}