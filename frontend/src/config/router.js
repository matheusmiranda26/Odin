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
import Venda from '@/components/vendas/Venda'

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