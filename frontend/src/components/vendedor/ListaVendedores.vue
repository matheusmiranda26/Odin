<template>
  <div class="vendedor">
    <!-- <PageTitle icon="fas fa-user-ninja" main="Vendedores"/> -->
    <b-breadcrumb class="breadcrumb" :items="items"></b-breadcrumb>

    <b-card class="mb-3">
      <b-row>
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
        <b-col md="3" sm="3">
          <router-link to="/novoCliente">
            <b-button variant="success">
              <v-icon name="plus" class="mr-3"/>
              Novo Vendedor              
            </b-button>
          </router-link>
        </b-col>
        <!--<b-col md="3" class="my-1">
          <b-form-group
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
          >
            <b-form-checkbox-group v-model="filterOn" class="mt-1">
              <b-form-checkbox value="">Todos</b-form-checkbox>
              <b-form-checkbox value="0">Ativo</b-form-checkbox>
              <b-form-checkbox value="1">Inativo</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
        </b-col>-->
      </b-row>
    </b-card>
    <b-card no-body align="center">
      <b-table
        hover
        striped
        :items="vendedores"
        :fields="fields"
        :filter="filter"
        :current-page="currentPage"
        :per-page="perPage"
        @row-clicked="linhaClicada"
        :filterIncludedFields="filterOn"
      >
        <div slot="actions" slot-scope="data">
          <router-link :to="{ name: 'editarVendedor', params: { id: data.item.id }}">
            <b-button variant="warning" class="mr-2">
              <v-icon name="pen"></v-icon>
            </b-button>
          </router-link>

          <b-button variant="danger" @click="remover(data.item.id)">
            <v-icon name="trash"></v-icon>
          </b-button>
        </div>
      </b-table>
      <b-row>
        <b-col md="9" class="my-1">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            class="my-0 p-3"
          ></b-pagination>
        </b-col>
        <b-col md="3" sm="12" class="my-0 p-3">
          <b-form-group label-cols-sm="6" label="Por página" class="m-0">
            <b-form-select style="max-width:50%;" v-model="perPage" :options="pageOptions"></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import PageTitle from "../template/PageTitle";

export default {
  name: "ListaVendedores",
  components: { PageTitle },
  data: function() {
    return {
      mode: "save",
      isLoading: false,
      vendedores: [],
      fields: [
        // { key: "id", label: "Código", sortable: true },
        { key: "nome", label: "Nome", sortable: true, sortDirection: "asc" },
       // { key: "apelido", label: "Apelido", sortable: true },
        { key: "cidade", label: "Cidade", sortable: true },
        { key: "estado", label: "Estado", sortable: true },
        {
          key: "status",
          label: "Status",
          sortable: true,
          formatter: value => {
            return value === "1" ? "Ativo" : "Inativo";
          }
        },
        // { key: "email", label: "E-mail", sortable: true },
        { key: "actions", label: "Ações" }
      ],
      items: [
        {
          text: "Inicio",
          href: "/"
        },
        {
          text: "Vendedores",
          active: true
        }
      ],
      filter: null,
      filterOn: [],
      currentPage: 1,
      perPage: 25,
      pageOptions: [25, 50, 100],
      totalRows: 1
    };
  },
  methods: {
    carregarVendedores() {
      // this.isLoading = true;
      const url = `${baseApiUrl}/vendedores`;
      axios.get(url).then(res => {
        this.vendedores = res.data;
        // this.isLoading = false;
      });
    },
    reset() {
      this.mode = "save";
      this.vendedor = {};
      this.carregarVendedores();
    },
    remover(id_cliente) {
      // alert(id_cliente)
      const id = id_cliente;
      axios
        .delete(`${baseApiUrl}/vendedores/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    linhaClicada(item) {
      this.$router.push({ name: "vendedor", params: { id: item.id } });
    }
  },
  computed: {
    sortOptions() {
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key };
        });
    }
  },
  mounted() {
    this.carregarVendedores();
    this.$store.commit("setClient", null);
    this.totalRows = this.items.length + 1;
  }
};
</script>

<style>
</style>
