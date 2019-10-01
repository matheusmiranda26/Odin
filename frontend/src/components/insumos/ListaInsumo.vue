<template>
  <div class="insumo">
    <!-- <PageTitle icon="fas fa-user-ninja" main="Insumos"/> -->
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
          <router-link to="/novoInsumo">
            <b-button variant="success">
              Novo Insumo
              <v-icon name="plus"></v-icon>
            </b-button>
          </router-link>
        </b-col>
      </b-row>
    </b-card>
    <b-card no-body align="center">
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Todos" active>
            <b-table
              hover
              striped
              :items="insumos"
              :fields="fields"
              :filter="filter"
              :current-page="currentPage"
              :per-page="perPage"
              @row-clicked="linhaClicada"
            >
              <div slot="actions" slot-scope="data">
                <router-link :to="{ name: 'editarInsumo', params: { id: data.item.id }}">
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
          </b-tab>
          <b-tab
            v-for="fornecedor in fornecedores"
            v-bind:key="fornecedor.id"
            :title="fornecedor.nome"
          >
            <b-table
              hover
              striped
              :items="insumos"
              :fields="fields"
              :filter="fornecedor.nome"
              :current-page="currentPage"
              :per-page="perPage"
              @row-clicked="linhaClicada"
            >
              <div slot="actions" slot-scope="data">
                <router-link :to="{ name: 'editarInsumo', params: { id: data.item.id }}">
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
          </b-tab>
        </b-tabs>
      </b-card>
    </b-card>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import PageTitle from "../template/PageTitle";

export default {
  name: "ListaInsumos",
  components: { PageTitle },
  data: function() {
    return {
      mode: "save",
      isLoading: false,
      insumos: [],
      fornecedores: [],
      fields: [
        { key: "nome", label: "Nome", sortable: true },
        { key: "quantidade", label: "Quantidade", sortable: true },
        { key: "preco", label: "Preço", sortable: true },
        { key: "fornecedor", label: "Fornecedor", sortable: true },
        { key: "codigo", label: "Código", sortable: true },
        { key: "cor", label: "Cor", sortable: true },
        { key: "actions", label: "Ações" }
      ],
      items: [
        {
          text: "Inicio",
          href: "/"
        },
        {
          text: "Insumos",
          active: true
        }
      ],
      filter: null,
      currentPage: 1,
      perPage: 25,
      pageOptions: [25, 50, 100],
      totalRows: 1
    };
  },
  methods: {
    formatter() {},
    carregarInsumos() {
      const url = `${baseApiUrl}/insumos`;
      axios.get(url).then(res => {
        this.insumos = res.data;
      });
      
      this.insumos.sort(function(a, b) {
        if (a.nome > b.nome) {
          return 1;
        }
        if (a.nome < b.nome) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    },
    reset() {
      this.mode = "save";
      this.insumo = {};
      this.carregarInsumos();
    },
    remover(id_Insumo) {
      // alert(id_insumo)
      const id = id_insumo;
      axios
        .delete(`${baseApiUrl}/insumos/${id}`)
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
      this.$router.push({ name: "insumo", params: { id: item.id } });
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
    const url = `${baseApiUrl}/fornecedoresNome`;
    axios.get(url).then(res => {
      this.fornecedores = res.data;
    });
    this.carregarInsumos();
    this.totalRows = this.items.length + 1;
  }
};
</script>

<style>
</style>
