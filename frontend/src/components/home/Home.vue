<template>
  <div class="home">
    <PageTitle icon="fa fa-home" main="Dashboard" />
    <div class="pb-3 pt-3">
      <b-row>
        <b-input-group>
          <!--     <b-form-input v-model="filter" :placeholder="'Pesquise o ' + [[ tipoBusca ]]" /> -->
          <b-col md="8" sm="12">
            <b-form-group label-for="venda-nome">
              <!-- <b-form-input id="venda-nome" type="text" v-model="venda.nomeCliente" required/> -->
              <vue-bootstrap-typeahead
                prepend="Pesquise"
                :data="dado"
                v-model="dadoBusca"
                :serializer="nome => nome.nome"
                @hit="dadoSelecionado = $event"
                placeholder="Digite o nome"
              >
              <div slot="prepend">
                <b-button disabled >
                  Pesquise
                </b-button>
                </div>
                <div slot="append">
                  <button class="btn btn-primary" disabled >
                    <v-icon name="search" />
                  </button>
                </div>
              </vue-bootstrap-typeahead>
            </b-form-group>
          </b-col>
          <!--<b-col md="1" sm="12">
            <b-input-group-append>
              <b-input-group-text>
                <v-icon name="search"></v-icon>
              </b-input-group-text>
            </b-input-group-append>
          </b-col>-->
          <b-col md="4" sm="12">
            <b-form-group label-for="tipo-busca">
              <b-form-select id="tipo-busca" options v-model="tipoBusca">
                <option value="clientes">Cliente</option>
                <option value="fornecedores">Fornecedor</option>
                <option value="vendedores">Vendedor</option>
              </b-form-select>
            </b-form-group>
          </b-col>
        </b-input-group>
      </b-row>
    </div>
    <div class="stats">
      <Stat title="Clientes" icon="fa fa-user" color="#d54d50" tabela="Clientes" />
      <Stat title="Vendas mês atual" icon="fa fa-receipt" color="#3bc480" tabela="vendaMes" />
      <Stat title="Despesas mês atual" icon="fa fa-file" color="#3bc480" tabela="despesasMes" />
      <!-- <Stat title="Usuários" :value="stat.users"
      icon="fa fa-user" color="#3282cd"
      -->
      <b-container>
        <div class="col-12">
          <div class="box">
            <canvas id="grafico-vendas" width="100%" height="20%"></canvas>
          </div>
        </div>
      </b-container>
    </div>
    <b-modal ref="modal" id="modal-center" centered title="Insumos Acabando" size="xl">
      <b-row v-for="insumo in insumos" :key="insumo.id">
        <b-col md="3" sm="12">
          <b-row class="justify-content-md-center">
            <span class="text-secondary dado">Nome:</span>
          </b-row>
          <b-row class="justify-content-md-center">
            <span class="text-black-50 dado">{{ insumo.nome }}</span>
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
        <b-col md="3" sm="12">
          <b-row class="justify-content-md-center">
            <span class="text-secondary dado">Qtd. Minima:</span>
          </b-row>
          <b-row class="justify-content-md-center">
            <span class="text-black-50 dado">{{ insumo.quantidadeMinima }}</span>
          </b-row>
        </b-col>
        <b-col>
          <router-link :to="{ name: 'insumo', params: { id: insumo.id }}">
            <b-button variant="danger">
              Ver
              <v-icon name="eye"></v-icon>
            </b-button>
          </router-link>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import Stat from "./Stat";
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";
import axios from "axios";
import { baseApiUrl, showError } from "@/global";
import _ from "underscore";
import Chart from "chart.js";
import moment from "moment";

export default {
  name: "Home",
  components: {
    PageTitle,
    Stat,
    "vue-bootstrap-typeahead": VueBootstrapTypeahead
    //  LineChart
  },
  data: function() {
    return {
      tipoBusca: "clientes",
      dado: [],
      dadoBusca: "",
      dadoSelecionado: null,
      stat: {},
      loaded: false,
      vendas: [],
      dataVendas: [],
      quantidadeVendas: [],
      insumos: {}
    };
  },
  watch: {
    dadoBusca: _.debounce(function(nome) {
      this.get(nome);
    }, 500),
    dadoSelecionado: _.debounce(function() {
      var busca;
      if (this.tipoBusca === "clientes") {
        busca = this.tipoBusca.substring(0, this.tipoBusca.length - 1);
      } else {
        busca = this.tipoBusca.substring(0, this.tipoBusca.length - 2);
      }
      this.$router.push(`/${busca}/${this.dadoSelecionado.id}`);
    }, 200),
    quantidadeVendas: _.debounce(function() {
      var ctx = document.getElementById("grafico-vendas");
      this.chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.dataVendas,
          datasets: [
            {
              label: "Vendas",
              backgroundColor: "rgba(54, 162, 235, 0.5)",
              borderColor: "rgb(54, 162, 235)",
              fill: false,
              data: this.quantidadeVendas
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: "Quantidade de Vendas Mês Atual",
            fontSize: 15
          },
          legend: {
            display: false
          }
        }
      });
    })
  },
  methods: {
    async get(nome) {
      const url = `${baseApiUrl}/${this.tipoBusca}/nome/${nome}`;
      await axios.get(url).then(res => (this.dado = res.data));
    },
    async verificarInsumos() {
      const url = `${baseApiUrl}/insumosAcabando`;
      await axios
        .get(url)
        .then(res => (this.insumos = res.data))
        .then(() => {
          if (this.insumos.length > 0) {
            this.$refs["modal"].show();
          }
        });
    }
  },
  mounted() {
    this.verificarInsumos();
    this.loaded = false;
    try {
      axios.get(`${baseApiUrl}/vendaPorDia`).then(res => {
        this.dataVendas = res.data.map(venda => {
          return moment(venda.data).format("DD/MM/YYYY");
        });
        this.quantidadeVendas = res.data.map(venda => {
          return venda.quantidade;
        });
        this.vendas = res.data;
      });
      this.loaded = true;
    } catch (error) {
      showError(error);
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
