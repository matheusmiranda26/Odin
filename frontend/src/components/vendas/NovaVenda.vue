<template>
  <div class="nova-venda">
    <b-breadcrumb class="breadcrumb" :items="items"></b-breadcrumb>
    <b-card>
      <b-form>
        <input id="venda-id" type="hidden" v-model="venda.id">
        <b-row>
          <b-col md="8" sm="12">
            <b-form-group label="Nome do cliente:" label-for="venda-nome">
              <!-- <b-form-input id="venda-nome" type="text" v-model="venda.nomeCliente" required/> -->
              <vue-bootstrap-typeahead
                :data="clientes"
                v-model="clienteBusca"
                :serializer="nome => nome.nomeCliente"
                @hit="clienteSelecionado = $event"
              />
            </b-form-group>
          </b-col>
          <b-col md="4" sm="12">
            <b-form-group label="Data:" label-for="venda-data">
              <b-form-input id="venda-data" type="date" v-model="venda.data" required/>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3" sm="12">
            <b-form-group label="Pedido:" label-for="venda-numero-pedido">
              <b-form-input
                id="venda-numero-pedido"
                type="text"
                v-model="venda.numeroPedido"
                required
              />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Nota Fiscal:" label-for="venda-nota-fiscal">
              <b-form-input id="venda-nota-fiscal" type="text" v-model="venda.numeroNF" required/>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Condição de Pagamento:" label-for="venda-condicao-pagamento">
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
          <b-col md="3" sm="12">
            <b-form-group label="Forma de Pagamento:" label-for="venda-forma-pagamento">
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
            <b-col md="3" sm="12">
              <b-form-group label="Data:" label-for="venda-data-pagamento">
                <b-form-input id="venda-data-pagamento" type="text" v-model="item.data" required/>
              </b-form-group>
            </b-col>
          </b-row>         
        </div>
         <b-row>
            {{pagamentosVendas}}
          </b-row>
        <hr>
        <b-row></b-row>
      </b-form>
      <b-row>
        <b-col xs="12">
          <b-button variant="primary" v-if="mode === 'save'" @click="save()">Salvar</b-button>
          <b-button variant="warning" v-if="mode === 'edit'" @click="edit()">Salvar</b-button>
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

// import BootstrapToggle from "vue-bootstrap-toggle";

export default {
  name: "NovaVenda",
  components: { "vue-bootstrap-typeahead": VueBootstrapTypeahead },
  data: function() {
    return {
      mode: "save",
      isLoading: false,
      venda: {
        condicaoPagamento: 1
      },
      vendas: [],
      pagamentosVendas: [{}],
      clientes: [],
      clienteBusca: "",
      clienteSelecionado: null,
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
      // const method = this.venda.id ? "put" : "post";
      const id = this.venda.id ? `/${this.venda.id}` : "";
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

      // const res = await fetch(`${baseApiUrl}/cliente/:nome`.replace(':nome', nome))
      // const sugestoes = await res.json()
      // this.clientes = sugestoes
    },
    preencherPagamentos(){
      // alert(this.venda.condicaoPagamento)
      this.pagamentosVendas = []
      for(let i = 0; i < parseInt(this.venda.condicaoPagamento); i++){
        // alert("aqui")
        this.pagamentosVendas.push({})
      }
    }
  },
  mounted() {
    //   var vm = this
    // EventBus.$on("editarCliente", function(client2) {
    //     alert(client2.nomeCliente + " " + client2.email)
    //   vm.venda = { ...venda }
    //   alert('aqui sim')
    // });
  },
  watch: {
    clienteBusca: _.debounce(function(nome) {
      this.getClientes(nome);
    }, 500)
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
