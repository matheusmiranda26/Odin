<template>
  <div class="cliente">
    <b-breadcrumb class="breadcrumb" :items="items"></b-breadcrumb>
    <b-card class="m-3">
      <b-row>
        <b-col cols="auto" class="mr-auto">
          <router-link :to="{ name: 'editarCliente', params: { id: cliente.id }}">
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
      <input id="cliente-id" type="hidden" v-model="cliente.id">
      <b-row>
        <b-col md="12" sm="12">
          <p class="text-primary titulo text-uppercase">{{ cliente.nomeCliente }}</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12" sm="12">
          <p class="text-black-50 dado">CNPJ: {{ cliente.cnpj_cpf }}</p>
        </b-col>
      </b-row>
      <hr>
      <b-row>
        <b-col md="4" sm="12">
          <b-row>
            <p class="label text-secondary">Telefone Comercial:</p>
          </b-row>
          <b-row>
            <p class="dado text-muted">{{ cliente.telefoneComercial }}</p>
          </b-row>
        </b-col>
        <b-col md="4" sm="12">
          <b-row>
            <p class="label text-secondary">Celular:</p>
          </b-row>
          <b-row>
            <p class="dado text-muted">{{ cliente.telefoneCelular }}</p>
          </b-row>
        </b-col>
        <b-col md="4" sm="12">
          <b-row>
            <p class="label text-secondary">Email:</p>
          </b-row>
          <b-row>
            <p class="dado text-muted">{{ cliente.email }}</p>
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
            >{{ cliente.endereco }}, {{ cliente.numero }}, {{ cliente.complemento }}, {{ cliente.numero }}, {{ cliente.cep }}</p>
          </b-row>
        </b-col>
        <b-col md="4" sm="12">
          <b-row>
            <p class="label text-secondary">Cidade:</p>
          </b-row>
          <b-row>
            <p class="dado text-muted">{{ cliente.cidade }} - {{ cliente.estado }}</p>
          </b-row>
        </b-col>
      </b-row>
      <!-- <b-row>
           <b-col md="4" sm="12">
               <b-row>
                <p>Status:</p>
            </b-row>
            <b-row>
                {{ cliente.status }}, 
            </b-row>
           </b-col>
           <b-col md="4" sm="12">
               <b-row>
                <p>Data de Cadastro:</p>
            </b-row>
            <b-row>
                {{ cliente.dataDeCadastro }} 
            </b-row>
           </b-col>
      </b-row>-->
    </b-card>
    <b-card class="bg-transparent border-0">
      <b-row>
        <b-col cols="auto" class="mr-auto">
          <router-link to="/clientes">
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
  name: "Cliente",
  data: function() {
    return {
      cliente: {},
      items: [
        {
          text: "Inicio",
          to: "/"
        },
        {
          text: "Clientes",
          to: "/clientes"
        },
        {
          text: "Perfil",
          active: true
        }
      ]
    };
  },
  mounted() {
    const url = `${baseApiUrl}/clientes/${this.$route.params.id}`;
    axios.get(url).then(res => (this.cliente = res.data));
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
