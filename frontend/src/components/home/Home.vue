<template>
  <div class="home">
    <PageTitle icon="fa fa-home" main="Dashboard" />
    <div class="stats">
      <Stat title="Clientes" :value="qtdClientes[0]" icon="fa fa-user" color="#d54d50" />
      <Stat title="Vendas" :value="qtdVendas[0]" icon="fa fa-file" color="#3bc480" />
      <!-- <Stat title="Usuários" :value="stat.users"
      icon="fa fa-user" color="#3282cd" />-->
    </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import Stat from "./Stat";
import axios from "axios";
import { baseApiUrl } from "@/global";

export default {
  name: "Home",
  components: { PageTitle, Stat },
  data: function() {
    return {
      qtdClientes: 0,
      qtdVendas: 0,
      stat: {},
      vendas: {}
    };
  },
  methods: {
    // getStats() {
    //     axios.get(`${baseApiUrl}/stats`).then(res => this.stat = res.data)
    // }
    quantidadeClientes() {
      axios.get(`${baseApiUrl}/quantidadeClientes`).then(res => {
        this.qtdClientes = res.data;
      });
    },
    quantidadeVendas() {
      axios.get(`${baseApiUrl}/quantidadeVendas`).then(res => {
        this.qtdVendas = res.data;
      });
    }
  },
  mounted() {
    // this.getStats();
    this.quantidadeClientes();
    this.quantidadeVendas();
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
