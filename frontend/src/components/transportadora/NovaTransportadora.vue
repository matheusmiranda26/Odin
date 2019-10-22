<template>
  <div class="transportadora">
    <!-- <b-container align-self="center"> -->
    <b-breadcrumb class="breadcrumb" :items="items"></b-breadcrumb>
    <b-card border-variant="primary">
      <b-form>
        <input id="transportadora-id" type="hidden" v-model="transportadora.id" />
        <b-row>
          <b-col md="5" sm="12">
            <b-form-group label="Nome do transportadora:" label-for="transportadora-nome">
              <b-form-input
                id="transportadora-nome"
                type="text"
                v-model="transportadora.nome"
                required
              />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Nome fantasia:" label-for="transportadora-fantasia">
              <b-form-input
                id="transportadora-fantasia"
                type="text"
                v-model="transportadora.nomeFantasia"
                required
              />
            </b-form-group>
          </b-col>

          <b-col md="2" sm="12">
            <b-form-group
              label="Tipo Transportadora:"
              label-for="transportadora-tipo-transportadora"
            >
              <b-form-select
                id="transportadora-tipo-transportadora"
                options
                v-model="transportadora.tipoTransportadora"
                required
              >
                <option value="fisica">Fisica</option>
                <option value="juridica">Juridica</option>
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col md="2" sm="12">
            <b-form-group label="Status:">
              <b-form-radio-group
                id="transportadora-status"
                v-model="transportadora.status"
                name="transportadora.status"
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
              v-if="transportadora.tipoTransportadora === 'fisica'"
              label="CPF:"
              label-for="transportadora-cpf"
            >
              <b-form-input
                id="transportadora-cpf"
                v-model="transportadora.cnpj_cpf"
                type="tel"
                v-mask="'###.###.###-##'"
                required
              />
            </b-form-group>
            <b-form-group v-else label="CNPJ:" label-for="transportadora-cnpj">
              <b-form-input
                id="transportadora-cnpj"
                v-model="transportadora.cnpj_cpf"
                type="tel"
                v-mask="'##.###.###/####-##'"
                required
              />
            </b-form-group>
          </b-col>
          <b-col md="4" sm="12">
            <b-form-group
              v-if="transportadora.tipoTransportadora === 'fisica'"
              label="RG:"
              label-for="transportadora-rg"
            >
              <b-form-input
                id="transportadora-rg"
                type="text"
                v-model="transportadora.inscricaoEstadual_rg"
              />
            </b-form-group>
            <b-form-group
              v-else
              label="Inscrição Estadual:"
              label-for="transportadora-inscricao-estadual"
            >
              <b-form-input
                id="transportadora-inscricao-estadual"
                type="text"
                v-model="transportadora.inscricaoEstadual_rg"
                required
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3" sm="12">
            <b-form-group label="Telefone Comercial:" label-for="transportadora-telefone-comercial">
              <b-form-input
                id="transportadora-telefone-comercial"
                v-model="transportadora.telefoneComercial"
                type="tel"
                v-mask="['(##) ####-####', '(##) #####-####']"
              />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Telefone Celular:" label-for="transportadora-telefone-celular">
              <b-form-input
                id="transportadora-telefone-celular"
                v-model="transportadora.telefoneCelular"
                type="tel"
                v-mask="['(##) ####-####', '(##) #####-####']"
              />
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="Email:" label-for="transportadora-email">
              <b-form-input id="transportadora-email" type="text" v-model="transportadora.email" />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12" sm="12">
            <b-form-group label="Observações:" label-for="transportadora-observacoes">
              <b-form-input
                id="transportadora-observacoes"
                type="text"
                v-model="transportadora.observacoes"
              />
            </b-form-group>
          </b-col>
          <!-- <b-col md="4" sm="12">
            <b-form-group label="Transportadora:" label-for="transportadora-transportadora">
              <b-form-input id="transportadora-transportadora" type="text" v-model="transportadora.observacoes"/>
            </b-form-group>
          </b-col>-->
        </b-row>
        <b-row>
          <p class="p-3 endereco">Endereço da Transportadora</p>
        </b-row>
        <hr />
        <b-row>
          <b-col md="4" sm="12">
            <b-form-group label="CEP:" label-for="transportadora-cep">
              <b-form-input
                id="transportadora-cep"
                v-model="transportadora.cep"
                type="tel"
                v-mask="'#####-###'"
                required
              />
            </b-form-group>
          </b-col>
          <b-col md="5" sm="12">
            <b-form-group label="Endereço:" label-for="transportadora-endereco">
              <b-form-input
                id="transportadora-endereco"
                type="text"
                v-model="transportadora.endereco"
                required
              />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Numero:" label-for="transportadora-numero">
              <b-form-input
                id="transportadora-numero"
                type="text"
                v-model="transportadora.numero"
                required
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="4" sm="12">
            <b-form-group label="Complemento:" label-for="transportadora-complemento">
              <b-form-input
                id="transportadora-complemento"
                type="text"
                v-model="transportadora.complemento"
              />
            </b-form-group>
          </b-col>
          <b-col md="4" sm="12">
            <b-form-group label="Bairro:" label-for="transportadora-bairro">
              <b-form-input
                id="transportadora-bairro"
                type="text"
                v-model="transportadora.bairro"
                required
              />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Cidade:" label-for="transportadora-cidade">
              <b-form-input
                id="transportadora-cidade"
                type="text"
                v-model="transportadora.cidade"
                required
              />
            </b-form-group>
          </b-col>
          <b-col md="1" sm="12">
            <b-form-group label="Estado:" label-for="transportadora-estado">
              <b-form-input
                id="transportadora-estado"
                type="text"
                v-model="transportadora.estado"
                required
              />
            </b-form-group>
          </b-col>
        </b-row>

        <b-row></b-row>
      </b-form>
      <hr />
      <b-row>
        <b-col xs="12">
          <b-button variant="primary" v-if="mode === 'save'" @click="save()">Salvar</b-button>
          <router-link to="/transportadoras">
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

export default {
  name: "NovaTransportadora",
  //   components: { BootstrapToggle },
  data: function() {
    return {
      mode: "save",
      isLoading: false,
      transportadora: {
        status: 1,
        tipoCliente: "juridica"
      },
      transportadoras: [],
      //   status: 'ativo',
      items: [
        {
          text: "Inicio",
          to: "/"
        },
        {
          text: "Transportadoras",
          to: "transportadoras"
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
      // const method = this.transportadora.id ? "put" : "post";
      const id = this.transportadora.id ? `/${this.transportadora.id}` : "";
      axios
        .post(`${baseApiUrl}/transportadoras${id}`, this.transportadora)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.$router.push("/transportadoras");
        })
        .catch(showError);
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
