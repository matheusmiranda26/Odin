<template>
  <b-container fluid class="despesa fluid">
    <b-breadcrumb class="breadcrumb" :items="items"></b-breadcrumb>
    <b-card class="m-3">
      <b-row>
        <b-col cols="auto" class="mr-auto">
          <!-- <router-link :to="{ name: 'editarCliente', params: { id: despesa.id }}">
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
      <input id="despesa-id" type="hidden" v-model="despesa.id" />
      <b-row class="titulo-card">
        <b-col md="11" sm="12">
          <p class="m-0 text-primary titulo text-uppercase">
            <span>{{despesa[0].nomeFornecedor}}</span>
          </p>
        </b-col>
      </b-row>
      <b-row class="titulo-card">
        <b-col md="3" sm="12" align-self="center">
          <b-row class="justify-content-md-center">
            <span class="text-secondary label">Data:</span>
          </b-row>
          <b-row class="justify-content-md-center">
            <span class="text-black-50 dado">{{despesa[0].data | moment("DD/MM/YYYY")}}</span>
          </b-row>
        </b-col>
        <b-col  v-show="despesa[0].numero != null" md="3" sm="12">
          <b-row class="justify-content-md-center">
            <span class="text-secondary dado">Número:</span>
          </b-row>
          <b-row class="justify-content-md-center">
            <span class="text-black-50 dado">{{ despesa[0].numero }}</span>
          </b-row>
        </b-col>
        <b-col  v-show="despesa[0].formaPagamento != null" md="3" sm="12">
          <b-row class="justify-content-md-center">
            <span class="text-secondary dado">Forma:</span>
          </b-row>
          <b-row class="justify-content-md-center">
            <span class="text-black-50 dado">{{ despesa[0].formaPagamento }}</span>
          </b-row>
        </b-col>
        <b-col md="3" sm="12">
          <b-row class="justify-content-md-center">
            <span class="text-secondary dado">Valor:</span>
          </b-row>
          <b-row class="justify-content-md-center">
            <span class="text-black-50 dado">{{ despesa[0].valor | currency }}</span>
          </b-row>
        </b-col>
      </b-row>
      <b-row class="titulo-card">
        <b-col v-show="despesa[0].conta != null" md="3" sm="12">
          <b-row class="justify-content-md-center">
            <span class="text-secondary dado">Conta:</span>
          </b-row>
          <b-row class="justify-content-md-center">
            <span class="text-black-50 dado">{{ despesa[0].conta }}</span>
          </b-row>
        </b-col>
        <b-col  v-show="despesa[0].agencia != null" md="3" sm="12">
          <b-row class="justify-content-md-center">
            <span class="text-secondary dado">Agência:</span>
          </b-row>
          <b-row class="justify-content-md-center">
            <span class="text-black-50 dado">{{ despesa[0].agencia}}</span>
          </b-row>
        </b-col>
          <b-col  v-show="despesa[0].observacao != null" md="3" sm="12">
          <b-row class="justify-content-md-center">
            <span class="text-secondary dado">Observacao:</span>
          </b-row>
          <b-row class="justify-content-md-center">
            <span class="text-black-50 dado">{{ despesa[0].observacao}}</span>
          </b-row>
        </b-col>
      </b-row>
      <hr />
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
          <router-link to="/despesas">
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
  name: "Despesa",
  data: function() {
    return {
      pagamentoVenda: {},
      despesa: {},
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
          text: "Despesas",
          to: "/despesas"
        },
        {
          text: "Perfil",
          active: true
        }
      ]
    };
  },
  methods: {
    preencherPagamento(despesa) {
      // alert(despesa.data);

      this.pagamentoVenda = despesa;
      this.$refs["modal"].show();
    },
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
    const url = `${baseApiUrl}/despesa/${this.$route.params.id}`;
    axios.get(url).then(res => (this.despesa = res.data));
    //const urlPagamentos = `${baseApiUrl}/pagamentosVendas/despesas/${this.$route.params.id}`;
    //axios.get(urlPagamentos).then(res => (this.pagamentos = res.data));
    // alert(moment(this.despesa.dataCadastro).format('L'))
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
.despesa {
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  align-content: center;
}
</style>
