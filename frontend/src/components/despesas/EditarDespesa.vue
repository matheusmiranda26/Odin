<template>
  <div class="despesa">
    <b-breadcrumb class="breadcrumb" :items="items"></b-breadcrumb>
    <b-card>
      <b-form>
        <input id="venda-id" type="hidden" v-model="venda.id" />
        <b-row>
          <b-col md="6" sm="12">
            <b-form-group label="Nome do cliente:" label-for="venda-nome">
              <!-- <b-form-input id="venda-nome" type="text" v-model="venda.nome" required/> -->
              <vue-bootstrap-typeahead
                :data="clientes"
                v-model="clienteBusca"
                :serializer="nome => nome.nome"
                @hit="clienteSelecionado = $event"
              />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Transportadora:" label-for="venda-transportadora">
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
            <b-form-group label="Data:" label-for="venda-data">
              <b-form-input id="venda-data" type="date" v-model="venda.data" required />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="1" sm="12">
            <b-form-group label="Pedido:" label-for="venda-numero-pedido">
              <b-form-input
                id="venda-numero-pedido"
                type="text"
                v-model="venda.numeroPedido"
                required
              />
            </b-form-group>
          </b-col>
          <b-col md="1" sm="12">
            <b-form-group label="Nota Fiscal:" label-for="venda-nota-fiscal">
              <b-form-input id="venda-nota-fiscal" type="text" v-model="venda.numeroNF" required />
            </b-form-group>
          </b-col>
          <b-col md="1" sm="12">
            <b-form-group label="Quantidade:" label-for="venda-quantidade">
              <b-form-input
                id="venda-quantidade"
                type="number"
                v-model="venda.quantidade"
                required
              />
            </b-form-group>
          </b-col>
          <b-col md="2" sm="12">
            <b-form-group label="Valor:" label-for="venda-valor">
              <b-form-input
                id="venda-valor-total"
                v-model.lazy="venda.valor"
                type="number"
                @change="preencherPagamentos()"
                required
              />
            </b-form-group>
          </b-col>
          <b-col md="2" sm="12">
            <b-form-group label="Desconto:" label-for="venda-desconto">
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
            <b-form-group label="Valor Total:" label-for="venda-valor-total">
              <b-form-input
                id="venda-valor-total"
                v-model="venda.valorTotal"
                type="number"
                @change="preencherPagamentos()"
                required
              />
            </b-form-group>
          </b-col>
          <b-col md="1" sm="12">
            <b-form-group label="Condição:" label-for="venda-condicao-pagamento">
              <b-form-select
                id="venda-condicao-pagamento"
                options
                v-model="venda.condicaoPagamento"
                required
                @change="preencherPagamentos()"
              >
                <option value="1">1x</option>
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
          <b-col md="1" sm="12">
            <b-form-group label="Forma:" label-for="venda-forma-pagamento">
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
        </b-row>

        <b-row>
          <p class="p-3 dados-pagamento">Dados Pagamento</p>
        </b-row>
        <div v-for="item in pagamentosVendas" :key="item.id">
          <b-row>
            <b-col md="2" sm="12">
              <b-form-group label="Data:" label-for="venda-data-pagamento">
                <b-form-input id="venda-data-pagamento" type="date" v-model="item.data" required />
              </b-form-group>
            </b-col>
            <b-col md="4" sm="12">
              <b-form-group
                v-if="venda.formaPagamento == 'boleto'"
                label="Número Boleto:"
                label-for="venda-numero-boleto"
              >
                <b-form-input
                  id="venda-numero-boleto"
                  type="text"
                  v-model="item.numeroPagamento"
                  required
                />
              </b-form-group>
              <b-form-group v-else label="Número Cheque:" label-for="venda-numero-boleto">
                <b-form-input
                  id="venda-numero-boleto"
                  type="text"
                  v-model="item.numeroPagamento"
                  required
                />
              </b-form-group>
            </b-col>
            <b-col md="4" sm="12">
              <b-form-group label="Valor:" label-for="venda-valor">
                <b-form-input id="venda-valor" v-model="item.valor" required />
              </b-form-group>
            </b-col>
            <b-col md="2" sm="12">
              <b-form-group label="Parcela:" label-for="venda-numero-parcela">
                <b-form-input id="venda-numero-parcela" v-model="item.numeroParcela" disabled />
              </b-form-group>
            </b-col>
          </b-row>
        </div>
        <hr />
      </b-form>
      <b-row>
        <b-col xs="12">
          <b-button variant="primary" @click="save()">Salvar</b-button>
          <b-button variant="success" class="ml-2 white-text" @click="edit()">Imprimir</b-button>
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
import moment from "moment";

// import BootstrapToggle from "vue-bootstrap-toggle";

export default {
  name: "NovaVenda",
  components: { "vue-bootstrap-typeahead": VueBootstrapTypeahead },
  data: function() {
    return {
      mode: "save",
      isLoading: false,
      venda: {},
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
          to: "/vendas"
        },
        {
          text: "Editar Venda",
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
      // this.venda.valor = this.venda.valor.replace(",", ".").split('R$ ')[1];
      // alert(this.venda.condicaoPagamento)
      this.pagamentosVendas = [];
      this.venda.valorTotal = this.venda.valor - this.venda.desconto;
      let dataParcela = this.venda.data;
      for (let i = 0; i < parseInt(this.venda.condicaoPagamento); i++) {
        // alert("aqui")
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
    const url = `${baseApiUrl}/vendas/${this.$route.params.id}`;
    axios.get(url).then(res => (this.venda = res.data));
    const urlpagamentos = `${baseApiUrl}/pagamentosVendas/${this.$route.params.id}`;
    axios.get(urlpagamentos).then(res => (this.pagamentosVendas = res.data));
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
