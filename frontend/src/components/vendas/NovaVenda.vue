<template>
  <div class="venda">
    <b-breadcrumb class="breadcrumb" :items="items"></b-breadcrumb>
    <b-card>
      <b-form @submit.stop.prevent="onSubmit">
        <input id="venda-id" type="hidden" v-model="venda.id" />
        <b-row>
          <b-col md="6" sm="12">
            <b-form-group
              label="Nome do cliente:"
              label-for="venda-nome"
              label-size="lg"
              label-class="font-weight-bold"
            >
              <!-- <b-form-input id="venda-nome" type="text" v-model="venda.nome" required/> -->
              <vue-bootstrap-typeahead
                :data="clientes"
                v-model="clienteBusca"
                :serializer="nome => nome.nome"
                @hit="clienteSelecionado = $event"
                v-validate="{ required: true, min: 3}"
                :state="validateState('cliente-nome')"
                name="cliente-nome"
                id="cliente-nome"
              />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group
              label="Transportadora:"
              label-for="venda-transportadora"
              label-size="lg"
              label-class="font-weight-bold"
            >
              <!-- <b-form-input id="venda-nome" type="text" v-model="venda.nome" required/> -->
              <vue-bootstrap-typeahead
                :data="transportadoras"
                v-model="transportadoraBusca"
                :serializer="nome => nome.nome"
                @hit="transportadoraSelecionado = $event"
              />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group
              label="Data:"
              label-for="venda-data"
              label-size="lg"
              label-class="font-weight-bold"
            >
              <b-form-input id="venda-data" type="date" v-model="venda.data" required />
            </b-form-group>
          </b-col>   
        </b-row>
        <b-row>
           <b-col md="3" sm="12">
            <b-form-group
              label="Forma:"
              label-for="venda-forma-pagamento"
              label-size="lg"
              label-class="font-weight-bold"
            >
              <b-form-select
                id="venda-forma-pagamento"
                options
                v-model="venda.formaPagamento"
                required
              >
                <option value="boleto">Boleto</option>
                <option value="cheque">Cheque</option>
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group
              label="Pedido:"
              label-for="venda-numero-pedido"
              label-size="lg"
              label-class="font-weight-bold"
            >
              <b-form-input
                id="venda-numero-pedido"
                type="text"
                v-model="venda.numeroPedido"
                v-validate="{ required: true, min: 1}"
                :state="validateState('venda-numero-pedido')"
                name="venda-numero-pedido"
              />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Nota Fiscal:" label-for="venda-nota-fiscal" label-size="lg">
              <b-form-input
                id="venda-nota-fiscal"
                type="text"
                v-model="venda.numeroNF"
                v-validate="{ required: true, min: 1}"
                :state="validateState('venda-nota-fiscal')"
                name="venda-nota-fiscal"
              />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group
              label="Quantidade:"
              label-for="venda-quantidade"
              label-size="lg"
              label-class="font-weight-bold"
            >
              <b-form-input
                id="venda-quantidade"
                type="number"
                v-model="venda.quantidade"
                v-validate="{ required: true, min: 1}"
                :state="validateState('venda-quantidade')"
                name="venda-quantidade"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3" sm="12">
            <b-form-group
              label="Valor:"
              label-for="venda-valor"
              label-size="lg"
              label-class="font-weight-bold"
            >
              <b-form-input
                id="venda-valor-total"
                v-model.lazy="venda.valor"
                type="number"
                @change="preencherPagamentos()"
                v-validate="{ required: true, min: 1}"
                :state="validateState('venda-valor-total')"
                name="venda-valor-total"
              />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group
              label="Desconto:"
              label-for="venda-desconto"
              label-size="lg"
            >
              <b-form-input
                id="venda-valor-total"
                v-model="venda.desconto"
                type="number"
                @change="preencherPagamentos()"
                required
              />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group
              label="Valor Total:"
              label-for="venda-valor-total"
              label-size="lg"
              label-class="font-weight-bold"
            >
              <b-form-input
                id="venda-valor-total"
                v-model="venda.valorTotal"
                type="number"
                @change="preencherPagamentos()"
                required
              />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group
              label="Parcelamento:"
              label-for="venda-condicao-pagamento"
              label-size="lg"
              label-class="font-weight-bold"
            >
              <b-form-select
                id="venda-condicao-pagamento"
                options
                v-model="venda.condicaoPagamento"
                required
                @change="preencherPagamentos()"
              >
                <option value="1">À Vista</option>
                <option value="2">2x</option>
                <option value="3">3x</option>
                <option value="4">4x</option>
                <option value="5">5x</option>
                <option value="6">6x</option>
                <option value="7">7x</option>
                <option value="8">8x</option>
                <option value="9">9x</option>
                <option value="10">10x</option>
                <option value="11">11x</option>
                <option value="12">12x</option>
              </b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
        <hr />
        <b-row>
          <p class="p-3 dados-pagamento">Dados Pagamento</p>
        </b-row>
        <div v-for="item in pagamentosVendas" :key="item.id">
          <b-row>
            <b-col md="2" sm="12">
              <b-form-group
                label="Data:"
                label-for="venda-data-pagamento"
                label-size="lg"
                label-class="font-weight-bold"
              >
                <b-form-input id="venda-data-pagamento" type="date" v-model="item.data" required />
              </b-form-group>
            </b-col>
            <b-col md="4" sm="12">
              <b-form-group
                v-if="venda.formaPagamento == 'boleto'"
                label="Número Boleto:"
                label-for="venda-numero-boleto"
                label-size="lg"
              >
                <b-form-input
                  id="venda-numero-boleto"
                  type="text"
                  v-model="item.numeroPagamento"
                  required
                />
              </b-form-group>
              <b-form-group
                v-else
                label="Número Cheque:"
                label-for="venda-numero-boleto"
                label-size="lg"
              >
                <b-form-input
                  id="venda-numero-boleto"
                  type="text"
                  v-model="item.numeroPagamento"
                  required
                />
              </b-form-group>
            </b-col>
            <b-col md="4" sm="12">
              <b-form-group
                label="Valor:"
                label-for="venda-valor"
                label-size="lg"
                label-class="font-weight-bold"
              >
                <b-form-input id="venda-valor" v-model="item.valor" required />
              </b-form-group>
            </b-col>
            <b-col md="2" sm="12">
              <b-form-group label="Parcela:" label-for="venda-numero-parcela" label-size="lg">
                <b-form-input id="venda-numero-parcela" v-model="item.numeroParcela" disabled />
              </b-form-group>
            </b-col>
          </b-row>
        </div>
        <hr />
      </b-form>
      <b-row>
        <b-col xs="12">
          <b-button variant="primary" @click="save" :disabled="veeErrors.any()">Salvar</b-button>
         <!-- <b-button variant="success" class="ml-2 white-text" @click="imprimir()">Imprimir</b-button> -->
          <router-link to="/vendas">
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
import moment from "moment"

