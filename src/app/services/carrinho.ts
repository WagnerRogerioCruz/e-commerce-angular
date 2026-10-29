import { Service, signal, computed, effect } from '@angular/core';
import { ItemProduto } from './produto';

export interface ItemCarrinho {
    produto: ItemProduto;
    quantidade: number;

}

@Service()

export class Carrinho {
    // Função auxiliar para carregar do localStorage com segurança
    private static carregarDoStorage(): ItemCarrinho[] {
        try {
            const salvo = localStorage.getItem('carrinho');
            return salvo ? JSON.parse(salvo) : [];
        } catch (e) {
            return [];
        }
    }

    // Controla se o sidebar está aberto ou fechado
    estaAberto = signal(false);

    // Lista reativa de itens no carrinho - INICIALIZAÇÃO CORRETA: O sinal já nasce preenchido com o que estava no localStorage

    itens = signal<ItemCarrinho[]>(Carrinho.carregarDoStorage()); // substituiu <any[]>([]) pelo contrato/interface
    // O effect monitora as mudanças posteriores e atualiza o localStorage

    private readonly _salvarAutomaticamente = effect(() => {
        const itensAtuais = this.itens();
        localStorage.setItem('carrinho', JSON.stringify(itensAtuais));
    });

    // Alternar visibilidade do sidebar
    alternarCarrinho() {
        this.estaAberto.update(valor => !valor);
    }

    
}
