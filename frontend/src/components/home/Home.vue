<template>
  <div class="home">
    <PageTitle icon="fa fa-home" main="Dashboard" />
    <div class="pb-3 pt-3">
      <b-row>
        <b-input-group>
          <!--     <b-form-input v-model="filter" :placeholder="'Pesquise o ' + [[ tipoBusca ]]" /> -->

          <b-col md="6" sm="12">
            <b-form-group label-for="venda-nome">
              <!-- <b-form-input id="venda-nome" type="text" v-model="venda.nomeCliente" required/> -->
              <vue-bootstrap-typeahead
                :data="dado"
                v-model="dadoBusca"
                :serializer="nome => nome.nomeCliente"
                @hit="dadoSelecionado = $event"
              />
            </b-form-group>
          </b-col>

          <b-form-group label-for="tipo-busca">
            <b-form-select id="tipo-busca" options v-model="tipoBusca">
              <option value="clientes">Cliente</option>
              <option value="fornecedores">Fornecedor</option>
              <option value="vendedores">Vendedor</option>
            </b-form-select>
          </b-form-group>
          <b-input-group-append>
            <b-input-group-text>
              <v-icon name="search"></v-icon>
            </b-input-group-text>
          </b-input-group-append>
        </b-input-group>
      </b-row>
    </div>
    <div class="stats">
      <Stat title="Clientes" icon="fa fa-user" color="#d54d50" tabela="Clientes" />
      <Stat title="Vendas" icon="fas fa-receipt" color="#3bc480" tabela="Vendas" />
      <Stat title="Despesas" icon="fa fa-file" color="#3bc480" tabela="Despesas" />
      <!-- <Stat title="Usuários" :value="stat.users"
      icon="fa fa-user" color="#3282cd" />-->
    </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import Stat from "./Stat";
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";
import axios from "axios";
import { baseApiUrl } from "@/global";
import _ from "underscore";

export default {
  name: "Home",
  components: {
    PageTitle,
    Stat,
    "vue-bootstrap-typeahead": VueBootstrapTypeahead
  },
  data: function() {
    return {
      tipoBusca: "clientes",
      dado: [],
      dadoBusca: "",
      dadoSelecionado: null,
      stat: {},
      vendas: {}
    };
  },
  watch: {
    dadoBusca: _.debounce(function(nome) {
      this.get(nome);
    }, 500)
  },
  methods:{
    async get(nome) {
      const url = `${baseApiUrl}/${this.tipoBusca}/nome/${nome}`;
      await axios.get(url).then(res => (this.dado = res.data));
    }
  }
};
</script>

<style>
.stats {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
