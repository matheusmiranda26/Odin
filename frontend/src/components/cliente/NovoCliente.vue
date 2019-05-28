<template>
  <div class="new-cliente">
    <b-breadcrumb class="breadcrumb" :items="items"></b-breadcrumb>
    <b-card>
      <b-form>
        <input id="cliente-id" type="hidden" v-model="cliente.id">
        <b-row>
          <b-col md="6" sm="12">
            <b-form-group label="Nome do cliente:" label-for="cliente-nome">
              <b-form-input id="cliente-nome" type="text" v-model="cliente.nomeCliente" required/>
            </b-form-group>
          </b-col>

          <b-col md="3" sm="12">
            <b-form-group label="Tipo Cliente:" label-for="cliente-tipo-cliente">
              <b-form-select
                id="cliente-tipo-cliente"
                options
                v-model="cliente.tipoCliente"
                required
              >
                <option value="fisica">Fisica</option>
                <option value="juridica">Juridica</option>
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Status:" label-for="cliente-status">
              <!-- <bootstrap-toggle
                id="cliente-status"
                :options="{ ativo: 'Ativo', off: 'Inativo' }"
                :disabled="false"
              />-->
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3" sm="12">
            <b-form-group
              v-if="cliente.tipoCliente === 'fisica'"
              label="CPF:"
              label-for="cliente-cpf"
            >
              <b-form-input id="cliente-cpf" type="text" v-model="cliente.cnpj_cpf" required/>
            </b-form-group>
            <b-form-group v-else label="CNPJ:" label-for="cliente-cnpj">
              <b-form-input id="cliente-cnpj" type="text" v-model="cliente.cnpj_cpf" required/>
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="Nome Fantasia:" label-for="cliente-fantasia">
              <b-form-input
                id="cliente-fantasia"
                type="text"
                v-model="cliente.nomeFantasia"
                required
              />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Data Fundação:" label-for="cliente-data">
              <b-form-input id="cliente-data" type="date" v-model="cliente.dataFundacao" required/>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3" sm="12">
            <b-form-group
              v-if="cliente.tipoCliente === 'fisica'"
              label="RG:"
              label-for="cliente-rg"
            >
              <b-form-input id="cliente-rg" type="text" v-model="cliente.inscricaoEstadual_rg"/>
            </b-form-group>
            <b-form-group v-else label="Inscrição Estadual:" label-for="cliente-inscricao-estadual">
              <b-form-input
                id="cliente-inscricao-estadual"
                type="text"
                v-model="cliente.inscricaoEstadual_rg"
                required
              />
            </b-form-group>
          </b-col>

          <b-col md="3" sm="12">
            <b-form-group label="Telefone Comercial:" label-for="cliente-telefone-comercial">
              <b-form-input
                id="cliente-telefone-comercial"
                type="text"
                v-model="cliente.telefoneComercial"
              />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Telefone Celular:" label-for="cliente-telefone-celular">
              <b-form-input
                id="cliente-telefone-celular"
                type="text"
                v-model="cliente.telefoneCelular"
              />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Email:" label-for="cliente-email">
              <b-form-input id="cliente-email" type="text" v-model="cliente.email"/>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="8" sm="12">
            <b-form-group label="Observações:" label-for="cliente-observacoes">
              <b-form-input id="cliente-observacoes" type="text" v-model="cliente.observacoes" />
            </b-form-group>
          </b-col>
          <!-- <b-col md="4" sm="12">
            <b-form-group label="Vendedor:" label-for="cliente-vendedor">
              <b-form-input id="cliente-vendedor" type="text" v-model="cliente.observacoes"/>
            </b-form-group>
          </b-col>-->
        </b-row>
        <b-row>
          <p class="p-3 endereco">Endereço do Cliente</p>
        </b-row>
        <hr>
        <b-row>
          <b-col md="4" sm="12">
            <b-form-group label="CEP:" label-for="cliente-cep">
              <b-form-input id="cliente-cep" type="text" v-model="cliente.cep" required/>
            </b-form-group>
          </b-col>
          <b-col md="5" sm="12">
            <b-form-group label="Endereço:" label-for="cliente-endereco">
              <b-form-input id="cliente-endereco" type="text" v-model="cliente.endereco" required/>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Numero:" label-for="cliente-numero">
              <b-form-input id="cliente-numero" type="text" v-model="cliente.numero" required/>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="4" sm="12">
            <b-form-group label="Complemento:" label-for="cliente-complemento">
              <b-form-input id="cliente-complemento" type="text" v-model="cliente.complemento"/>
            </b-form-group>
          </b-col>
          <b-col md="4" sm="12">
            <b-form-group label="Bairro:" label-for="cliente-bairro">
              <b-form-input id="cliente-bairro" type="text" v-model="cliente.bairro" required/>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Cidade:" label-for="cliente-cidade">
              <b-form-input id="cliente-cidade" type="text" v-model="cliente.cidade" required/>
            </b-form-group>
          </b-col>
          <b-col md="1" sm="12">
            <b-form-group label="Estado:" label-for="cliente-estado">
              <b-form-input id="cliente-estado" type="text" v-model="cliente.estado" required/>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
      <b-row>
        <b-col md="3" sm="12">
          <b-form-group label="Vendedor:" label-for="cliente-vendedor">
            <b-form-select
              id="cliente-vendedor"
              :options="vendedores"
              v-model="cliente.idVendedor"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="12">
          <b-button variant="primary" v-if="mode === 'save'" @click="save()">Salvar</b-button>
          <b-button variant="warning" v-if="mode === 'edit'" @click="edit()">Salvar</b-button>
          <router-link to="/clientes">
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
// import BootstrapToggle from "vue-bootstrap-toggle";

export default {
  name: "NovoCliente",
  //   components: { BootstrapToggle },
  data: function() {
    return {
      mode: "save",
      isLoading: false,
      cliente: {},
      clientes: [],
      vendedores: [],
      //   status: 'ativo',
      items: [
        {
          text: "Inicio",
          to: "/"
        },
        {
          text: "Clientes",
          to: "clientes"
        },
        {
          text: "Novo",
          active: true
        }
      ]
    };
  },
  methods: {
    save() {
      // const method = this.cliente.id ? "put" : "post";
      const id = this.cliente.id ? `/${this.cliente.id}` : "";
      axios
        .post(`${baseApiUrl}/clientes${id}`, this.cliente)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.$router.push("/clientes");
        })
        .catch(showError);
    },
    resetClient() {
      this.$store.commit("setClient", null);
    },
    carregarVendedores() {
      const url = `${baseApiUrl}/vendedores`;
      axios.get(url).then(res => {
        let vendedoresAtivos = res.data.filter(
          vendedor => vendedor.status != "1"
        );
        vendedoresAtivos.sort(function(a, b) {
          if (a.nome > b.nome) {
            return 1;
          }
          if (a.nome < b.nome) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
        this.vendedores = vendedoresAtivos.map(vendedor => {
          return { value: vendedor.id, text: vendedor.nome };
        });
      });
    }
  },
  mounted() {
    this.carregarVendedores();
    //   var vm = this
    // EventBus.$on("editarCliente", function(client2) {
    //     alert(client2.nomeCliente + " " + client2.email)
    //   vm.cliente = { ...cliente }
    //   alert('aqui sim')
    // });
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
