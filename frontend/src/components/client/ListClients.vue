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
          <router-link to="/newClient">
            <b-button variant="success">
              Novo
              <i class="fas fa-user-plus"></i>
            </b-button>
          </router-link>
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
        @row-clicked="linhaClicada"
      >
        <div slot="actions" slot-scope="data">
          <router-link :to="{ name: 'editClient', params: { id: data.item.id }}">
            <b-button variant="warning" @click="emitMethod(data.item)" class="mr-2">
              <i class="fas fa-edit"></i>
            </b-button>
          </router-link>
          
          <b-button variant="danger">
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
            <b-form-group label="Nome do cliente:" label-for="client-nome">
              <b-form-input
                id="client-nome"
                type="text"
                v-model="client.nomeCliente"
                required
                :readonly="mode === 'remove'"
              />
            </b-form-group>
            {{ client.nomeCliente}}
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="Nome Fantasia:" label-for="client-fantasia">
              <b-form-input
                id="client-fantasia"
                type="text"
                v-model="client.nomeFantasia"
                required
                :readonly="mode === 'remove'"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row v-show="mode === 'save'">
          <b-col md="6" sm="12">
            <b-form-group label="CNPJ:" label-for="client-cnpj">
              <b-form-input id="client-cnpj" type="text" v-model="client.cnpj_cpf" required/>
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="Inscrição Estadual:" label-for="client-inscricao-estadual">
              <b-form-input
                id="client-inscricao-estadual"
                type="text"
                v-model="client.inscricaoEstadual_rg"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row v-show="mode === 'save'">
          <b-col md="6" sm="12">
            <b-form-group label="Data Fundação:" label-for="client-data">
              <b-form-input id="client-data" type="date" v-model="client.dataFundacao" required/>
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="Telefone Comercial:" label-for="client-telefone-comercial">
              <b-form-input
                id="client-telefone-comercial"
                type="text"
                v-model="client.telefoneComercial"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row v-show="mode === 'save'">
          <b-col md="6" sm="12">
            <b-form-group label="Tipo Cliente:" label-for="client-tipo-cliente">
              <b-form-select id="client-tipo-cliente" options v-model="client.tipoCliente" required>
                <option value="fisica">Fisica</option>
                <option value="juridica">Juridica</option>
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="Observações:" label-for="client-observacoes">
              <b-form-input id="client-observacoes" type="text" v-model="client.observacoes"/>
            </b-form-group>
          </b-col>
        </b-row>
        <hr>
        <b-row v-show="mode === 'save'">
          <b-col md="6" sm="12">
            <b-form-group label="CEP:" label-for="client-cep">
              <b-form-input id="client-cep" type="text" v-model="client.cep" required/>
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="Endereço:" label-for="client-endereco">
              <b-form-input id="client-endereco" type="text" v-model="client.endereco"/>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row v-show="mode === 'save'">
          <b-col md="6" sm="12">
            <b-form-group label="Numero:" label-for="client-numero">
              <b-form-input id="client-numero" type="text" v-model="client.numero" required/>
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="Complemento:" label-for="client-complemento">
              <b-form-input id="client-complemento" type="text" v-model="client.complemento"/>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row v-show="mode === 'save'">
          <b-col md="6" sm="12">
            <b-form-group label="Bairro:" label-for="client-bairro">
              <b-form-input id="client-bairro" type="text" v-model="client.bairro" required/>
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="Cidade:" label-for="client-cidade">
              <b-form-input id="client-cidade" type="text" v-model="client.cidade"/>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row v-show="mode === 'save'">
          <b-col md="6" sm="12">
            <b-form-group label="Estado:" label-for="client-estado">
              <b-form-input id="client-estado" type="text" v-model="client.estado" required/>
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="Email:" label-for="client-email">
              <b-form-input id="client-email" type="text" v-model="client.email" required/>
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
import { EventBus } from "../../config/eventBus";
// import { mdbBtn } from "mdbvue";

export default {
  name: "ListClients",
  components: { PageTitle },
  data: function() {
    return {
      mode: "save",
      isLoading: false,
      client: {},
      clients: [
        {
          id: 1,
          nomeCliente: "teste",
          email: "email"
        }
      ],
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
      const url = `${baseApiUrl}/clients`;
      axios.get(url).then(res => {
        this.clients = res.data;
        // this.isLoading = false;
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
    },
    emitMethod(client2) {
      this.$store.commit("setClient", client2);
      // EventBus.$emit("editarCliente", client2);
    },
    linhaClicada(item, index, event) {
      this.$store.commit("setClient", item);
      this.$router.push({ name: 'client' , params: { id: item.id}});
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
