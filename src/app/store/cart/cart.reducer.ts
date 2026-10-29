import { createReducer, on } from "@ngrx/store";
import { ItemProduto } from '../../services/produto';
import { adicionarProduto, diminuirProduto, limparCarrinho, carregarCarrinhoSucesso } from "./cart.actions";
/**
 * ESTADO 
 * Define o formato dos dados guardados no cofre
 */
export interface CartState {
    itens: { produto: ItemProduto; quantidade: number; price: number }[];
}
/**
 * ESTADO INICIAL
 * Como o carrinho começa quando a aplicação é aberta pela primeira vez na sessão
 */
export const initialCartState: CartState = {
    itens: [],
}
/**
 * REDUCER
 * Função pura que recebe o estado atual e uma ação disparada
 */
export const cartReducer = createReducer(
    initialCartState,

    // Adiciona ou incrementa se já existir
    on(adicionarProduto, (state, { produto, quantidade, price }) => {
        const index = state.itens.findIndex(i => i.produto.id === produto.id);
        if (index > -1) {
            const novosItens = [...state.itens];
            novosItens[index] = {
                ...novosItens[index],
                quantidade: novosItens[index].quantidade + quantidade
            };
            return { ...state, itens: novosItens };
        } else {
            return {
                ...state,
                itens: [...state.itens, { produto, quantidade, price }]
            };
        }
    }),

    // Diminui a quantidade ou remove se chegar a 0
    on(diminuirProduto, (state, { produtoId }) => {
        const novosItens = state.itens.map(item => {
            if (item.produto.id === produtoId) {
                return { ...item, quantidade: item.quantidade - 1 };
            }
            return item;
        }).filter(item => item.quantidade > 0);

        return { ...state, itens: novosItens };
    }),

    // limpar carrinho :
    on(limparCarrinho, (state) => ({
        ...state,
        itens: [] // Retorna a lista de itens totalmente vazia
    })),

    on(carregarCarrinhoSucesso, (state, { itens }) => ({
        ...state,
        itens: itens
    }))
);