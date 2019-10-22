<template>
  <div class="despesa">
    <!-- <PageTitle icon="fas fa-user-ninja" main="Despesas"/> -->
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
          <router-link to="/novaDespesa">
            <b-button variant="success">
              Nova Despesa
              <v-icon name="plus"></v-icon>
            </b-button>
          </router-link>
        </b-col>
      </b-row>
    </b-card>
    <b-card no-body align="center">
      <b-table
        hover
        striped
        :items="despesas"
        :fields="fields"
        :filter="filter"
        :current-page="currentPage"
        :per-page="perPage"
        @row-clicked="linhaClicada"
      >
        <div slot="actions" slot-scope="data">
          <!-- <router-link :to="{ name: 'despesa', params: { id: data.item.id }}">
            <b-button variant="warning" class="mr-2">
              <v-icon name="pen"></v-icon>
            </b-button>
          </router-link> -->

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
  name: "ListaDespesas",
  components: { PageTitle },
  data: function() {
    return {
      mode: "save",
      isLoading: false,
      despesas: [],
      fields: [
        // { key: "id", label: "Código", sortable: true },
        {
          key: "data",
          label: "Data",
          formatter: (value) => {
            let data = new Date(value)
            return data.getDay() + '/' + data.getMonth() + '/' + data.getFullYear();
          },
          sortable: true
        },
        { key: "valor", label: "Valor", sortable: true },
        { key: "pago", label: "Pago", sortable: true },
        { key: "observacao", label: "Observações", sortable: true },
        { key: "nomeFornecedor", label: "Fornecedor", sortable: true },
        //{ key: "valorTotal", label: "Valor", sortable: true },
        // { key: "estado", label: "Estado", sortable: true },
        // { key: "email", label: "E-mail", sortable: true },
        { key: "actions", label: "Ações" }
      ],
      items: [
        {
          text: "Inicio",
          href: "/"
        },
        {
          text: "Despesas",
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
    carregarDespesas() {
      // this.isLoading = true;
      const url = `${baseApiUrl}/despesas`;
      axios.get(url).then(res => {
        this.despesas = res.data; 
        // this.isLoading = false;
      });
    },
    reset() {
      this.mode = "save";
      this.despesa = {};
      this.carregarDespesas();
    },
    remover(id_despesa) {
      // alert(id_despesa)
      const id = id_despesa;
      axios
        .delete(`${baseApiUrl}/despesas/${id}`)
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
      this.$router.push({ name: "despesa", params: { id: item.id } });
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
    this.carregarDespesas();
    this.$store.commit("setClient", null);
    this.totalRows = this.items.length + 1;
  }
};
</script>

<style>
</style>
