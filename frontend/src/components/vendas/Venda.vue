<template>
  <div class="venda">
    <b-breadcrumb class="breadcrumb" :items="items"></b-breadcrumb>
    <b-card class="m-3">
      <b-row>
        <b-col cols="auto" class="mr-auto">
          <router-link :to="{ name: 'editarCliente', params: { id: venda.id }}">
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
      <input id="venda-id" type="hidden" v-model="venda.id">
      <b-row class="titulo-card">
        <b-col md="11" sm="12">
          <p class="m-0 text-primary titulo text-uppercase">
            {{ venda.nomeCliente }}
            <span v-show="venda.nomeCliente">- {{venda.nomeCliente}}</span>
          </p>
        </b-col>
        <b-col md="1" sm="12">
          <b-row>
            <p
              class="dado"
              :class="[venda.status == '0' ? 'text-danger' : 'text-success' ]"
            >{{ venda.status == '0' ? 'Inativo' : 'Ativo' }}</p>
          </b-row>
        </b-col>
      </b-row>
      <b-row class="titulo-card">
        <b-col md="12" sm="12">
          <p
            v-if="venda.tipoCliente == 'juridica'"
            class="text-black-50 dado"
          >CNPJ: {{ venda.cnpj_cpf }}</p>
          <p v-else class="text-black-50 dado">CPF: {{ venda.cnpj_cpf }}</p>
        </b-col>
      </b-row >
      <b-row class="titulo-card">
        <b-col md="12" sm="12">
          <p
            v-if="venda.tipoCliente == 'juridica'"
            class="text-black-50 dado"
          >IE: {{ venda.inscricaoEstadual_rg }}</p>
          <p v-else class="text-black-50 dado">RG: {{ venda.inscricaoEstadual_rg }}</p>
        </b-col>
      </b-row>
      <hr>
      <b-row>
        <b-col md="4" sm="12">
          <b-row>
            <p class="label text-secondary">Telefone Comercial:</p>
          </b-row>
          <b-row>
            <p class="dado text-muted">{{ venda.telefoneComercial }}</p>
          </b-row>
        </b-col>
        <b-col v-show="venda.telefoneCelular !== ''" md="4" sm="12">
          <b-row>
            <p class="label text-secondary">Celular:</p>
          </b-row>
          <b-row>
            <p class="dado text-muted">{{ venda.telefoneCelular }}</p>
          </b-row>
        </b-col>
        <b-col md="4" sm="12">
          <b-row>
            <p class="label text-secondary">Email:</p>
          </b-row>
          <b-row>
            <p class="dado text-muted">{{ venda.email }}</p>
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
              {{ venda.endereco }}, {{ venda.numero }},
              <span v-show="venda.complemento !== null">{{ venda.complemento }},</span>
              {{ venda.cep }}
            </p>
          </b-row>
        </b-col>
        <b-col md="4" sm="12">
          <b-row>
            <p class="label text-secondary">Cidade:</p>
          </b-row>
          <b-row>
            <p class="dado text-muted">{{ venda.cidade }} - {{ venda.estado }}</p>
          </b-row>
        </b-col>
      </b-row>
      <!-- <b-row>
        <b-col v-show="venda.dataCadastro !== ''" md="4" sm="12">
          <b-row>
            <p class="label text-secondary">Data de Cadastro:</p>
          </b-row>
          <b-row>
            <p class="dado text-muted">{{ venda.dataCadastro }}</p>
          </b-row>
        </b-col>
      </b-row>-->
      <b-row v-show="venda.observacoes !== null">
        <b-col md sm="12">
          <b-row>
            <p class="label text-secondary">Observações:</p>
          </b-row>
          <b-row>
            <p class="dado text-muted">{{ venda.observacoes }}</p>
          </b-row>
        </b-col>
      </b-row>
    </b-card>
    <b-card class="bg-transparent border-0">
      <b-row>
        <b-col cols="auto" class="mr-auto">
          <router-link to="/vendas">
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
import moment from "moment";

export default {
  name: "Venda",
  data: function() {
    return {
      venda: {},
      items: [
        {
          text: "Inicio",
          to: "/"
        },
        {
          text: "Vendas",
          to: "/vendas"
        },
        {
          text: "Perfil",
          active: true
        }
      ]
    };
  },
  mounted() {
    const url = `${baseApiUrl}/vendas/${this.$route.params.id}`;
    axios.get(url).then(res => (this.venda = res.data));
    // alert(moment(this.venda.dataCadastro).format('L'))
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
</style>
