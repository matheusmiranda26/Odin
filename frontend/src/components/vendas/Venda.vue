<template>
  <b-container fluid class="venda fluid">
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
      <input id="venda-id" type="hidden" v-model="venda.id" />
      <b-row class="titulo-card">
        <b-col md="11" sm="12">
          <p class="m-0 text-primary titulo text-uppercase">
            <span>{{venda[0].numeroPedido}}</span>
            <span>- {{venda[0].nomeCliente}}</span>
            <span v-show="venda[0].nomeFantasia != null">- {{venda[0].nomeFantasia}}</span>
          </p>
        </b-col>
      </b-row>
      <b-row class="titulo-card">
        <b-col md="3" sm="12">
          <span class="text-black-50 label">Data:</span>
          <span class="text-black-50 dado">{{venda[0].data | moment("DD/MM/YYYY")}}</span>
        </b-col>
        <b-col md="3" sm="12">
          <span class="text-black-50 dado">Nota Fiscal: {{ venda[0].numeroNF }}</span>
        </b-col>
        <b-col md="3" sm="12">
          <span class="text-black-50 dado">Forma: {{ venda[0].formaPagamento }}</span>
        </b-col>
        <b-col md="3" sm="12">
          <span class="text-black-50 dado">Transportadora: {{ venda[0].transportadora }}</span>
        </b-col>
      </b-row>
      <b-row class="titulo-card">
        <b-col md="3" sm="12">
          <span class="text-black-50 dado">Valor: {{ venda[0].valor | currency }}</span>
        </b-col>
        <b-col md="3" sm="12">
          <span class="text-black-50 dado">Quantidade: {{ venda[0].quantidade }}</span>
        </b-col>
        <b-col md="3" sm="12">
          <span class="text-black-50 dado">Desconto: {{ venda[0].desconto | currency}}</span>
        </b-col>
        <b-col md="3" sm="12">
          <span class="text-black-50 dado">Valor Total: {{ venda[0].valorTotal | currency }}</span>
        </b-col>
      </b-row>
      <hr />
      <div v-for="item in pagamentos" :key="item.id">
        <input id="venda-id" type="hidden" v-model="item.id" />
        <b-row class="pt-4">
          <b-col md="3" sm="12" class="pl-5">
            <b-row>
              <span class="text-black-50 dado">Data:</span>
            </b-row>
            <b-row>
              <span class="text-black-50 dado">{{ item.data | moment("DD/MM/YYYY")}}</span>
            </b-row>
          </b-col>
          <b-col md="3" sm="12">
            <b-row>
              <span class="text-black-50 dado">Valor:</span>
            </b-row>
            <b-row>
              <span class="text-black-50 dado">{{item.valor | currency }}</span>
            </b-row>
          </b-col>
          <b-col md="3" sm="12">
            <b-row>
              <span class="text-black-50 dado">Numero:</span>
            </b-row>
            <b-row>
              <span class="text-black-50 dado">{{item.numeroPagamento}}</span>
            </b-row>
          </b-col>
          <b-col v-if="item.dataPagamento !='Invalid date'" md="3" sm="12">
            <b-row>
              <span class="text-black-50 dado">Data Pagamento:</span>
            </b-row>
            <b-row>
              <span class="text-black-50 dado">{{item.dataPagamento| moment("DD/MM/YYYY")}}</span>
            </b-row>
          </b-col>
          <b-col v-else md="3" sm="12">
            <b-button @click="preencherPagamento(item)" variant="success">
              Efetuar Pagamento
              <v-icon name="usd-circle"></v-icon>
            </b-button>
          </b-col>
          <!-- <b-col md="2" sm="12">
            <b-row><span class="text-black-50 dado">Parcela:</span></b-row><b-row><span class="text-black-50 dado">{{item.numeroParcela}}</span></b-row>
          </b-col>-->
        </b-row>
      </div>
    </b-card>
    <div>
      <b-modal id="modal-center" size="xl" centered title="Cadastrar Pagamento" ref="modal">
        <b-row class="pl-5 pr-5   p-3">
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
            <b-row>
              <span class="text-black-50 dado">{{pagamentoVenda.numeroPagamento}}</span>
            </b-row>
          </b-col>
           <b-col md="3" sm="12">
            <b-row>
              <span class="text-black-50 dado">Numero:</span>
            </b-row>
            <b-row>
              <span class="text-black-50 dado">{{pagamentoVenda.valor | currency }}</span>
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
          <router-link to="/vendas">
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
import { baseApiUrl } from "@/global";
import axios from "axios";

export default {
  name: "Venda",
  data: function() {
    return {
      pagamentoVenda: {},
      venda: {},
      pagamentos: {},
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
  methods: {
    preencherPagamento(venda) {
      // alert(venda.data);
      this.pagamentoVenda = venda;
      this.$refs["modal"].show();
      // showModal()
    },
    showModal() {
      this.$refs["modal"].show();
    }
  },
  mounted() {
    const url = `${baseApiUrl}/vendas/${this.$route.params.id}`;
    axios.get(url).then(res => (this.venda = res.data));
    const urlPagamentos = `${baseApiUrl}/pagamentosVendas/vendas/${this.$route.params.id}`;
    axios.get(urlPagamentos).then(res => (this.pagamentos = res.data));
    // alert(moment(this.venda.dataCadastro).format('L'))
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
.venda {
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  align-content: center;
}
</style>
