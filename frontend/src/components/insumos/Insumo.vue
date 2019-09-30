<template>
  <b-container fluid class="insumo">
    <b-breadcrumb class="breadcrumb" :items="items"></b-breadcrumb>
    <b-card class="m-3">
      <b-row>
        <b-col cols="auto" class="mr-auto">
          <!-- <router-link :to="{ name: 'editarCliente', params: { id: insumo.id }}">
              <b-button variant="warning">
                Editar
                <v-icon name="pen"></v-icon>
              </b-button>
          </router-link>-->
        </b-col>
        <b-col cols="auto">
          <b-button variant="danger">
            <v-icon name="trash" class="mr-3" />Excluir
          </b-button>
        </b-col>
      </b-row>
    </b-card>
    <b-card class="p-4 m-3">
      <input id="insumo-id" type="hidden" v-model="insumo.id" />
      <b-row class="titulo-card">
        <b-col md="11" sm="12">
          <p class="m-0 text-primary titulo text-uppercase">
            <span>{{insumo.nome}}</span>
            <span>- {{insumo.fornecedor}}</span>
          </p>
        </b-col>
      </b-row>
      <b-row class="titulo-card">
        <b-col md="3" sm="12" align-self="center">
          <b-row class="justify-content-md-center">
            <span class="text-secondary label">Código:</span>
          </b-row>
          <b-row class="justify-content-md-center">
            <span class="text-black-50 dado">{{insumo.codigo}}</span>
          </b-row>
        </b-col>
        <b-col md="3" sm="12">
          <b-row class="justify-content-md-center">
            <span class="text-secondary dado">Preço:</span>
          </b-row>
          <b-row class="justify-content-md-center">
            <span class="text-black-50 dado">{{ insumo.preco | currency }}</span>
          </b-row>
        </b-col>
        <b-col md="3" sm="12">
          <b-row class="justify-content-md-center">
            <span class="text-secondary dado">Quantidade:</span>
          </b-row>
          <b-row class="justify-content-md-center">
            <span class="text-black-50 dado">{{ insumo.quantidade }}</span>
          </b-row>
        </b-col>
        <b-col md="3" sm="12">
          <b-row class="justify-content-md-center">
            <span class="text-secondary dado">Cor:</span>
          </b-row>
          <b-row class="justify-content-md-center">
            <span class="text-black-50 dado">{{ insumo.cor }}</span>
          </b-row>
        </b-col>
      </b-row>      
    </b-card>
    <div>
      <b-modal
        id="modal-center"
        size="xl"
        centered
        title="Cadastrar Pagamento"
        ref="modal"
        @ok="cadastrarPagamento"
      >
        <b-row class="pl-5 pr-5 p-3">
          <b-col md="3" sm="12">
            <b-row>
              <span class="text-black-50 dado">Vencimento:</span>
            </b-row>
            <b-row>
              <span class="text-black-50 dado">{{pagamentoVenda.data | moment("DD/MM/YYYY") }}</span>
            </b-row>
          </b-col>
          <b-col md="3" sm="12">
            <b-row>
              <span class="text-black-50 dado">Numero:</span>
            </b-row>
            <b-row class="pr-2">
              <!-- <span class="text-black-50 dado">{{pagamentoVenda.numeroPagamento}}</span> -->
              <b-form-input
                id="pagamento-numero"
                type="text"
                v-model="pagamentoVenda.numeroPagamento"
              />
            </b-row>
          </b-col>
          <b-col md="3" sm="12">
            <b-row>
              <span class="text-black-50 dado">Valor:</span>
            </b-row>
            <b-row class="pr-2">
              <!-- <span class="text-black-50 dado">{{pagamentoVenda.valor | currency }}</span> -->
              <b-form-input id="pagamento-valor" type="text" v-model="pagamentoVenda.valor" />
            </b-row>
          </b-col>
          <b-col md="3" sm="12">
            <b-row>
              <span class="text-black-50 dado">Data de pagamento:</span>
            </b-row>
            <b-row>
              <b-form-input id="pagamento-data" type="date" v-model="pagamentoVenda.dataPagamento" />
            </b-row>
          </b-col>
        </b-row>
      </b-modal>
    </div>
    <b-card class="bg-transparent border-0">
      <b-row>
        <b-col cols="auto" class="mr-auto">
          <router-link to="/insumos">
            <b-button variant="secondary">
              Voltar
              <v-icon name="long-arrow-alt-left"></v-icon>
            </b-button>
          </router-link>
        </b-col>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "Insumo",
  data: function() {
    return {
      pagamentoVenda: {},
      insumo: {},
      pagamentos: {},
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
          to: "/insumos"
        },
        {
          text: "Perfil",
          active: true
        }
      ]
    };
  },
  methods: {
    cadastrarPagamento() {
      // this.pagamentoVenda.valor = this.pagamentoVenda.valor.split("R$ ")[1].replace(',','.')
      axios
        .put(
          `${baseApiUrl}/pagamentosVendas/${this.pagamentoVenda.id}`,
          this.pagamentoVenda
        )
        .then(this.$toasted.global.defaultSuccess())
        .catch(showError);
      this.pagamentoVenda = {};
    }
  },
  mounted() {
    const url = `${baseApiUrl}/insumos/${this.$route.params.id}`;
    axios.get(url).then(res => (this.insumo = res.data));
  }
};
</script>

<style>
.label {
  font-size: 1.4em;
  margin-bottom: 0;
  font-weight: bold;
}
.dado {
  font-size: 1.4em;
}
.titulo {
  font-size: 1.9em;
}
.titulo-card {
  margin: 0;
  padding-bottom: 10px;
}
.insumo {
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  align-content: center;
}
</style>
