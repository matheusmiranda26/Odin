<template>
  <div class="editar-cliente">
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
            <b-form-group label="Status:">
              <b-form-radio-group id="cliente-status" v-model="cliente.status" name="cliente.status">
                <b-form-radio value="1">Ativo</b-form-radio>
                <b-form-radio value="0">Inativo</b-form-radio>
              </b-form-radio-group>
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
              <b-form-input id="cliente-cpf" type="text" v-model="cliente.cnpj_cpf"  v-mask="'###.###.###-##'" required/>
            </b-form-group>
            <b-form-group v-else label="CNPJ:" label-for="cliente-cnpj">
              <b-form-input id="cliente-cnpj" type="text" v-model="cliente.cnpj_cpf"  v-mask="'##.###.###/####-##'" required/>
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
               
              />
            </b-form-group>
          </b-col>

          <b-col md="3" sm="12">
            <b-form-group label="Telefone Comercial:" label-for="cliente-telefone-comercial">
              <b-form-input
                id="cliente-telefone-comercial"
                type="text"
                v-model="cliente.telefoneComercial"
                v-mask="['(##) ####-####', '(##) #####-####']"
              />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Telefone Celular:" label-for="cliente-telefone-celular">
              <b-form-input
                id="cliente-telefone-celular"
                type="text"
                v-model="cliente.telefoneCelular"
                 v-mask="['(##) ####-####', '(##) #####-####']"
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
          <b-col md="12" sm="12">
            <b-form-group label="Observações:" label-for="cliente-observacoes">
              <b-form-input id="cliente-observacoes" type="text" v-model="cliente.observacoes"/>
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
              <b-form-input id="cliente-cep" type="text" v-model="cliente.cep"  v-mask="'#####-###'" required/>
            </b-form-group>
          </b-col>
          <b-col md="5" sm="12">
            <b-form-group label="Endereço:" label-for="cliente-endereco">
              <b-form-input id="cliente-endereco" type="text" v-model="cliente.endereco"/>
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
              <b-form-input id="cliente-cidade" type="text" v-model="cliente.cidade"/>
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
          <b-button variant="warning" v-if="mode === 'edit'" @click="save()">Salvar</b-button>
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
var  moment = require("moment")

export default {
  name: "EditarCliente",
  data: function() {
    return {
      mode: "edit",
      isLoading: false,
      cliente: {},
      vendedores: [],
      datat:'1995-02-26',
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
          text: "Editar",
          active: true
        }
      ]
    };
  },
  methods: {
    save() {
      // alert(this.cliente.nomeCliente)
      // const method = this.cliente.id ? "put" : "post";
      const id = this.cliente.id; //? `/${this.cliente.id}` : "";
      axios
        .put(`${baseApiUrl}/clientes/${id}`, this.cliente)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.$router.push("/clientes");
        })
        .catch(showError);
    },
    formatarData(value, event) {
    
     
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
    const url = `${baseApiUrl}/clientes/${this.$route.params.id}`;
    axios.get(url).then(res => (this.cliente = res.data));
    // this.cliente.dataFundacao = this.cliente.dataFundacao.moment().format('DD-MM-YYYY')
    // this.cliente.dataFundacao = this.cliente.dataFundacao.date.toISOString().slice(0, 10)
    this.carregarVendedores()
  }
};
</script>

<style>
</style>
