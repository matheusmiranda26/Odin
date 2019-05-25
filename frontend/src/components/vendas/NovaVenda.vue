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
          <p class="p-3 endereco">Carrinho</p>
        </b-row>
        <hr>
        <b-row>
          <b-col md="4" sm="12">
            <b-form-group label="CEP:" label-for="venda-cep">
              <b-form-input id="venda-cep" type="text" v-model="venda.cep" required/>
            </b-form-group>
          </b-col>
          <b-col md="5" sm="12">
            <b-form-group label="Endereço:" label-for="venda-endereco">
              <b-form-input id="venda-endereco" type="text" v-model="venda.endereco" required/>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Numero:" label-for="venda-numero">
              <b-form-input id="venda-numero" type="text" v-model="venda.numero" required/>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="4" sm="12">
            <b-form-group label="Complemento:" label-for="venda-complemento">
              <b-form-input id="venda-complemento" type="text" v-model="venda.complemento"/>
            </b-form-group>
          </b-col>
          <b-col md="4" sm="12">
            <b-form-group label="Bairro:" label-for="venda-bairro">
              <b-form-input id="venda-bairro" type="text" v-model="venda.bairro" required/>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Cidade:" label-for="venda-cidade">
              <b-form-input id="venda-cidade" type="text" v-model="venda.cidade" required/>
            </b-form-group>
          </b-col>
          <b-col md="1" sm="12">
            <b-form-group label="Estado:" label-for="venda-estado">
              <b-form-input id="venda-estado" type="text" v-model="venda.estado" required/>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
      <b-row>
        <b-col md="3" sm="12">
          <b-form-group label="Vendedor:" label-for="venda-vendedor">
            <b-form-select id="venda-vendedor" :options="vendedores" v-model="venda.idVendedor"/>
          </b-form-group>
        </b-col>
      </b-row>
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
      venda: {},
      vendas: [],
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
      const url = `${baseApiUrl}/cliente/${nome}`;
      await axios.get(url).then(res => (this.clientes = res.data));

      // const res = await fetch(`${baseApiUrl}/cliente/:nome`.replace(':nome', nome))
      // const sugestoes = await res.json()
      // this.clientes = sugestoes
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
.endereco {
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
