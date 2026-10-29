import { Routes } from "@angular/router";
import { Checkout } from "./pages/checkout/checkout";
import { Home } from "./pages/home/home";
import { DetalhesProduto } from "./pages/detalhes-produto/detalhes-produto";

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'checkout', component: Checkout },
    { path: 'produto/:id', component: DetalhesProduto },
    { path: '**', redirectTo: '' }
];