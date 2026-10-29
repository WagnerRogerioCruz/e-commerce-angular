import { Service, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface ItemProduto {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating?: {
        rate: number;
        count: number;
    };
}

@Service()

export class Produto {
    // Injetando o HttpClient do Angular Obrigatório usar inject() em vez de construtor
    private http = inject(HttpClient);

    // URL da API (exemplo usando a Fake Store API - https://fakestoreapi.com/products)
    private apiUrl = 'https://vatfcszylgblokqgrtqr.supabase.co/rest/v1/produtos?select=*';

    // Substitua 'SUA_CHAVE_ANON_PUBLICA_AQUI' pela chave real que copiou nas configurações do Supabase
    private anonKey = 'sb_publishable_XjqDK1R3ExHqmoKspqjI4A_lrVnYgW6';

    // Método que retorna um Observable com a lista de produtos da API Fake Store API
    //obterProdutos(): Observable<ItemProduto[]> {
    //    return this.http.get<ItemProduto[]>(this.apiUrl);
    //}

    obterProdutos(): Observable<ItemProduto[]> {
        const headers = new HttpHeaders({
            'apikey': this.anonKey,
            'Authorization': `Bearer ${this.anonKey}`
        });
        return this.http.get<ItemProduto[]>(this.apiUrl, { headers });
    }

    // Adicione este método dentro da classe Produto em src/app/services/produto.ts
    obterProdutoPorId(id: number): Observable<ItemProduto> {
        const headers = new HttpHeaders({
            'apikey': this.anonKey,
            'Authorization': `Bearer ${this.anonKey}`
        });
        // O Supabase permite filtrar por ID usando eq.id
        const urlFiltro = `${this.apiUrl}&id=eq.${id}`;
        return this.http.get<ItemProduto[]>(urlFiltro, { headers }).pipe(
            map(produtos => produtos[0]) // Retorna o primeiro item encontrado
        );
    }
}
