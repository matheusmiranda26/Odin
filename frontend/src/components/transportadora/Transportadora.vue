<template>
  <div class="transportadora">
    <b-breadcrumb class="breadcrumb" :items="items"></b-breadcrumb>
    <b-card class="m-3">
      <b-row>
        <b-col cols="auto" class="mr-auto">
          <router-link :to="{ name: 'editarTransportadora', params: { id: transportadora.id }}">
            <b-button variant="warning">
              Editar
              <v-icon name="pen"></v-icon>
            </b-button>
          </router-link>
        </b-col>
        <b-col cols="auto">
          <b-button variant="danger">
            Excluir
            <v-icon name="trash"></v-icon>
          </b-button>
        </b-col>
      </b-row>
    </b-card>
    <b-card class="p-4 m-3">
      <input id="transportadora-id" type="hidden" v-model="transportadora.id">
      <b-row class="titulo-card">
        <b-col md="11" sm="12">
          <p class="m-0 text-primary titulo text-uppercase">
            {{ transportadora.nome }}
            <span v-show="transportadora.nomeFantasia">- {{transportadora.nomeFantasia}}</span>
          </p>
        </b-col>
        <b-col md="1" sm="12">
          <b-row>
            <p
              class="dado"
              :class="[transportadora.status == '0' ? 'text-danger' : 'text-success' ]"
            >{{ transportadora.status == '0' ? 'Inativo' : 'Ativo' }}</p>
          </b-row>
        </b-col>
      </b-row>
      <b-row class="titulo-card">
        <b-col md="12" sm="12">
          <p
            v-if="transportadora.tipoTransportadora == 'juridica'"
            class="text-black-50 dado"
          >CNPJ: {{ transportadora.cnpj_cpf }}</p>
          <p v-else class="text-black-50 dado">CPF: {{ transportadora.cnpj_cpf }}</p>
        </b-col>
      </b-row >
      <b-row class="titulo-card">
        <b-col md="12" sm="12">
          <p
            v-if="transportadora.tipoTransportadora == 'juridica'"
            class="text-black-50 dado"
          >IE: {{ transportadora.inscricaoEstadual_rg }}</p>
          <p v-else class="text-black-50 dado">RG: {{ transportadora.inscricaoEstadual_rg }}</p>
        </b-col>
      </b-row>
      <hr>
      <b-row>
        <b-col md="4" sm="12">
          <b-row>
            <p class="label text-secondary">Telefone Comercial:</p>
          </b-row>
          <b-row>
            <p class="dado text-muted">{{ transportadora.telefoneComercial }}</p>
          </b-row>
        </b-col>
        <b-col v-show="transportadora.telefoneCelular !== ''" md="4" sm="12">
          <b-row>
            <p class="label text-secondary">Celular:</p>
          </b-row>
          <b-row>
            <p class="dado text-muted">{{ transportadora.telefoneCelular }}</p>
          </b-row>
        </b-col>
        <b-col md="4" sm="12">
          <b-row>
            <p class="label text-secondary">Email:</p>
          </b-row>
          <b-row>
            <p class="dado text-muted">{{ transportadora.email }}</p>
          </b-row>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="8" sm="12">
          <b-row>
            <p class="label text-secondary">Endereço:</p>
          </b-row>
          <b-row>
            <p class="dado text-muted">
              {{ transportadora.endereco }}, {{ transportadora.numero }},
              <span v-show="transportadora.complemento !== null">{{ transportadora.complemento }},</span>
              {{ transportadora.cep }}
            </p>
          </b-row>
        </b-col>
        <b-col md="4" sm="12">
          <b-row>
            <p class="label text-secondary">Cidade:</p>
          </b-row>
          <b-row>
            <p class="dado text-muted">{{ transportadora.cidade }} - {{ transportadora.estado }}</p>
          </b-row>
        </b-col>
      </b-row>
      <b-row v-show="transportadora.observacoes !== null">
        <b-col md sm="12">
          <b-row>
            <p class="label text-secondary">Observações:</p>
          </b-row>
          <b-row>
            <p class="dado text-muted">{{ transportadora.observacoes }}</p>
          </b-row>
        </b-col>
      </b-row>
    </b-card>
    <b-card class="bg-transparent border-0">
      <b-row>
        <b-col cols="auto" class="mr-auto">
          <router-link to="/transportadoras">
            <b-button variant="secondary">
              Voltar
              <v-icon name="long-arrow-alt-left"></v-icon>
            </b-button>
          </router-link>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import { baseApiUrl } from "@/global";
import axios from "axios";

export default {
  name: "Transportadora",
  data: function() {
    return {
      transportadora: {},
      items: [
        {
          text: "Inicio",
          to: "/"
        },
        {
          text: "Transportadoras",
          to: "/transportadoras"
        },
        {
          text: "Perfil",
          active: true
        }
      ]
    };
  },
  mounted() {
    const url = `${baseApiUrl}/transportadoras/${this.$route.params.id}`;
    axios.get(url).then(res => (this.transportadora = res.data));
    // alert(moment(this.transportadora.dataCadastro).format('L'))
  }
};
</script>

<style>
.label {
  font-size: 1.4em;
  margin-bottom: 0;
}
.dado {
  font-size: 1.4em;
  font-weight: bold;
}
.titulo {
  font-size: 1.9em;
}
.titulo-card{
  margin: 0;
  padding: 0;
}
.transportadora {
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  align-content: center;
}
</style>
