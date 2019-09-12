<template>
  <div class="home">
    <PageTitle icon="fa fa-home" main="Dashboard" />
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

export default {
  name: "Home",
  components: { PageTitle, Stat },
  data: function() {
    return {
      qtdClientes: 0,
      qtdVendas: 0,
      qtdDespesas: 0,
      stat: {},
      vendas: {}
    };
  },
  methods: {
  
  },
  mounted() {
   
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
