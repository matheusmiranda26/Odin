<template>
  <div class="despesa">
    <b-breadcrumb class="breadcrumb" :items="items"></b-breadcrumb>
    <b-card>
      <b-form @submit.stop.prevent="onSubmit">
        <input id="despesa-id" type="hidden" v-model="despesa.id" />
        <b-row>
          <b-col md="3" sm="12">
            <b-form-group
              label="Fornecedor:"
              label-for="despesa-fornecedor"
              label-size="lg"
              label-class="font-weight-bold"
            >
              <!-- <b-form-input id="despesa-nome" type="text" v-model="despesa.nome" required/> -->
              <vue-bootstrap-typeahead
                :data="fornecedores"
                v-model="fornecedorBusca"
                :serializer="nome => nome.nome"
                @hit="fornecedorSelecionado = $event"
              />
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="Observação:" label-for="despesa-observacao" label-size="lg">
              <b-form-input id="despesa-observacao" type="text" v-model="despesa.observacao" />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group
              label="Data:"
              label-for="despesa-data"
              label-size="lg"
              label-class="font-weight-bold"
            >
              <b-form-input id="despesa-data" type="date" v-model="despesa.data" required />
            </b-form-group>
          </b-col>
        </b-row>
        <!--<b-row>
           <b-col md="3" sm="12">
            <b-form-group
              label="Forma:"
              label-for="despesa-forma-pagamento"
              label-size="lg"
              label-class="font-weight-bold"
            >
              <b-form-select
                id="despesa-forma-pagamento"
                options
                v-model="despesa.formaPagamento"
              >
                <option value="boleto">Boleto</option>
                <option value="cheque">Cheque</option>
                <option value="deposito">Depósito</option>
                <option value="dinheiro">Dinheiro</option>
                <option value="transferencia">Transferência</option>
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group
              label="Número:"
              label-for="despesa-numero"
              label-size="lg"
            >
              <b-form-input
                id="despesa-numero"
                type="text"
                v-model="despesa.numer"
                v-validate="{ min: 1}"
                :state="validateState('despesa-numero')"
                name="despesa-numero"
              />
            </b-form-group>
          </b-col>
          <b-col v-show="despesa.formaPagamento == 'deposito'" md="3" sm="12">
            <b-form-group label="Agência:" label-for="despesa-agencia" label-size="lg">
              <b-form-input
                id="despesa-agencia"
                type="text"
                v-model="despesa.agencia"
                v-validate="{  min: 1}"
                :state="validateState('despesa-agencia')"
                name="despesa-agencia"
              />
            </b-form-group>
          </b-col>
         <b-col v-show="despesa.formaPagamento == 'deposito'" md="3" sm="12">
            <b-form-group label="Conta:" label-for="despesa-conta" label-size="lg">
              <b-form-input
                id="despesa-conta"
                type="text"
                v-model="despesa.conta"
                v-validate="{ min: 1}"
                :state="validateState('despesa-conta')"
                name="despesa-conta"
              />
            </b-form-group>
          </b-col>
        </b-row>-->
        <b-row>
          <b-col md="3" sm="12">
            <b-form-group
              label="Valor:"
              label-for="despesa-valor"
              label-size="lg"
              label-class="font-weight-bold"
            >
              <b-form-input
                id="despesa-valor-total"
                v-model.lazy="despesa.valor"
                type="number"
                @change="preencherPagamentos()"
                v-validate="{ required: true, min: 1}"
                :state="validateState('despesa-valor-total')"
                name="despesa-valor-total"
              />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Desconto:" label-for="despesa-desconto" label-size="lg">
              <b-form-input
                id="despesa-valor-total"
                v-model="despesa.desconto"
                type="number"
                @change="preencherPagamentos()"
                required
              />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group
              label="Valor Total:"
              label-for="despesa-valor-total"
              label-size="lg"
              label-class="font-weight-bold"
            >
              <b-form-input
                id="despesa-valor-total"
                v-model="despesa.valorTotal"
                type="number"
                @change="preencherPagamentos()"
                required
              />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group
              label="Parcelamento:"
              label-for="despesa-condicao-pagamento"
              label-size="lg"
              label-class="font-weight-bold"
            >
              <b-form-select
                id="despesa-condicao-pagamento"
                options
                v-model="despesa.condicaoPagamento"
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
        <hr v-show="despesa.condicaoPagamento != 1" />
        <b-row v-show="despesa.condicaoPagamento != 1">
          <p class="p-3 dados-pagamento">Dados Pagamento</p>
        </b-row>
        <div
          v-show="despesa.condicaoPagamento != 1"
          v-for="item in pagamentosDespesas"
          :key="item.id"
        >
          <b-row>
            <b-col md="2" sm="12">
              <b-form-group
                label="Data:"
                label-for="despesa-data-pagamento"
                label-size="lg"
                label-class="font-weight-bold"
              >
                <b-form-input id="despesa-data-pagamento" type="date" v-model="item.data" required />
              </b-form-group>
            </b-col>
            <b-col md="4" sm="12">
              <b-form-group
                v-if="despesa.formaPagamento == 'boleto'"
                label="Número Boleto:"
                label-for="despesa-numero-boleto"
                label-size="lg"
              >
                <b-form-input
                  id="despesa-numero-boleto"
                  type="text"
                  v-model="item.numeroPagamento"
                  required
                />
              </b-form-group>
              <b-form-group
                v-else
                label="Número Cheque:"
                label-for="despesa-numero-boleto"
                label-size="lg"
              >
                <b-form-input
                  id="despesa-numero-boleto"
                  type="text"
                  v-model="item.numeroPagamento"
                  required
                />
              </b-form-group>
            </b-col>
            <b-col md="4" sm="12">
              <b-form-group
                label="Valor:"
                label-for="despesa-valor"
                label-size="lg"
                label-class="font-weight-bold"
              >
                <b-form-input id="despesa-valor" v-model="item.valor" required />
              </b-form-group>
            </b-col>
            <b-col md="2" sm="12">
              <b-form-group label="Parcela:" label-for="despesa-numero-parcela" label-size="lg">
                <b-form-input id="despesa-numero-parcela" v-model="item.numeroParcela" disabled />
              </b-form-group>
            </b-col>
          </b-row>
        </div>
        <hr />
      </b-form>
      <b-row>
        <b-col xs="12">
          <b-button variant="primary" @click="save" :disabled="veeErrors.any()">Salvar</b-button>
          <router-link to="/despesas">
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
  name: "NovaDespesa",
  components: { "vue-bootstrap-typeahead": VueBootstrapTypeahead },
  data: function() {
    return {
      mode: "save",
      isLoading: false,
      despesa: {
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
      // despesas: [],
      pagamentosDespesas: [{}],
      clientes: [],
      clienteBusca: "",
      clienteSelecionado: null,
      fornecedores: [],
      fornecedorBusca: "",
      fornecedorSelecionado: null,
      //   status: 'ativo',
      items: [
        {
          text: "Inicio",
          to: "/"
        },
        {
          text: "Despesas",
          to: "despesas"
        },
        {
          text: "Nova Despesa",
          active: true
        }
      ]
    };
  },
  methods: {
    save() {
      // alert(this.despesa.idCliente)
      // const method = this.despesa.id ? "put" : "post";
      const id = this.despesa.id ? `/${this.despesa.id}` : "";
      if (this.despesa.condicaoPagamento != 1) {
        this.despesa.pagamentosDespesas = this.pagamentosDespesas;
      }
      this.despesa.idFornecedor = this.fornecedorSelecionado.id;
      axios
        .post(`${baseApiUrl}/despesas${id}`, this.despesa)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.$router.push("/despesas");
        })
        .catch(showError);
    },
    resetClient() {
      this.$store.commit("setClient", null);
    },
    async getFornecedores(nome) {
      const url = `${baseApiUrl}/fornecedores/nome/${nome}`;
      await axios.get(url).then(res => (this.fornecedores = res.data));
    },
    preencherPagamentos() {
      this.pagamentosDespesas = [];
      this.despesa.valorTotal = this.despesa.valor - this.despesa.desconto;
      let dataParcela = this.despesa.data;
      for (let i = 0; i < parseInt(this.despesa.condicaoPagamento); i++) {
        // alert("aqui")
        dataParcela = moment(dataParcela)
          .add(1, "month")
          .format("YYYY-MM-DD");
        this.pagamentosDespesas.push({
          data: dataParcela,
          valor: (
            this.despesa.valorTotal / parseInt(this.despesa.condicaoPagamento)
          ).toFixed(2),
          numeroParcela: `${i + 1}/${this.despesa.condicaoPagamento}`,
          dataPagamento: null
        });
      }
      this.despesa.pagamentosDespesas = this.pagamentosDespesas;
      this.despesa.idCliente = this.clienteSelecionado.id;
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
    }
  },
  watch: {
    fornecedorBusca: _.debounce(function(nome) {
      this.getFornecedores(nome);
    }, 500)
  },
  mounted() {
    this.despesa.data = moment().format("YYYY-MM-DD");
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
