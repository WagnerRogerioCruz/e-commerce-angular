import { createAction, props } from '@ngrx/store';
import { ItemProduto } from '../../services/produto';

/**
 * ACTIONS
 * Representam a intenção de mudar o estado.
 * São mensagens que dizem o que aconteceu no componente, não alteram o estado diretamente
 */

// Ação disparada quando o usuário clica em adicionar produto
export const adicionarProduto = createAction(
  '[Carrinho] Adicionar produto',
  props<{ produto: ItemProduto; quantidade: number, price: number }>()
);

export const diminuirProduto = createAction(
  '[Carrinho] Diminuir produto',
  props<{ produtoId: number }>()
);

export const limparCarrinho = createAction(
  '[Cabecalho] Limpar carrinho'
);

export const carregarCarrinhoSupabase = createAction(
  '[App / Inicialização] Carregar carrinho do Supabase'
);

export const carregarCarrinhoSucesso = createAction(
  '[Supabase API] Carregar carrinho sucesso',
  props<{ itens: any[] }>()
);