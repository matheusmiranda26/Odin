<template>
  <aside class="menu z-depth-5" v-show="isMenuVisible">
    <!-- <a class="logo-wrapper"><img alt="" class="img-fluid" src=""/></a> -->
    <!-- <a class="logo-wrapper">
      <p class="text-default">ODIN</p>
    </a> -->
    <b-list-group class="list-group-flush mt-3">
      <router-link to="/dashboard" @click.native="activeItem = 1">
        <b-list-group-item :action="true" :class="activeItem === 1 && 'active'">Dashboard</b-list-group-item>
      </router-link>
      <router-link to="/clientes" @click.native="activeItem = 2">
        <b-list-group-item :action="true" :class="activeItem === 2 && 'active'">Clientes</b-list-group-item>
      </router-link>
      <router-link to="/fornecedores" @click.native="activeItem = 3">
        <b-list-group-item :action="true" :class="activeItem === 3 && 'active'">Fornecedores</b-list-group-item>
      </router-link>
      <router-link to="/vendas" @click.native="activeItem = 4">
        <b-list-group-item :action="true" :class="activeItem === 4 && 'active'">Vendas</b-list-group-item>
      </router-link>
      <router-link to="/vendedores" @click.native="activeItem = 5">
        <b-list-group-item :action="true" :class="activeItem === 5 && 'active'">Vendedores</b-list-group-item>
      </router-link>
      <router-link to="/transportadoras" @click.native="activeItem = 6">
        <b-list-group-item :action="true" :class="activeItem === 6 && 'active'">Transportadoras</b-list-group-item>
      </router-link>
      
      <!-- <router-link to="/tables" @click.native="activeItem = 4">
        <b-list-group-item :action="true" :class="activeItem === 4 && 'active'">Tables</b-list-group-item>
      </router-link>
      <router-link to="/admin" @click.native="activeItem = 5">
        <b-list-group-item :action="true" :class="activeItem === 5 && 'active'">Admin</b-list-group-item>
      </router-link>
      <router-link to="/404" @click.native="activeItem = 6">
        <b-list-group-item :action="true" :class="activeItem === 6 && 'active'">Teste</b-list-group-item>
      </router-link>
       <router-link to="/cliente" @click.native="activeItem = 7">
        <b-list-group-item :action="true" :class="activeItem === 7 && 'active'">Client</b-list-group-item>
      </router-link> -->
    </b-list-group>
  </aside>
  <!-- <aside class="menu z-depth-5" v-show="isMenuVisible">
        <div class="menu-filter">
            <i class="fa fa-search fa-lg"></i>
            <input type="text" placeholder="Digite para filtrar..."
                v-model="treeFilter" class="filter-field">
        </div>
        <Tree :data="treeData" :options="treeOptions"
            :filter="treeFilter" ref="tree" />
  </aside>-->
</template>

<script>
import { mapState } from "vuex";
// import { mdbListGroup, mdbListGroupItem } from "mdbvue";

import { baseApiUrl } from "@/global";
import axios from "axios";

export default {
  name: "Menu",
  // components: { mdbListGroup, mdbListGroupItem },
  computed: mapState(["isMenuVisible"]),
  data() {  
    return {
      activeItem: 1
    }
  },
  methods: {
    onNodeSelect(node) {
      this.$router.push({
        name: "articlesByCategory",
        params: { id: node.id }
      });

      if (this.$mq === "xs" || this.$mq === "sm") {
        this.$store.commit("toggleMenu", false);
      }
    }
  },
  mounted() {
    this.$refs.tree.$on("node:selected", this.onNodeSelect);
  },
  beforeMount () {
    this.activeItem = this.$route.matched[0].props.default.page
  }
};
</script>

<style>
.menu {
  grid-area: menu;
  background: white;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  z-index: 1010;
  height: 100vh;

  /* box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12); */
}

.menu a,
.menu a:hover {
  color: #fff;
  text-decoration: none;
}

.menu .menu-filter {
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid #aaa;
}

.menu .menu-filter i {
  color: #aaa;
  margin-right: 10px;
}

.menu input {
  color: #ccc;
  font-size: 1.3rem;
  border: 0;
  outline: 0;
  width: 100%;
  background: transparent;
}

.logo-wrapper {
  width: 100%;
  padding: 2.5rem;
  font-size: 2em;
}
</style>
