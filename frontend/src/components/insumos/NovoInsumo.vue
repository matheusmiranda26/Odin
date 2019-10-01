<template>
  <div class="insumo">
    <b-breadcrumb class="breadcrumb" :items="items"></b-breadcrumb>
    <b-card>
      <b-form @submit.stop.prevent="onSubmit">
        <input id="insumo-id" type="hidden" v-model="insumo.id" />
        <b-row>
          <b-col md="6" sm="12">
            <b-form-group
              label="Nome:"
              label-for="insumo-mome"
              label-size="lg"
              label-class="font-weight-bold"
            >
              <b-form-input
                id="insumo-nome"
                name="insumo-nome"
                type="text"
                v-model="insumo.nome"
                v-validate="{ required: true, min: 2 }"
                :state="validateState('insumo-nome')"
              />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group
              label="Código:"
              label-for="insumo-codigo"
              label-size="lg"
            >
              <b-form-input id="insumo-codigo" type="text" v-model="insumo.codigo" />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group
              label="Fornecedor:"
              label-for="cliente-fornecedor"
              label-size="lg"
              label-class="font-weight-bold"
            >
              <b-form-select
                id="cliente-fornecedor"
                :options="fornecedores"
                v-model="insumo.idFornecedor"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3" sm="12">
            <b-form-group label="Preco:" label-for="insumo-preco" label-size="lg">
              <b-form-input
                id="insumo-preco"
                type="number"
                v-model="insumo.preco"
                v-validate="{ min: 1 }"
                :state="validateState('insumo-preco')"
                name="insumo-preco"
              />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group
              label="Quantidade:"
              label-for="insumo-quantidade"
              label-size="lg"
              label-class="font-weight-bold"
            >
              <b-form-input
                id="insumo-quantidade"
                type="number"
                v-model="insumo.quantidade"
                v-validate="{ required: true, min: 1}"
                :state="validateState('insumo-quantidade')"
                name="insumo-quantidade"
              />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group
              label="Quantidade Minima:"
              label-for="insumo-quantidade-minima"
              label-size="lg"
            >
              <b-form-input
                id="insumo-quantidade-minima"
                type="number"
                v-model="insumo.quantidadeMinima"
                v-validate="{ min: 1}"
                :state="validateState('insumo-quantidade-minima')"
                name="insumo-quantidade-minima"
              />
            </b-form-group>
          </b-col>
           <b-col md="3" sm="12">
            <b-form-group
              label="Cor:"
              label-for="insumo-cor"
              label-size="lg"
            >
              <b-form-input
                id="insumo-cor"
                type="text"
                v-model="insumo.cor"
                v-validate="{ min: 1}"
                :state="validateState('insumo-cor')"
                name="insumo-cor"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
      <b-row>
        <b-col xs="12">
          <b-button variant="primary" @click="save" :disabled="veeErrors.any()">Salvar</b-button>
          <router-link to="/insumos">
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
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";
import _ from "underscore";
import moment from "moment";

// import BootstrapToggle from "vue-bootstrap-toggle";

export default {
  name: "NovoInsumo",
  components: { "vue-bootstrap-typeahead": VueBootstrapTypeahead },
  data: function() {
    return {
      mode: "save",
      fornecedores: {},
      isLoading: false,
      insumo: {},
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false /* doesn't work with directive */
      },
      items: [
        {
          text: "Inicio",
          to: "/"
        },
        {
          text: "Insumos",
          to: "insumos"
        },
        {
          text: "Novo Insumo",
          active: true
        }
      ]
    };
  },
  methods: {
    save() {
      const id = this.insumo.id ? `/${this.insumo.id}` : "";
      axios
        .post(`${baseApiUrl}/insumos${id}`, this.insumo)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.$router.push("/insumos");
        })
        .catch(showError);
    },
    carregarFornecedores() {
      const url = `${baseApiUrl}/fornecedores`;
      axios.get(url).then(res => {
        this.fornecedores = res.data;
        this.fornecedores.sort(function(a, b) {
          if (a.nome > b.nome) {
            return 1;
          }
          if (a.nome < b.nome) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
        this.fornecedores = this.fornecedores.map(fornecedor => {
          return { value: fornecedor.id, text: fornecedor.nome };
        });
      });
    },
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
    this.carregarFornecedores();
  }
};
</script>

<style>
.dados-pagamento {
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
