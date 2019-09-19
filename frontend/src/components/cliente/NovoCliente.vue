<template>
  <div class="new-client">
    <!-- <b-container align-self="center"> -->
    <b-breadcrumb class="breadcrumb" :items="items"></b-breadcrumb>
    <b-card border-variant="primary">
      <b-form @submit.stop.prevent="onSubmit">
        <input id="cliente-id" type="hidden" v-model="cliente.id" />
        <b-row>
          <b-col md="6" sm="12">
            <b-form-group label="Nome do cliente:" label-for="cliente-nome">
              <b-form-input
                id="cliente-nome"
                name="cliente-nome"
                type="text"
                v-model="cliente.nome"
                v-validate="{ required: true, min: 3 }"
                :state="validateState('cliente-nome')"
              />
            </b-form-group>
          </b-col>

          <b-col md="3" sm="12">
            <b-form-group label="Tipo Cliente:" label-for="cliente-tipo-cliente">
              <b-form-select
                id="cliente-tipo-cliente"
                options
                v-model="cliente.tipoCliente"
                required
              >
                <option value="fisica">Fisica</option>
                <option value="juridica">Juridica</option>
              </b-form-select>
            </b-form-group>
          </b-col>

          <b-col md="3" sm="12">
            <b-form-group label="Vendedor:" label-for="cliente-vendedor">
              <b-form-select
                id="cliente-vendedor"
                :options="vendedores"
                v-model="cliente.idVendedor"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3" sm="12">
            <b-form-group
              v-if="cliente.tipoCliente === 'fisica'"
              label="CPF:"
              label-for="cliente-cpf"
            >
              <b-form-input
                id="cliente-cpf"
                v-validate="{required}"
                name="cliente-cpf"
                :state="validateState('cliente-cpf')"
                v-model="cliente.cnpj_cpf"
                type="tel"
                v-mask="'###.###.###-##'"
                required
              />
            </b-form-group>
            <b-form-group v-else label="CNPJ:" label-for="cliente-cnpj">
              <b-form-input
                id="cliente-cnpj"
                v-validate="{cnpj}"
                name="cliente-cnpj"
                :state="validateState('cliente-cnpj')"
                v-model="cliente.cnpj_cpf"
                type="tel"
                v-mask="'##.###.###/####-##'"
                required
              />
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="Nome Fantasia:" label-for="cliente-fantasia">
              <b-form-input
                id="cliente-fantasia"
                type="text"
                v-model="cliente.nomeFantasia"
                required
              />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Data Fundação:" label-for="cliente-data">
              <b-form-input id="cliente-data" type="date" v-model="cliente.dataFundacao" required />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3" sm="12">
            <b-form-group
              v-if="cliente.tipoCliente === 'fisica'"
              label="RG:"
              label-for="cliente-rg"
            >
              <b-form-input id="cliente-rg" type="text" v-model="cliente.inscricaoEstadual_rg" />
            </b-form-group>
            <b-form-group v-else label="Inscrição Estadual:" label-for="cliente-inscricao-estadual">
              <b-form-input
                id="cliente-inscricao-estadual"
                type="text"
                v-model="cliente.inscricaoEstadual_rg"
                required
              />
            </b-form-group>
          </b-col>

          <b-col md="3" sm="12">
            <b-form-group label="Telefone Comercial:" label-for="cliente-telefone-comercial">
              <b-form-input
                id="cliente-telefone-comercial"
                v-model="cliente.telefoneComercial"
                type="tel"
                v-mask="['(##) ####-####', '(##) #####-####']"
              />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Telefone Celular:" label-for="cliente-telefone-celular">
              <b-form-input
                id="cliente-telefone-celular"
                v-model="cliente.telefoneCelular"
                type="tel"
                v-mask="['(##) ####-####', '(##) #####-####']"
              />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Email:" label-for="cliente-email">
              <b-form-input
                v-validate="{email}"
                name="cliente-email"
                :state="validateState('cliente-email')"
                id="cliente-email"
                type="text"
                v-model="cliente.email"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12" sm="12">
            <b-form-group label="Observações:" label-for="cliente-observacoes">
              <b-form-input id="cliente-observacoes" type="text" v-model="cliente.observacoes" />
            </b-form-group>
          </b-col>
          <!-- <b-col md="4" sm="12">
            <b-form-group label="Vendedor:" label-for="cliente-vendedor">
              <b-form-input id="cliente-vendedor" type="text" v-model="cliente.observacoes"/>
            </b-form-group>
          </b-col>-->
        </b-row>
        <b-row>
          <p class="p-3 endereco">Endereço do Cliente</p>
        </b-row>
        <hr />
        <b-row>
          <b-col md="4" sm="12">
            <b-form-group label="CEP:" label-for="cliente-cep">
              <b-form-input
                id="cliente-cep"
                v-model="cliente.cep"
                type="tel"
                v-mask="'#####-###'"
                required
              />
            </b-form-group>
          </b-col>
          <b-col md="5" sm="12">
            <b-form-group label="Endereço:" label-for="cliente-endereco">
              <b-form-input id="cliente-endereco" type="text" v-model="cliente.endereco" required />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Numero:" label-for="cliente-numero">
              <b-form-input id="cliente-numero" type="text" v-model="cliente.numero" required />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="4" sm="12">
            <b-form-group label="Complemento:" label-for="cliente-complemento">
              <b-form-input id="cliente-complemento" type="text" v-model="cliente.complemento" />
            </b-form-group>
          </b-col>
          <b-col md="4" sm="12">
            <b-form-group label="Bairro:" label-for="cliente-bairro">
              <b-form-input id="cliente-bairro" type="text" v-model="cliente.bairro" required />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Cidade:" label-for="cliente-cidade">
              <b-form-input id="cliente-cidade" type="text" v-model="cliente.cidade" required />
            </b-form-group>
          </b-col>
          <b-col md="1" sm="12">
            <b-form-group label="Estado:" label-for="cliente-estado">
              <b-form-input id="cliente-estado" type="text" v-model="cliente.estado" required />
            </b-form-group>
          </b-col>
        </b-row>

        <b-row></b-row>
      </b-form>
      <hr />
      <b-row>
        <b-col xs="12">
          <b-button
            variant="primary"
            v-if="mode === 'save'"
            @click="save"
            :disabled="veeErrors.any()"
          >Salvar</b-button>
          <router-link to="/clientes">
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
  name: "NovoCliente",
  //   components: { BootstrapToggle },
  data: function() {
    return {
      mode: "save",
      isLoading: false,
      cliente: {
        status: 1,
        tipoCliente: "juridica"
      },
      vendedores: [],
      //   status: 'ativo',
      items: [
        {
          text: "Inicio",
          to: "/"
        },
        {
          text: "Clientes",
          to: "clientes"
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
      // const method = this.cliente.id ? "put" : "post";
      const id = this.cliente.id ? `/${this.cliente.id}` : "";
      axios
        .post(`${baseApiUrl}/clientes${id}`, this.cliente)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.$router.push("/clientes");
        })
        .catch(showError);
    },
    carregarVendedores() {
      const url = `${baseApiUrl}/vendedores`;
      axios.get(url).then(res => {
        let vendedoresAtivos = res.data.filter(
          vendedor => vendedor.status != "1"
        );
        vendedoresAtivos.sort(function(a, b) {
          if (a.nome > b.nome) {
            return 1;
          }
          if (a.nome < b.nome) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
        this.vendedores = vendedoresAtivos.map(vendedor => {
          return { value: vendedor.id, text: vendedor.nome };
        });
      });
    },
    buscarCep() {},
    validateState(ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref);
      }
      return null;
    },
    onSubmit() {
      this.$validator.validateAll().then(result => {
        if (!result) {
          return;
        }
        // this.save();
      });
    }
  },
  mounted() {
    this.carregarVendedores();
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
