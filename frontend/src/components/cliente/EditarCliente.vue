<template>
  <div class="new-client">
    <b-breadcrumb class="breadcrumb" :items="items"></b-breadcrumb>
    <b-card>
      <b-form>
        <input id="client-id" type="hidden" v-model="client.id">
        <b-row>
          <b-col md="6" sm="12">
            <b-form-group label="Nome do cliente:" label-for="client-nome">
              <b-form-input id="client-nome" type="text" v-model="client.nomeCliente" required/>
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="Nome Fantasia:" label-for="client-fantasia">
              <b-form-input
                id="client-fantasia"
                type="text"
                v-model="client.nomeFantasia"
                required
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
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
        <b-row>
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
        <b-row>
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
        <b-row>
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
        <b-row>
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
        <b-row>
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
        <b-row>
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
          <b-button variant="warning" v-if="mode === 'edit'" @click="edit()">Salvar</b-button>
          <router-link to="/clients">
            <b-button variant="secondary" class="ml-2 white-text" @click="resetClient()">Cancelar</b-button>
          </router-link>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "EditarCliente",
  data: function() {
    return {
      mode: "save",
      isLoading: false,
      client: {},
      clients: [],
      items: [
        {
          text: "Inicio",
          to: "/"
        },
        {
          text: "Clientes",
          to: "/clients"
        },
        {
          text: "Editar",
          active: true
        }
      ]
    };
  },
  methods: {
    save() {
      const method = this.client.id ? "put" : "post";
      const id = this.client.id ? `/${this.client.id}` : "";
      axios[method](`${baseApiUrl}/clients${id}`, this.client)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.$router.push("/clients");
        })
        .catch(showError);
    },
    resetClient() {
      this.$store.commit("setClient", null);
    }
  },
  mounted() {
    const url = `${baseApiUrl}/clients/${this.$route.params.id}`;
    axios.get(url).then(res => (this.client = res.data));
  }
};
</script>

<style>
</style>
