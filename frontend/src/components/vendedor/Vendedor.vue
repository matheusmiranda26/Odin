<template>
  <div class="vendedor">
    <b-breadcrumb class="breadcrumb" :items="items"></b-breadcrumb>
    <b-card class="m-3">
      <b-row>
        <b-col cols="auto" class="mr-auto">
          <router-link :to="{ name: 'editarCliente', params: { id: vendedor.id }}">
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
      <input id="vendedor-id" type="hidden" v-model="vendedor.id" />
      <b-row class="titulo-card">
        <b-col md="11" sm="12">
          <p class="m-0 text-primary titulo text-uppercase">
            {{ vendedor.nome }}
            <span v-show="vendedor.nomeFantasia">- {{vendedor.nomeFantasia}}</span>
          </p>
        </b-col>
        <b-col md="1" sm="12">
          <b-row>
            <p
              class="dado"
              :class="[vendedor.status == '1' ? 'text-danger' : 'text-success' ]"
            >{{ vendedor.status == '1' ? 'Inativo' : 'Ativo' }}</p>
          </b-row>
        </b-col>
      </b-row>
      <b-row class="titulo-card">
        <b-col md="12" sm="12">
          <p
            v-if="vendedor.tipoVendedor == 'juridica'"
            class="text-black-50 dado"
          >CNPJ: {{ vendedor.cnpj_cpf }}</p>
          <p v-else class="text-black-50 dado">CPF: {{ vendedor.cnpj_cpf }}</p>
        </b-col>
      </b-row>
      <b-row class="titulo-card">
        <b-col md="12" sm="12">
          <p
            v-if="vendedor.tipoCliente == 'juridica'"
            class="text-black-50 dado"
          >IE: {{ vendedor.inscricaoEstadual_rg }}</p>
          <p v-else class="text-black-50 dado">RG: {{ vendedor.inscricaoEstadual_rg }}</p>
        </b-col>
      </b-row>
      <hr />
      <b-row>
        <b-col md="4" sm="12">
          <b-row>
            <p class="label text-secondary">Telefone Comercial:</p>
          </b-row>
          <b-row>
            <p class="dado text-muted">{{ vendedor.telefoneComercial }}</p>
          </b-row>
        </b-col>
        <b-col v-show="vendedor.telefoneCelular !== ''" md="4" sm="12">
          <b-row>
            <p class="label text-secondary">Celular:</p>
          </b-row>
          <b-row>
            <p class="dado text-muted">{{ vendedor.telefoneCelular }}</p>
          </b-row>
        </b-col>
        <b-col md="4" sm="12">
          <b-row>
            <p class="label text-secondary">Email:</p>
          </b-row>
          <b-row>
            <p class="dado text-muted">{{ vendedor.email }}</p>
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
              {{ vendedor.endereco }}
              <span v-show="vendedor.numero != ''">, {{ vendedor.numero }},</span>
              <span v-show="vendedor.complemento != ''">{{ vendedor.complemento }},</span>
              <span v-show="vendedor.cep != ''">{{ vendedor.cep }}</span>
            </p>
          </b-row>
        </b-col>
        <b-col md="4" sm="12">
          <b-row>
            <p class="label text-secondary">Cidade:</p>
          </b-row>
          <b-row>
            <p class="dado text-muted">{{ vendedor.cidade }} - {{ vendedor.estado }}</p>
          </b-row>
        </b-col>
      </b-row>
      <!-- <b-row>
        <b-col v-show="vendedor.dataCadastro !== ''" md="4" sm="12">
          <b-row>
            <p class="label text-secondary">Data de Cadastro:</p>
          </b-row>
          <b-row>
            <p class="dado text-muted">{{ vendedor.dataCadastro }}</p>
          </b-row>
        </b-col>
      </b-row>-->
      <b-row v-show="vendedor.observacoes !== null">
        <b-col md sm="12">
          <b-row>
            <p class="label text-secondary">Observações:</p>
          </b-row>
          <b-row>
            <p class="dado text-muted">{{ vendedor.observacoes }}</p>
          </b-row>
        </b-col>
      </b-row>
    </b-card>
    <b-card class="bg-transparent border-0">
      <b-row>
        <b-col cols="auto" class="mr-auto">
          <router-link to="/vendedores">
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
  name: "Vendedor",
  data: function() {
    return {
      vendedor: {},
      items: [
        {
          text: "Inicio",
          to: "/"
        },
        {
          text: "Vendedores",
          to: "/vendedores"
        },
        {
          text: "Perfil",
          active: true
        }
      ]
    };
  },
  mounted() {
    const url = `${baseApiUrl}/vendedores/${this.$route.params.id}`;
    axios.get(url).then(res => (this.vendedor = res.data));
    // alert(moment(this.vendedor.dataCadastro).format('L'))
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
.titulo-card {
  margin: 0;
  padding: 0;
}
.vendedor {
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  align-content: center;
}
</style>
