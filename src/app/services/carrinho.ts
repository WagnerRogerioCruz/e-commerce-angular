import { Service, signal } from '@angular/core';

@Service()
export class Carrinho {
    itens = signal<any[]>([]);

    adicionar(produto: any){
        this.itens.update((itens) => [...itens, produto]);
    }

    obterQuantidade(): number {
        return this.itens().length;
    }
}
