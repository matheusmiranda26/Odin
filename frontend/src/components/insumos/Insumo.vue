<template>
  <b-container fluid class="insumo">
    <b-breadcrumb class="breadcrumb" :items="items"></b-breadcrumb>
    <b-card class="m-3">
      <b-row>
        <b-col cols="auto" class="mr-auto">
          <router-link :to="{ name: 'editarInsumo', params: { id: insumo.id }}">
            <b-button variant="warning">
              Editar
              <v-icon name="pen"></v-icon>
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
      <input id="insumo-id" type="hidden" v-model="insumo.id" />
      <b-row class="titulo-card">
        <b-col md="11" sm="12">
          <p class="m-0 p-0 text-primary titulo text-uppercase">
            <span>{{insumo.nome}}</span>
            <span>- {{insumo.fornecedor}}</span>
          </p>
        </b-col>
      </b-row>
      <b-row class="titulo-card">
        <b-col v-show="insumo.codigo ==! null" md="3" sm="12" align-self="center">
          <b-row class="justify-content-md-center">
            <span class="text-secondary label">Código:</span>
          </b-row>
          <b-row class="justify-content-md-center">
            <span class="text-black-50 dado">{{insumo.codigo}}</span>
          </b-row>
        </b-col>
        <b-col md="3" sm="12">
          <b-row class="justify-content-md-center">
            <span class="text-secondary dado">Preço:</span>
          </b-row>
          <b-row class="justify-content-md-center">
            <span class="text-black-50 dado">{{ insumo.preco | currency }}</span>
          </b-row>
        </b-col>
        <b-col md="3" sm="12">
          <b-row class="justify-content-md-center">
            <span class="text-secondary dado">Quantidade:</span>
          </b-row>
          <b-row class="justify-content-md-center">
            <span class="text-black-50 dado">{{ insumo.quantidade }}</span>
          </b-row>
        </b-col>
        <b-col v-show="insumo.cor ==! null" md="3" sm="12">
          <b-row class="justify-content-md-center">
            <span class="text-secondary dado">Cor:</span>
          </b-row>
          <b-row class="justify-content-md-center">
            <span class="text-black-50 dado">{{ insumo.cor }}</span>
          </b-row>
        </b-col>
      </b-row>
      <b-row class="pb-2">
        <b-col md="4" sm="12">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Pesquise" />
            <b-input-group-append>
              <b-input-group-text>
                <v-icon name="search"></v-icon>
              </b-input-group-text>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>

      <b-table
        hover
        striped
        :items="historico"
        :fields="fields"
        :filter="filter"
        :current-page="currentPage"
        :per-page="perPage"
      ></b-table>
      <b-row>
        <b-col md="7" class="my-1">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            class="my-0 p-3"
          ></b-pagination>
        </b-col>
        <b-col md="5" sm="12" class="my-0 p-3">
          <b-form-group label-cols-sm="6" label="Por página" class="m-0">
            <b-form-select style="max-width:50%;" v-model="perPage" :options="pageOptions"></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>

    <b-card class="bg-transparent border-0">
      <b-row>
        <b-col cols="auto" class="mr-auto">
          <router-link to="/insumos">
            <b-button variant="secondary">
              Voltar
              <v-icon name="long-arrow-alt-left"></v-icon>
            </b-button>
          </router-link>
        </b-col>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "Insumo",
  data: function() {
    return {
      insumo: {},
      historico: {},
      filter: null,
      currentPage: 1,
      perPage: 25,
      pageOptions: [25, 50, 100],
      totalRows: 1,
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false /* doesn't work with directive */
      },
      fields: [
        {
          key: "data",
          label: "Data",
          sortable: true,
          formatter: value => {
            let data = new Date(value);
            return (
              data.getDay() + "/" + data.getMonth() + "/" + data.getFullYear()
            );
          }
        },
        { key: "tipo", label: "Tipo", sortable: true },
        { key: "quantidade", label: "Quantidade", sortable: true },
        { key: "quantidadePecas", label: "Qtd. Peças", sortable: true },
        { key: "media", label: "Média", sortable: true },
        { key: "referencia", label: "Referencia", sortable: true },
        { key: "estoqueAtual", label: "Estoque Atual", sortable: true }
      ],
      items: [
        {
          text: "Inicio",
          to: "/"
        },
        {
          text: "Insumos",
          to: "/insumos"
        },
        {
          text: "Perfil",
          active: true
        }
      ]
    };
  },
  methods: {},
  mounted() {
    const url = `${baseApiUrl}/insumos/${this.$route.params.id}`;
    axios.get(url).then(res => (this.insumo = res.data));
    const urlHistorico = `${baseApiUrl}/insumosHistorico/${this.$route.params.id}`;
    axios.get(urlHistorico).then(res => (this.historico = res.data));
    this.totalRows = this.items.length + 1;
  }
};
</script>

<style>
.label {
  font-size: 1.4em;
  margin-bottom: 0;
  font-weight: bold;
}
.dado {
  font-size: 1.4em;
}
.titulo {
  font-size: 1.9em;
}
.titulo-card {
  margin: 0;
  padding-bottom: 10px;
}
.insumo {
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  align-content: center;
}
</style>
