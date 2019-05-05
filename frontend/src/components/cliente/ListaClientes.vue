<template>
  <div class="cliente">
    <!-- <PageTitle icon="fas fa-user-ninja" main="Clientes"/> -->
    <b-breadcrumb class="breadcrumb" :items="items"></b-breadcrumb>

    <b-card class="mb-3">
      <b-row>
        <b-col md="4" sm="12">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Pesquise"/>
            <b-input-group-append>
               <b-input-group-text><v-icon name="search"></v-icon></b-input-group-text>
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <b-col md="3" sm="3">
          <router-link to="/novoCliente">
            <b-button variant="success">
              Novo
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
        :items="clientes"
        :fields="fields"
        :filter="filter"
        :current-page="currentPage"
        :per-page="perPage"
        @row-clicked="linhaClicada"
      >
        <div slot="actions" slot-scope="data">
          <router-link :to="{ name: 'editarCliente', params: { id: data.item.id }}">
            <b-button variant="warning" @click="emitMethod(data.item)" class="mr-2">
              <v-icon name="pen"></v-icon>
            </b-button>
          </router-link>

          <b-button variant="danger">
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
  name: "ListaClientes",
  components: { PageTitle },
  data: function() {
    return {
      mode: "save",
      isLoading: false,
      clientes: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "nomeCliente", label: "Nome", sortable: true },
        { key: "email", label: "E-mail", sortable: true },
        { key: "actions", label: "Ações" }
      ],
      items: [
        {
          text: "Inicio",
          href: "/"
        },
        {
          text: "Clientes",
          active: true
        }
      ],
      filter: null,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 20, 30],
      totalRows: 1
    };
  },
  methods: {
    loadclients() {
      // this.isLoading = true;
      const url = `${baseApiUrl}/clientes`;
      axios.get(url).then(res => {
        this.clientes = res.data;
        // this.isLoading = false;
      });
    },
    reset() {
      this.mode = "save";
      this.cliente = {};
      this.loadclients();
    },
    remove() {
      const id = this.cliente.id;
      axios
        .delete(`${baseApiUrl}/clientes/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
          this.hideModal();
        })
        .catch(showError);
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    linhaClicada(item, index, event) {
      this.$router.push({ name: "cliente", params: { id: item.id } });
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
    this.loadclients();
    this.$store.commit("setClient", null);
    this.totalRows = this.items.length + 1;
  }
};
</script>

<style>
.btn-circle.btn-lg {
  width: 50px;
  height: 50px;
  padding: 10px 16px;
  font-size: 18px;
  line-height: 1.33;
  border-radius: 25px;
}

.btn-circle.btn-xl {
  width: 70px;
  height: 70px;
  padding: 10px 16px;
  border-radius: 35px;
  font-size: 24px;
  line-height: 1.33;
}

.btn-circle {
  width: 30px;
  height: 30px;
  padding: 6px 0px;
  border-radius: 15px;
  text-align: center;
  font-size: 12px;
  line-height: 1.42857;
}
</style>