export default {
  name: "NovaVenda",
  components: { "vue-bootstrap-typeahead": VueBootstrapTypeahead },
  data: function() {
    return {
      mode: "save",
      isLoading: false,
      venda: {
        condicaoPagamento: 1,
        formaPagamento: "boleto",
        data: "",
        desconto: 0
        // desconto:0
      },
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false /* doesn't work with directive */
      },
      // vendas: [],
      pagamentosVendas: [{}],
      clientes: [],
      clienteBusca: "",
      clienteSelecionado: null,
      transportadoras: [],
      transportadoraBusca: "",
      transportadoraSelecionado: null,
      //   status: 'ativo',
      items: [
        {
          text: "Inicio",
          to: "/"
        },
        {
          text: "Vendas",
          to: "vendas"
        },
        {
          text: "Nova Venda",
          active: true
        }
      ]
    };
  },
  methods: {
    save() {
      // alert(this.venda.idCliente)
      // const method = this.venda.id ? "put" : "post";
      const id = this.venda.id ? `/${this.venda.id}` : "";
      this.venda.pagamentosVendas = this.pagamentosVendas;
      this.venda.idCliente = this.clienteSelecionado.id;
      this.venda.idTransportadora = this.transportadoraSelecionado.id;
      axios
        .post(`${baseApiUrl}/vendas${id}`, this.venda)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.$router.push("/vendas");
        })
        .catch(showError);
    },
    resetClient() {
      this.$store.commit("setClient", null);
    },
    async getClientes(nome) {
      const url = `${baseApiUrl}/clientes/nome/${nome}`;
      await axios.get(url).then(res => (this.clientes = res.data));
    },
    async getTransportadoras(nome) {
      const url = `${baseApiUrl}/transportadoras/nome/${nome}`;
      await axios.get(url).then(res => (this.transportadoras = res.data));
    },
    preencherPagamentos() {
      this.pagamentosVendas = [];
      this.venda.valorTotal = this.venda.valor - this.venda.desconto;
      let dataParcela = this.venda.data;
      for (let i = 0; i < parseInt(this.venda.condicaoPagamento); i++) {
        dataParcela = moment(dataParcela)
          .add(1, "month")
          .format("YYYY-MM-DD");
        this.pagamentosVendas.push({
          data: dataParcela,
          valor: (
            this.venda.valorTotal / parseInt(this.venda.condicaoPagamento)
          ).toFixed(2),
          numeroParcela: `${i + 1}/${this.venda.condicaoPagamento}`,
          dataPagamento: null
        });
      }
      this.venda.pagamentosVendas = this.pagamentosVendas;
      this.venda.idCliente = this.clienteSelecionado.id;
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
    },
    imprimir(){     
    }
  },
  watch: {
    clienteBusca: _.debounce(function(nome) {
      this.getClientes(nome);
    }, 500),
    transportadoraBusca: _.debounce(function(nome) {
      this.getTransportadoras(nome);
    }, 500)
  },
  mounted() {
    this.venda.data = moment().format("YYYY-MM-DD");
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
