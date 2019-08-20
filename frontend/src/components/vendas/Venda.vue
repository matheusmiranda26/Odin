<template>
  <div class="venda">
    <b-breadcrumb class="breadcrumb" :items="items"></b-breadcrumb>
    <b-card class="m-3">
      <b-row>
        <b-col cols="auto" class="mr-auto">
          <router-link :to="{ name: 'editarCliente', params: { id: venda.id }}">
            <b-button variant="warning">
              Editar
              <v-icon name="pen"></v-icon>
            </b-button>
          </router-link>
        </b-col>
        <b-col cols="auto">
          <b-button variant="danger">
            Excluir
            <v-icon name="trash"></v-icon>
          </b-button>
        </b-col>
      </b-row>
    </b-card>
    <b-card class="p-4 m-3">
      <input id="venda-id" type="hidden" v-model="venda.id" />
      <b-row class="titulo-card">
        <b-col md="11" sm="12">
          <p class="m-0 text-primary titulo text-uppercase">
            <span>{{venda[0].nomeCliente}}</span>
          </p>
        </b-col>
      </b-row>
      <b-row class="titulo-card">
        <b-col md="4" sm="12">
          <span class="text-black-50 dado">Data: {{ venda[0].data }}</span>
        </b-col>
        <b-col md="4" sm="12">
          <span class="text-black-50 dado">Valor Total: {{ venda[0].valorTotal }}</span>
        </b-col>
        <b-col md="4" sm="12" v-show="venda[0].descontoTotal !== null">
          <span class="text-black-50 dado">Desconto: {{ venda[0].descontoTotal }}</span>
        </b-col>
        <b-col md="4" sm="12">
          <span class="text-black-50 dado">Forma de Pagamento: {{ venda[0].formaPagamento }}</span>
        </b-col>
      </b-row>
      <b-row class="titulo-card">
        <b-col md="4" sm="12">
          <span class="text-black-50 dado">Nota Fiscal: {{ venda[0].numeroNF }}</span>
        </b-col>
        <b-col md="4" sm="12">
          <span class="text-black-50 dado">Pedido: {{ venda[0].numeroPedido }}</span>
        </b-col>
        <b-col md="4" sm="12">
          <span class="text-black-50 dado">Quantidade: {{ venda[0].quantidade }}</span>
        </b-col>
      </b-row>
      <hr />
      <div v-for="item in pagamentos" :key="item.id">
        <b-row>
          <b-col md="4" sm="12">
            <span class="text-black-50 dado">Data: {{item.data}}</span>
          </b-col>
          <b-col md="4" sm="12">
            <span class="text-black-50 dado">Valor: {{item.valor}}</span>
          </b-col>
           <b-col md="4" sm="12">
            <span class="text-black-50 dado">Parcela: {{item.numeroParcela}}</span>
          </b-col>
        </b-row>
      </div>
    </b-card>
    <b-card class="bg-transparent border-0">
      <b-row>
        <b-col cols="auto" class="mr-auto">
          <router-link to="/vendas">
            <b-button variant="secondary">
              Voltar
              <v-icon name="long-arrow-alt-left"></v-icon>
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
import moment from "moment";

export default {
  name: "Venda",
  data: function() {
    return {
      venda: {},
      pagamentos: {},
      items: [
        {
          text: "Inicio",
          to: "/"
        },
        {
          text: "Vendas",
          to: "/vendas"
        },
        {
          text: "Perfil",
          active: true
        }
      ]
    };
  },
  mounted() {
    const url = `${baseApiUrl}/vendas/${this.$route.params.id}`;
    axios.get(url).then(res => (this.venda = res.data));
    const urlPagamentos = `${baseApiUrl}/pagamentosVendas/vendas/${this.$route.params.id}`;
    axios.get(urlPagamentos).then(res => (this.pagamentos = res.data));
    // alert(moment(this.venda.dataCadastro).format('L'))
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
</style>
