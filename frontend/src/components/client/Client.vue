<template>
  <div class="client">
    <b-breadcrumb class="breadcrumb" :items="items"></b-breadcrumb>
    <b-card class="m-3">
      <b-row>
        <b-col cols="auto" class="mr-auto">
          <router-link :to="{ name: 'editClient', params: { id: client.id }}">
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
      <input id="client-id" type="hidden" v-model="client.id">
      <b-row>
        <b-col md="12" sm="12">
          <p class="text-primary titulo text-uppercase">{{ client.nomeCliente }}</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12" sm="12">
          <p class="text-black-50 dado">CNPJ: {{ client.cnpj_cpf }}</p>
        </b-col>
      </b-row>
      <hr>
      <b-row>
        <b-col md="4" sm="12">
          <b-row>
            <p class="label text-secondary">Telefone Comercial:</p>
          </b-row>
          <b-row>
            <p class="dado text-muted">{{ client.telefoneComercial }}</p>
          </b-row>
        </b-col>
        <b-col md="4" sm="12">
          <b-row>
            <p class="label text-secondary">Celular:</p>
          </b-row>
          <b-row>
            <p class="dado text-muted">{{ client.telefoneCelular }}</p>
          </b-row>
        </b-col>
        <b-col md="4" sm="12">
          <b-row>
            <p class="label text-secondary">Email:</p>
          </b-row>
          <b-row>
            <p class="dado text-muted">{{ client.email }}</p>
          </b-row>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="8" sm="12">
          <b-row>
            <p class="label text-secondary">Endereço:</p>
          </b-row>
          <b-row>
            <p
              class="dado text-muted"
            >{{ client.endereco }}, {{ client.numero }}, {{ client.complemento }}, {{ client.numero }}, {{ client.cep }}</p>
          </b-row>
        </b-col>
        <b-col md="4" sm="12">
          <b-row>
            <p class="label text-secondary">Cidade:</p>
          </b-row>
          <b-row>
            <p class="dado text-muted">{{ client.cidade }} - {{ client.estado }}</p>
          </b-row>
        </b-col>
      </b-row>
      <!-- <b-row>
           <b-col md="4" sm="12">
               <b-row>
                <p>Status:</p>
            </b-row>
            <b-row>
                {{ client.status }}, 
            </b-row>
           </b-col>
           <b-col md="4" sm="12">
               <b-row>
                <p>Data de Cadastro:</p>
            </b-row>
            <b-row>
                {{ client.dataDeCadastro }} 
            </b-row>
           </b-col>
      </b-row>-->
    </b-card>
    <b-card class="bg-transparent border-0">
      <b-row>
        <b-col cols="auto" class="mr-auto">
          <router-link to="/clients">
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
  name: "Client",
  data: function() {
    return {
      client: {},
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
          text: "Perfil",
          active: true
        }
      ]
    };
  },
  mounted() {
    const url = `${baseApiUrl}/clients/${this.$route.params.id}`;
    axios.get(url).then(res => (this.client = res.data));
  }
};
</script>

<style>
.label {
  font-size: 1.4em;
}
.dado {
  font-size: 1.4em;
  font-weight: bold;
}
.titulo {
  font-size: 1.9em;
}
</style>
