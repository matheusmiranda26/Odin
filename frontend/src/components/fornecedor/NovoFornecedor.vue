<template>
  <div class="new-client">
    <!-- <b-container align-self="center"> -->
    <b-breadcrumb class="breadcrumb" :items="items"></b-breadcrumb>
    <b-card border-variant="primary">
      <b-form>
        <input id="fornecedor-id" type="hidden" v-model="fornecedor.id" />
        <b-row>
          <b-col md="4" sm="12">
            <b-form-group label="Nome do fornecedor:" label-for="fornecedor-nome">
              <b-form-input id="fornecedor-nome" type="text" v-model="fornecedor.nome" required />
            </b-form-group>
          </b-col>
           <b-col md="4" sm="12">
            <b-form-group label="Nome fantasia:" label-for="fornecedor-fantasia">
              <b-form-input id="fornecedor-fantasia" type="text" v-model="fornecedor.nomeFantasia" required />
            </b-form-group>
          </b-col>

          <b-col md="2" sm="12">
            <b-form-group label="Tipo Fornecedor:" label-for="fornecedor-tipo-fornecedor">
              <b-form-select
                id="fornecedor-tipo-fornecedor"
                options
                v-model="fornecedor.tipoFornecedor"
                required
              >
                <option value="fisica">Fisica</option>
                <option value="juridica" selected>Juridica</option>
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col md="2" sm="12">
            <b-form-group label="Status:">
              <b-form-radio-group
                id="fornecedor-status"
                v-model="fornecedor.status"
                name="fornecedor.status"
              >
                <b-form-radio value="1">Ativo</b-form-radio>
                <b-form-radio value="0">Inativo</b-form-radio>
              </b-form-radio-group>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="4" sm="12">
            <b-form-group
              v-if="fornecedor.tipoFornecedor === 'fisica'"
              label="CPF:"
              label-for="fornecedor-cpf"
            >
              <b-form-input
                id="fornecedor-cpf"
                v-model="fornecedor.cnpj_cpf"
                type="tel"
                v-mask="'###.###.###-##'"
                required
              />
            </b-form-group>
            <b-form-group v-else label="CNPJ:" label-for="fornecedor-cnpj">
              <b-form-input
                id="fornecedor-cnpj"
                v-model="fornecedor.cnpj_cpf"
                type="tel"
                v-mask="'##.###.###/####-##'"
                required
              />
            </b-form-group>
          </b-col>
          <b-col md="4" sm="12">
            <b-form-group
              v-if="fornecedor.tipoFornecedor === 'fisica'"
              label="RG:"
              label-for="fornecedor-rg"
            >
              <b-form-input id="fornecedor-rg" type="text" v-model="fornecedor.inscricaoEstadual_rg" />
            </b-form-group>
            <b-form-group
              v-else
              label="Inscrição Estadual:"
              label-for="fornecedor-inscricao-estadual"
            >
              <b-form-input
                id="fornecedor-inscricao-estadual"
                type="text"
                v-model="fornecedor.inscricaoEstadual_rg"
                required
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3" sm="12">
            <b-form-group label="Telefone Comercial:" label-for="fornecedor-telefone-comercial">
              <b-form-input
                id="fornecedor-telefone-comercial"
                v-model="fornecedor.telefoneComercial"
                type="tel"
                v-mask="['(##) ####-####', '(##) #####-####']"
              />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Telefone Celular:" label-for="fornecedor-telefone-celular">
              <b-form-input
                id="fornecedor-telefone-celular"
                v-model="fornecedor.telefoneCelular"
                type="tel"
                v-mask="['(##) ####-####', '(##) #####-####']"
              />
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="Email:" label-for="fornecedor-email">
              <b-form-input id="fornecedor-email" type="text" v-model="fornecedor.email" />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12" sm="12">
            <b-form-group label="Observações:" label-for="fornecedor-observacoes">
              <b-form-input id="fornecedor-observacoes" type="text" v-model="fornecedor.observacoes" />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Vendedor:" label-for="fornecedor-vendedor">
              <b-form-input id="fornecedor-vendedor" type="text" v-model="fornecedor.nomeVendedor" />
            </b-form-group>
          </b-col>
           <b-col md="3" sm="12">
            <b-form-group label="Telefone Vendedor:" label-for="fornecedor-telefone-vendedor">
              <b-form-input
                id="fornecedor-telefone-vendedor"
                v-model="fornecedor.telefoneVendedor"
                type="tel"
                v-mask="['(##) ####-####', '(##) #####-####']"
              />
            </b-form-group>
          </b-col>
           <b-col md="6" sm="12">
            <b-form-group label="Email do Vendedor:" label-for="fornecedor-email-vendedor">
              <b-form-input id="fornecedor-email-vendedor" type="text" v-model="fornecedor.emailVendedor" />
            </b-form-group>
          </b-col>
          <!-- <b-col md="4" sm="12">
            <b-form-group label="Fornecedor:" label-for="fornecedor-fornecedor">
              <b-form-input id="fornecedor-fornecedor" type="text" v-model="fornecedor.observacoes"/>
            </b-form-group>
          </b-col>-->
        </b-row>
        <b-row>
          <p class="p-3 endereco">Endereço do Fornecedor</p>
        </b-row>
        <hr />
        <b-row>
          <b-col md="4" sm="12">
            <b-form-group label="CEP:" label-for="fornecedor-cep">
              <b-form-input
                id="fornecedor-cep"
                v-model="fornecedor.cep"
                type="tel"
                v-mask="'#####-###'"
                required
              />
            </b-form-group>
          </b-col>
          <b-col md="5" sm="12">
            <b-form-group label="Endereço:" label-for="fornecedor-endereco">
              <b-form-input
                id="fornecedor-endereco"
                type="text"
                v-model="fornecedor.endereco"
                required
              />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Numero:" label-for="fornecedor-numero">
              <b-form-input id="fornecedor-numero" type="text" v-model="fornecedor.numero" required />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="4" sm="12">
            <b-form-group label="Complemento:" label-for="fornecedor-complemento">
              <b-form-input id="fornecedor-complemento" type="text" v-model="fornecedor.complemento" />
            </b-form-group>
          </b-col>
          <b-col md="4" sm="12">
            <b-form-group label="Bairro:" label-for="fornecedor-bairro">
              <b-form-input id="fornecedor-bairro" type="text" v-model="fornecedor.bairro" required />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Cidade:" label-for="fornecedor-cidade">
              <b-form-input id="fornecedor-cidade" type="text" v-model="fornecedor.cidade" required />
            </b-form-group>
          </b-col>
          <b-col md="1" sm="12">
            <b-form-group label="Estado:" label-for="fornecedor-estado">
              <b-form-input id="fornecedor-estado" type="text" v-model="fornecedor.estado" required />
            </b-form-group>
          </b-col>
        </b-row>

        <b-row></b-row>
      </b-form>
      <hr />
      <b-row>
        <b-col xs="12">
          {{fornecedor}}
          <b-button variant="primary" v-if="mode === 'save'" @click="save()">Salvar</b-button>
          <router-link to="/fornecedores">
            <b-button variant="secondary" class="ml-2 white-text">Cancelar</b-button>
          </router-link>
        </b-col>
      </b-row>
    </b-card>
    <!-- </b-container> -->
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import cep from "cep-promise";
import _ from "underscore";
// var buscaCep = require("busca-ce p");
// import BootstrapToggle from "vue-bootstrap-toggle";

