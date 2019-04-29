<template>
  <div class="client">
    <!-- <PageTitle icon="fas fa-user-ninja" main="Clientes"/> -->
    <b-breadcrumb class="breadcrumb" :items="items"></b-breadcrumb>

    <b-card class="mb-3">
      <b-row>
        <b-col md="4" sm="12">
          <b-form-input v-model="filter" placeholder="Pesquise"/>
        </b-col>
        <b-col md="3" sm="3">
           <b-button variant="success" @click=" reset(); showModal();">
            Novo   <i class="fas fa-user-plus"></i>
          </b-button>
        </b-col>
      </b-row>
    </b-card>
    <b-card no-body align="center">
      <b-table
        hover
        striped
        :items="clients"
        :fields="fields"
        :filter="filter"
        :current-page="currentPage"
        :per-page="perPage"
      >
        <div slot="actions" slot-scope="data">
          <b-button
            variant="warning"
            @click="loadclient(data.item); this.$refs['modal-form-client'].show();"
            class="mr-2"
          >
            <i class="fas fa-edit"></i>
          </b-button>
          <b-button variant="danger" @click="loadclient(data.item, 'remove')">
            <i class="fa fa-trash"></i>
          </b-button>
        </div>
      </b-table>
      <b-row>
        <b-col md="10" class="my-1">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            class="my-0 p-3"
          ></b-pagination>
        </b-col>
        <b-col md="2" sm="12" class="my-0 p-3">
          <b-form-group label-cols-sm="6" label="Por página" class="m-0">
            <b-form-select style="max-width:50%;" v-model="perPage" :options="pageOptions"></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>

    <b-modal
      hide-footer
      hide-header-close
      no-close-on-esc
      title="Novo Cliente"
      ref="modal-form-client"
      size="xl"
      centered
    >
      <b-form>
        <input id="client-id" type="hidden" v-model="client.id">
        <b-row>
          <b-col md="6" sm="12">
            <b-form-group label="Nome:" label-for="client-name">
              <b-form-input
                id="client-name"
                type="text"
                v-model="client.name"
                required
                :readonly="mode === 'remove'"
                placeholder="Informe o Nome do Usuário..."
              />
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="E-mail:" label-for="client-email">
              <b-form-input
                id="client-email"
                type="text"
                v-model="client.email"
                required
                :readonly="mode === 'remove'"
                placeholder="Informe o E-mail do Usuário..."
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-form-checkbox
          id="client-admin"
          v-show="mode === 'save'"
          v-model="client.admin"
          class="mt-3 mb-3"
        >Administrador?</b-form-checkbox>
        <b-row v-show="mode === 'save'">
          <b-col md="6" sm="12">
            <b-form-group label="Senha:" label-for="client-password">
              <b-form-input
                id="client-password"
                type="password"
                v-model="client.password"
                required
                placeholder="Informe a Senha do Usuário..."
              />
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="Confirmação de Senha:" label-for="client-confirm-password">
              <b-form-input
                id="client-confirm-password"
                type="password"
                v-model="client.confirmPassword"
                required
                placeholder="Confirme a Senha do Usuário..."
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
      <b-row>
        <b-col xs="12">
          <b-button variant="primary" v-if="mode === 'save'" @click="save()">Salvar</b-button>
          <b-button variant="danger" v-if="mode === 'remove'" @click="remove()">Excluir</b-button>
          <b-button variant="blue-grey" class="ml-2 white-text" @click="hideModal()">Cancelar</b-button>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import PageTitle from "../template/PageTitle";
import { mdbBtn } from "mdbvue";

export default {
  name: "Client",
  components: { PageTitle, mdbBtn },
  data: function() {
    return {
      mode: "save",
      isLoading: false,
      client: {},
      clients: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "email", label: "E-mail", sortable: true },
        {
          key: "admin",
          label: "Administrador",
          sortable: true,
          formatter: value => (value ? "Sim" : "Não")
        },
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
      perPage: 1,
      pageOptions: [1, 2, 3],
      totalRows: 1
    };
  },
  methods: {
    loadclients() {
      this.isLoading = true;
      const url = `${baseApiUrl}/users`;
      axios.get(url).then(res => {
        this.clients = res.data;
        this.isLoading = false;
      });
    },
    reset() {
      this.mode = "save";
      this.client = {};
      this.loadclients();
    },
    save() {
      const method = this.client.id ? "put" : "post";
      const id = this.client.id ? `/${this.client.id}` : "";
      axios[method](`${baseApiUrl}/clients${id}`, this.client)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
          this.hideModal();
        })
        .catch(showError);
    },
    remove() {
      const id = this.client.id;
      axios
        .delete(`${baseApiUrl}/clients/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
          this.hideModal();
        })
        .catch(showError);
    },
    loadclient(client, mode = "save") {
      this.mode = mode;
      this.client = { ...client };
      this.showModal();
    },
    hideModal() {
      this.$refs["modal-form-client"].hide();
    },
    showModal() {
      this.$refs["modal-form-client"].show();
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
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
    this.$store.commit("setTittle", "CLIENTES");
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
