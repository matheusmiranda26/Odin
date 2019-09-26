<template>
  <div class="cliente">
    <b-breadcrumb class="breadcrumb" :items="items"></b-breadcrumb>
    <b-card class="m-3">
      <b-row>
        <b-col cols="auto" class="mr-auto">
          <router-link :to="{ name: 'editarCliente', params: { id: cliente.id }}">
            <b-button variant="warning">
              <v-icon name="pen" class="mr-3" />Editar
            </b-button>
          </router-link>
        </b-col>
        <b-col cols="auto">
          <b-button variant="danger">
            <v-icon name="trash" class="mr-3" />Excluir
          </b-button>
        </b-col>
      </b-row>
    </b-card>
    <b-card class="p-4 m-3">
      <input id="cliente-id" type="hidden" v-model="cliente.id" />
      <b-row class="titulo-card">
        <b-col md="11" sm="12">
          <p class="m-0 text-primary titulo text-uppercase">
            {{ cliente.nome }}
            <span v-show="cliente.nomeFantasia">- {{cliente.nomeFantasia}}</span>
          </p>
        </b-col>
        <b-col md="1" sm="12">
          <b-row>
            <p
              class="dado"
              :class="[cliente.status == '0' ? 'text-danger' : 'text-success' ]"
            >{{ cliente.status == '0' ? 'Inativo' : 'Ativo' }}</p>
          </b-row>
        </b-col>
      </b-row>
      <b-row class="titulo-card">
        <b-col md="12" sm="12">
          <p
            v-if="cliente.tipoCliente == 'juridica'"
            class="text-black-50 dado"
          >CNPJ: {{ cliente.cnpj_cpf }}</p>
          <p v-else class="text-black-50 dado">CPF: {{ cliente.cnpj_cpf }}</p>
        </b-col>
      </b-row>
      <b-row class="titulo-card">
        <b-col md="12" sm="12">
          <p
            v-if="cliente.tipoCliente == 'juridica'"
            class="text-black-50 dado"
          >IE: {{ cliente.inscricaoEstadual_rg }}</p>
          <p v-else class="text-black-50 dado">RG: {{ cliente.inscricaoEstadual_rg }}</p>
        </b-col>
      </b-row>
      <hr />
      <b-row>
        <b-col md="4" sm="12">
          <b-row class="justify-content-md-center">
            <p class="label text-secondary">Telefone Comercial:</p>
          </b-row>
          <b-row class="justify-content-md-center">
            <p class="dado text-black-50">{{ cliente.telefoneComercial }}</p>
          </b-row>
        </b-col>
        <b-col v-show="cliente.telefoneCelular !== ''" md="4" sm="12">
          <b-row class="justify-content-md-center">
            <p class="label text-secondary">Celular:</p>
          </b-row>
          <b-row class="justify-content-md-center">
            <p class="dado text-black-50">{{ cliente.telefoneCelular }}</p>
          </b-row>
        </b-col>
        <b-col md="4" sm="12">
          <b-row class="justify-content-md-center">
            <p class="label text-secondary">Email:</p>
          </b-row>
          <b-row class="justify-content-md-center">
            <p class="dado text-black-50">{{ cliente.email }}</p>
          </b-row>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="8" sm="12">
          <b-row class="justify-content-md-center"> 
            <p class="label text-secondary">Endereço:</p>
          </b-row>
          <b-row class="justify-content-md-center">
            <p class="dado text-black-50">
              {{ cliente.endereco }}, {{ cliente.numero }},
              <span
                v-show="cliente.complemento !== null"
              >{{ cliente.complemento }},</span>
              {{ cliente.cep }}
            </p>
          </b-row>
        </b-col>
        <b-col md="4" sm="12">
          <b-row class="justify-content-md-center">
            <p class="label text-secondary">Cidade:</p>
          </b-row>
          <b-row class="justify-content-md-center">
            <p class="dado text-black-50">{{ cliente.cidade }} - {{ cliente.estado }}</p>
          </b-row>
        </b-col>
      </b-row>
      <!-- <b-row>
        <b-col v-show="cliente.dataCadastro !== ''" md="4" sm="12">
          <b-row>
            <p class="label text-secondary">Data de Cadastro:</p>
          </b-row>
          <b-row>
            <p class="dado text-black-50">{{ cliente.dataCadastro }}</p>
          </b-row>
        </b-col>
      </b-row>-->
      <b-row v-show="cliente.observacoes !== null">
        <b-col md sm="12">
          <b-row class="justify-content-md-center">
            <p class="label text-secondary">Observações:</p>
          </b-row>
          <b-row class="justify-content-md-center">
            <p class="dado text-black-50">{{ cliente.observacoes }}</p>
          </b-row>
        </b-col>
      </b-row>
      <hr />
      <b-row class="text-center">
        <b-col>
          <p class="pb-2 compras text-secondary text-center">COMPRAS</p>
        </b-col>
      </b-row>

      <b-row
        v-for="item in vendas"
        :key="item.id"
        align-self="center"
        align-h="around"
      >
        <b-col md="2" sm="12" class="pr-2">
          <b-row class="justify-content-md-center">
            <p class="label text-secondary">Data:</p>
          </b-row>
          <b-row class="justify-content-md-center">
            <p class="dado text-black-50">{{item.data | moment("DD/MM/YYYY")}}</p>
          </b-row>
        </b-col>
        <b-col md="2" sm="12" class="pr-2 pl-2">
          <b-row class="justify-content-md-center">
            <p class="label text-secondary">Valor:</p>
          </b-row>
          <b-row class="justify-content-md-center">
            <p class="dado text-black-50">{{item.valorTotal | currency }}</p>
          </b-row>
        </b-col>
        <b-col md="1" sm="12" class="pr-2 pl-2">
          <b-row class="justify-content-md-center">
            <p class="label text-secondary">Qtd.:</p>
          </b-row>
          <b-row class="justify-content-md-center">
            <p class="dado text-black-50">{{item.quantidade }}</p>
          </b-row>
        </b-col>
        <b-col md="1" sm="12" class="pr-2 pl-2">
          <b-row class="justify-content-md-center">
            <p class="label text-secondary">Forma:</p>
          </b-row>
          <b-row class="justify-content-md-center">
            <p class="dado text-black-50">{{item.formaPagamento }}</p>
          </b-row>
        </b-col>
        <b-col md="1" sm="12" class="pr-4 pl-2">
          <b-row class="justify-content-md-center">
            <p class="label text-secondary">Parc.:</p>
          </b-row>
          <b-row class="justify-content-md-center">
            <p class="dado text-black-50">{{item.condicaoPagamento + 'X' }}</p>
          </b-row>
        </b-col>
        <b-col md="1" sm="12" class="pr-2 pl-2">
          <b-row class="justify-content-md-center">
            <p class="label text-secondary pr-5">Pedido:</p>
          </b-row>
          <b-row class="justify-content-md-center">
            <p class="dado text-black-50">{{item.numeroPedido }}</p>
          </b-row>
        </b-col>
        <b-col md="1" sm="12" class="pr-2 pl-2">
          <b-row class="justify-content-md-center">
            <p class="label text-secondary">N.F:</p>
          </b-row>
          <b-row class="justify-content-md-center">
            <p class="dado text-black-50">{{item.numeroNF}}</p>
          </b-row>
        </b-col>
        <b-col md="1" sm="12" class="pl-2 pr-0 mr-0">
          <b-row class="justify-content-md-center" align-w="center">
            <router-link :to="{ name: 'venda', params: { id: item.id }}">
              <b-button variant="warning" class="mr-2">
                <v-icon name="eye"></v-icon>
              </b-button>
            </router-link>
          </b-row>
        </b-col>
        <!-- <b-col md="2" sm="12" class="pr-3 pl-3">
            <b-row>
              <p class="label text-secondary">Transp.:</p>
            </b-row>
            <b-row>
              <p class="dado text-black-50">{{item.transportadora}}</p>
            </b-row>
        </b-col>-->
      </b-row>
    </b-card>
    <b-card class="bg-transparent border-0">
      <b-row>
        <b-col cols="auto" class="mr-auto">
          <router-link to="/clientes">
            <b-button variant="secondary">
              <v-icon name="long-arrow-alt-left" class="mr-3" />Voltar
            </b-button>
          </router-link>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import { baseApiUrl } from "@/global";
import axios from "axios";

export default {
  name: "Cliente",
  data: function() {
    return {
      cliente: {},
      vendas: {},
      items: [
        {
          text: "Inicio",
          to: "/"
        },
        {
          text: "Clientes",
          to: "/clientes"
        },
        {
          text: "Perfil",
          active: true
        }
      ]
    };
  },
  mounted() {
    const url = `${baseApiUrl}/clientes/${this.$route.params.id}`;
    axios.get(url).then(res => (this.cliente = res.data));

    const urlVendas = `${baseApiUrl}/vendaPorCliente/${this.$route.params.id}`;
    axios.get(urlVendas).then(res => (this.vendas = res.data));
  }
};
</script>

<style>
.label {
  font-size: 1.4em;
  margin-bottom: 0;
}
.dado {
  font-size: 1.4em;
  font-weight: bold;
}
.titulo {
  font-size: 1.9em;
}
.titulo-card {
  margin: 0;
  padding: 0;
}
.cliente {
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  align-content: center;
}
.compras {
  font-size: 1.5em;
  padding: 0;
  margin-bottom: 0;
  font-weight: bold;
  text-decoration: underline;
}
hr {
  margin: 0;
  margin-bottom: 10px;
  padding: 0;
}
</style>
