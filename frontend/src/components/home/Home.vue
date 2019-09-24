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
                :data="dado"
                v-model="dadoBusca"
                :serializer="nome => nome.nome"
                @hit="dadoSelecionado = $event"
              />
            </b-form-group>
          </b-col>
          <b-col md="1" sm="12">
            <b-input-group-append>
              <b-input-group-text>
                <v-icon name="search"></v-icon>
              </b-input-group-text>
            </b-input-group-append>
          </b-col>
          <b-col md="3" sm="12">
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
      <Stat title="Vendas" icon="fas fa-receipt" color="#3bc480" tabela="Vendas" />
      <Stat title="Despesas" icon="fa fa-file" color="#3bc480" tabela="Despesas" />
      <!-- <Stat title="Usuários" :value="stat.users"
      icon="fa fa-user" color="#3282cd"-->
      <b-container>
        <div class="col-12">
          <div class="box">
            <canvas id="vendas"></canvas>
          </div>
        </div>
      </b-container>
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
//import Chart from "./Chart.vue";
import Chart from "chart.js";
import Chartist from "chartist";

export default {
  name: "Home",
  components: {
    PageTitle,
    Stat,
    "vue-bootstrap-typeahead": VueBootstrapTypeahead,
    Chart
  },
  data: function() {
    return {
      tipoBusca: "clientes",
      dado: [],
      dadoBusca: "",
      dadoSelecionado: null,
      stat: {},
      loaded: true,
      vendas: null,
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  watch: {
    dadoBusca: _.debounce(function(nome) {
      //  var busca = this.tipoBusca.substring(0,(this.tipoBusca.toLowerCase() -1))
      //  this.$router.push(`/busca/${this.dadoSelecionado.id}`);
      this.get(nome);
    }, 500),
    dadoSelecionado: _.debounce(function(nome) {
      var busca;
      if (this.tipoBusca === "clientes") {
        busca = this.tipoBusca.substring(0, this.tipoBusca.length - 1);
      } else {
        busca = this.tipoBusca.substring(0, this.tipoBusca.length - 2);
      }
      this.$router.push(`/${busca}/${this.dadoSelecionado.id}`);
    }, 200)
  },
  methods: {
    async get(nome) {
      const url = `${baseApiUrl}/${this.tipoBusca}/nome/${nome}`;
      await axios.get(url).then(res => (this.dado = res.data));
    },
    getVendas(){
       this.loaded = false;
    try {
      axios
        .get(`${baseApiUrl}/vendas`)
        .then(res => (this.vendas = res.data));
      this.loaded = true;
    } catch (error) {
      console.log(error);
    }
    
    }
  },
  mounted() {
    this.$nextTick(() => {
      var ctx = document.getElementById("vendas").getContext("2d");
      var config = {
        type: "line",
        data: {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
          ],
          datasets: [
            {
              label: "CoPilot",
              fill: false,
              borderColor: "#284184",
              pointBackgroundColor: "#284184",
              backgroundColor: "rgba(0, 0, 0, 0)",
              data: this.getVendas()
            },
            {
              label: "Personal Site",
              borderColor: "#4BC0C0",
              pointBackgroundColor: "#4BC0C0",
              backgroundColor: "rgba(0, 0, 0, 0)",
              data: this.personalNumbers
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: !this.isMobile,
          legend: {
            position: "bottom",
            display: true
          },
          tooltips: {
            mode: "label",
            xPadding: 10,
            yPadding: 10,
            bodySpacing: 10
          }
        }
      };

      new Chart(ctx, config);
    });
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
