import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import Auth from '@/components/auth/Auth'
import ListaClientes from '@/components/cliente/ListaClientes'
import NovoCliente from '@/components/cliente/NovoCliente'
import Cliente from '@/components/cliente/Cliente'
import EditarCliente from '@/components/cliente/EditarCliente'
import ListaVendas from '@/components/vendas/ListaVendas'
import NovaVenda from '@/components/vendas/NovaVenda'
import EditarVenda from '@/components/vendas/EditarVenda'
import Venda from '@/components/vendas/Venda'
import NovoVendedor from '@/components/vendedor/NovoVendedor'
import EditarVendedor from '@/components/vendedor/EditarVendedor'
import ListaVendedores from '@/components/vendedor/ListaVendedores'
import Vendedor from '@/components/vendedor/Vendedor'
import ListaFornecedor from '@/components/fornecedor/ListaFornecedores'
import NovoFornecedor from '@/components/fornecedor/NovoFornecedor'
import EditarFornecedor from '@/components/fornecedor/EditarFornecedor'
import Fornecedor from '@/components/fornecedor/Fornecedor'
import ListaTransportadora from '@/components/transportadora/ListaTransportadora'
import NovaTransportadora from '@/components/transportadora/NovaTransportadora'
import EditarTransportadora from '@/components/transportadora/EditarTransportadora'
import Transportadora from '@/components/transportadora/Transportadora'
import ListaInsumo from '@/components/insumos/ListaInsumo'
import NovoInsumo from '@/components/insumos/NovoInsumo'
import EditarInsumo from '@/components/insumos/EditarInsumo'
import Insumo from '@/components/insumos/Insumo'
import ListaDespesas from '@/components/despesas/ListaDespesas'
import NovaDespesa from '@/components/despesas/NovaDespesa'
import EditarDespesa from '@/components/despesas/EditarDespesa'
import Despesa from '@/components/despesas/Despesa'


import {
    userKey
} from '@/global'

Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/',
    component: Home
}, {
    name: 'adminPages',
    path: '/admin',
    component: AdminPages,
    meta: { requiresAdmin: true }
}, {
    name: 'auth',
    path: '/auth',
    component: Auth
}, {
    name: 'listaClientes',
    path: '/clientes',
    component: ListaClientes
}, {
    name: 'novoCliente',
    path: '/novoCliente',
    component: NovoCliente
}, {
    name: 'cliente',
    path: '/cliente/:id',
    component: Cliente
}, {
    name: 'editarCliente',
    path: '/editarCliente/:id',
    component: EditarCliente
},{
    name: 'listaVendas',
    path: '/vendas',
    component: ListaVendas
},{
    name: 'novaVenda',
    path: '/novaVenda',
    component: NovaVenda
},{
    name: 'venda',
    path: '/vendas/:id',
    component: Venda
},{
    name: 'editarVenda',
    path: '/editarVenda/:id',
    component: EditarVenda
},{
    name: 'novoVendedor',
    path: '/novoVendedor',
    component: NovoVendedor
},{
    name: 'editarVendedor',
    path: '/editarVendedor/:id',
    component: EditarVendedor
},{
    name: 'listaVendedores',
    path: '/vendedores',
    component: ListaVendedores
},{
    name: 'vendedor',
    path: '/vendedor/:id',
    component: Vendedor
},{
    name: 'listaFornecedores',
    path: '/fornecedores',
    component: ListaFornecedor
},{
    name: 'novoFornecedors',
    path: '/novoFornecedor',
    component: NovoFornecedor
},{
    name: 'editarFornecedor',
    path: '/editarFornecedor/:id',
    component: EditarFornecedor
},{
    name: 'fornecedor',
    path: '/fornecedor/:id',
    component: Fornecedor
},{
    name: 'transportadora',
    path: '/transportadora/:id',
    component: Transportadora
},{
    name: 'listaTransportadora',
    path: '/transportadoras',
    component: ListaTransportadora
},{
    name: 'novaTransportadora',
    path: '/novaTransportadora',
    component: NovaTransportadora
},{
    name: 'editarTransportadora',
    path: '/editarTransportadora/:id',
    component: EditarTransportadora
},{
    name: 'insumo',
    path: '/insumo/:id',
    component: Insumo
},{
    name: 'listaInsumo',
    path: '/insumos',
    component: ListaInsumo
},{
    name: 'novoInsumo',
    path: '/novoInsumo',
    component: NovoInsumo
},{
    name: 'editarInsumo',
    path: '/editarInsumo/:id',
    component: EditarInsumo
},{
    name: 'despesa',
    path: '/despesa/:id',
    component: Despesa
},{
    name: 'listaDespesa',
    path: '/despesas',
    component: ListaDespesas
},{
    name: 'novaDespesa',
    path: '/novaDespesa',
    component: NovaDespesa
},{
    name: 'editarDespesa',
    path: '/editarDespesa/:id',
    component: EditarDespesa
}]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)

    if (to.matched.some(record => record.meta.requiresAdmin)) {
        const user = JSON.parse(json)
        user && user.admin ? next() : next({
            path: '/'
        })
    } else {
        next()
    }
})

export default router