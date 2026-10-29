import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupabaseCartService {
  private http = inject(HttpClient);

  // Endereço da tabela carts no Supabase
  private cartsUrl = 'https://vatfcszylgblokqgrtqr.supabase.co/rest/v1/carts';
  
  // Mesma chave anônima usada no produto.ts
  private anonKey = 'sb_publishable_XjqDK1R3ExHqmoKspqjI4A_lrVnYgW6';

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'apikey': this.anonKey,
      'Authorization': `Bearer ${this.anonKey}`,
      'Content-Type': 'application/json',
      // Diz ao Supabase: "Se houver conflito no user_id, atualize (merge - Faz o UPSERT) o registo existente"
      'Prefer': 'resolution=merge-duplicates' 
    });
  }

  // Método para salvar/atualizar o carrinho na tabela 'carts' do Supabase
  salvarCarrinhoNoSupabase(payload: { user_id: number; products: any[]; date: string }): Observable<any> {
    const headers = this.getHeaders();
    // Usamos ?on_conflict=user_id para o Supabase saber qual coluna fiscaliza o duplicado
    const url = `${this.cartsUrl}?on_conflict=user_id`;
    return this.http.post(url, payload, { headers });
  }

  // Método para buscar o carrinho salvo do usuário (ex: user_id = 1)
  obterCarrinhoDoSupabase(userId: number): Observable<any[]> {
    const headers = this.getHeaders();
    // Busca o carrinho mais recente do usuário ordenado pela data
    const url = `${this.cartsUrl}?user_id=eq.${userId}&order=date.desc&limit=1`;
    return this.http.get<any[]>(url, { headers });
  }
}