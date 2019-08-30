<template>
  <div class="venda">
    <!-- <PageTitle icon="fas fa-user-ninja" main="Vendas"/> -->
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
          <router-link to="/novaVenda">
            <b-button variant="success">
              Nova Venda
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
        :items="vendas"
        :fields="fields"
        :filter="filter"
        :current-page="currentPage"
        :per-page="perPage"
        @row-clicked="linhaClicada"
      >
        <div slot="actions" slot-scope="data">
          <router-link :to="{ name: 'venda', params: { id: data.item.id }}">
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
import moment from "moment";

export default {
  name: "ListaVendas",
  components: { PageTitle },
  data: function() {
    return {
      mode: "save",
      isLoading: false,
      vendas: [],
      fields: [
        // { key: "id", label: "Código", sortable: true },
        {
          key: "data",
          label: "Data",
          formatter: (value, key, item) => {
            let data = new Date(value)
            return data.getDay() + '/' + data.getMonth() + '/' + data.getFullYear();
          },
          sortable: true
        },
        { key: "nomeCliente", label: "Cliente", sortable: true },
        { key: "numeroPedido", label: "Pedido", sortable: true },
        { key: "numeroNF", label: "Nota Fiscal", sortable: true },
        { key: "quantidade", label: "Quantidade", sortable: true },
        { key: "valorTotal", label: "Valor", sortable: true },
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
          text: "Vendas",
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
    carregarVendas() {
      // this.isLoading = true;
      const url = `${baseApiUrl}/vendas`;
      axios.get(url).then(res => {
        this.vendas = res.data;
        // this.isLoading = false;
      });
    },
    reset() {
      this.mode = "save";
      this.venda = {};
      this.carregarVendas();
    },
    remover(id_venda) {
      // alert(id_venda)
      const id = id_venda;
      axios
        .delete(`${baseApiUrl}/vendas/${id}`)
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
    linhaClicada(item, index, event) {
      this.$router.push({ name: "venda", params: { id: item.id } });
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
    this.carregarVendas();
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
