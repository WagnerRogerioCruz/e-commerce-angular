import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CartState } from "./cart.reducer";


/**
 * SELECTORS
 * Funções usadas para let fatias específicas do cofre
 */

// 1. Pega a fatia principal do cofre global
export const selectCartState = createFeatureSelector<CartState>('cart');

// 2. Lê a lista completa de itens do carrinho (pegar apenas os itens do carrinho)
export const selectItensCarrinho = createSelector(
    selectCartState,
    (state: CartState) => state.itens
);

// 3. Lê só a quantidade total de itens no carrinho
export const selectQuantItens = createSelector(
    selectItensCarrinho,
    (items) => items.reduce((total, item) => total + item.quantidade, 0)
    //(state) => state.itens.length
);

// 4. Valor total acumulado (Preço x Quantidade de cada produto)
export const selectValorItens = createSelector(
    selectItensCarrinho,
    (items) => items.reduce((total, item) => total + (item.price * item.quantidade), 0)

)