export default {
  name: "NovoFornecedor",
  //   components: { BootstrapToggle },
  data: function() {
    return {
      mode: "save",
      isLoading: false,
      fornecedor: {
        status: 1,
        tipoFornecedor: "juridica"
      },
      fornecedores: [],
      //   status: 'ativo',
      items: [
        {
          text: "Inicio",
          to: "/"
        },
        {
          text: "Fornecedores",
          to: "fornecedores"
        },
        {
          text: "Novo",
          active: true
        }
      ]
    };
  },
  methods: {
    save() {
      // const method = this.fornecedor.id ? "put" : "post";
      const id = this.fornecedor.id ? `/${this.fornecedor.id}` : "";
      axios
        .post(`${baseApiUrl}/fornecedores${id}`, this.fornecedor)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.$router.push("/fornecedores");
        })
        .catch(showError);
    },
    buscarCep() {
      if (this.cep.length == 8) {
        axios
          .get(`https://viacep.com.br/ws/${this.cep}/json/`)
          .then(response => (this.fornecedor.endereco = response.data))
          .catch(error => console.log(error));
      }
    },
    mounted() {
      this.carregarVendedores();
    }
  }
};
</script>

<style>
.endereco {
  font-size: 1.5em;
  padding: 0;
  margin-bottom: 0;
}
hr {
  margin: 0;
  margin-bottom: 10px;
  padding: 0;
}
</style>
