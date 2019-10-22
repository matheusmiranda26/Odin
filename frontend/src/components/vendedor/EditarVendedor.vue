<template>
  <div class="vendedor">
    <b-breadcrumb class="breadcrumb" :items="items"></b-breadcrumb>
    <b-card>
      <b-form>
        <input id="vendedor-id" type="hidden" v-model="vendedor.id" />
        <b-row>
          <b-col md="5" sm="12">
            <b-form-group label="Nome do vendedor:" label-for="vendedor-nome">
              <b-form-input id="vendedor-nome" type="text" v-model="vendedor.nome" required />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Apelido:" label-for="vendedor-apelidp">
              <b-form-input id="vendedor-apelido" type="text" v-model="vendedor.apelido" required />
            </b-form-group>
          </b-col>

          <b-col md="2" sm="12">
            <b-form-group label="Tipo Vendedor:" label-for="vendedor-tipo-vendedor">
              <b-form-select
                id="vendedor-tipo-vendedor"
                options
                v-model="vendedor.tipoVendedor"
                required
              >
                <option value="fisica">Fisica</option>
                <option value="juridica">Juridica</option>
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col md="2" sm="12">
            <b-form-group label="Status:">
              <b-form-radio-group
                id="vendedor-status"
                v-model="vendedor.status"
                name="vendedor.status"
              >
                <b-form-radio value="0">Ativo</b-form-radio>
                <b-form-radio value="1">Inativo</b-form-radio>
              </b-form-radio-group>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="4" sm="12">
            <b-form-group
              v-if="vendedor.tipoVendedor === 'fisica'"
              label="CPF:"
              label-for="vendedor-cpf"
            >
              <b-form-input
                id="vendedor-cpf"
                v-model="vendedor.cnpj_cpf"
                type="tel"
                v-mask="'###.###.###-##'"
                required
              />
            </b-form-group>
            <b-form-group v-else label="CNPJ:" label-for="vendedor-cnpj">
              <b-form-input
                id="vendedor-cnpj"
                v-model="vendedor.cnpj_cpf"
                type="tel"
                v-mask="'##.###.###/####-##'"
                required
              />
            </b-form-group>
          </b-col>
          <b-col md="4" sm="12">
            <b-form-group
              v-if="vendedor.tipoVendedor === 'fisica'"
              label="RG:"
              label-for="vendedor-rg"
            >
              <b-form-input id="vendedor-rg" type="text" v-model="vendedor.inscricaoEstadual_rg" />
            </b-form-group>
            <b-form-group
              v-else
              label="Inscrição Estadual:"
              label-for="vendedor-inscricao-estadual"
            >
              <b-form-input
                id="vendedor-inscricao-estadual"
                type="text"
                v-model="vendedor.inscricaoEstadual_rg"
                required
              />
            </b-form-group>
          </b-col>
          <b-col md="4" sm="12">
            <b-form-group label="Data de Nascimento:" label-for="vendedor-nascimento">
              <b-form-input
                id="vendedor-nascimento"
                type="date"
                v-model="vendedor.dataNascimento"
                required
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3" sm="12">
            <b-form-group label="Telefone Comercial:" label-for="vendedor-telefone-comercial">
              <b-form-input
                id="vendedor-telefone-comercial"
                v-model="vendedor.telefoneComercial"
                type="tel"
                v-mask="['(##) ####-####', '(##) #####-####']"
              />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Telefone Celular:" label-for="vendedor-telefone-celular">
              <b-form-input
                id="vendedor-telefone-celular"
                v-model="vendedor.telefoneCelular"
                type="tel"
                v-mask="['(##) ####-####', '(##) #####-####']"
              />
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="Email:" label-for="vendedor-email">
              <b-form-input id="vendedor-email" type="text" v-model="vendedor.email" />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12" sm="12">
            <b-form-group label="Observações:" label-for="vendedor-observacoes">
              <b-form-input id="vendedor-observacoes" type="text" v-model="vendedor.observacoes" />
            </b-form-group>
          </b-col>
          <!-- <b-col md="4" sm="12">
            <b-form-group label="Vendedor:" label-for="vendedor-vendedor">
              <b-form-input id="vendedor-vendedor" type="text" v-model="vendedor.observacoes"/>
            </b-form-group>
          </b-col>-->
        </b-row>
        <b-row>
          <p class="p-3 endereco">Endereço do Vendedor</p>
        </b-row>
        <hr />
        <b-row>
          <b-col md="4" sm="12">
            <b-form-group label="CEP:" label-for="vendedor-cep">
              <b-form-input
                id="vendedor-cep"
                v-model="vendedor.cep"
                type="tel"
                v-mask="'#####-###'"
                required
              />
            </b-form-group>
          </b-col>
          <b-col md="5" sm="12">
            <b-form-group label="Endereço:" label-for="vendedor-endereco">
              <b-form-input
                id="vendedor-endereco"
                type="text"
                v-model="vendedor.endereco"
                required
              />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Numero:" label-for="vendedor-numero">
              <b-form-input id="vendedor-numero" type="text" v-model="vendedor.numero" required />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="4" sm="12">
            <b-form-group label="Complemento:" label-for="vendedor-complemento">
              <b-form-input id="vendedor-complemento" type="text" v-model="vendedor.complemento" />
            </b-form-group>
          </b-col>
          <b-col md="4" sm="12">
            <b-form-group label="Bairro:" label-for="vendedor-bairro">
              <b-form-input id="vendedor-bairro" type="text" v-model="vendedor.bairro" required />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Cidade:" label-for="vendedor-cidade">
              <b-form-input id="vendedor-cidade" type="text" v-model="vendedor.cidade" required />
            </b-form-group>
          </b-col>
          <b-col md="1" sm="12">
            <b-form-group label="Estado:" label-for="vendedor-estado">
              <b-form-input id="vendedor-estado" type="text" v-model="vendedor.estado" required />
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
      <b-row>
        <b-col xs="12">
          <b-button variant="primary" v-if="mode === 'save'" @click="save()">Salvar</b-button>
          <b-button variant="warning" v-if="mode === 'edit'" @click="save()">Salvar</b-button>
          <router-link to="/vendedores">
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

export default {
  name: "EditarCliente",
  data: function() {
    return {
      mode: "edit",
      isLoading: false,
      vendedor: {},
      vendedores: [],
      datat: "1995-02-26",
      items: [
        {
          text: "Inicio",
          to: "/"
        },
        {
          text: "Vendedores",
          to: "/vendedores"
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
      // alert(this.vendedor.nomeCliente)
      // const method = this.vendedor.id ? "put" : "post";
      const id = this.vendedor.id; //? `/${this.vendedor.id}` : "";
      axios
        .put(`${baseApiUrl}/vendedores/${id}`, this.vendedor)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.$router.push("/vendedores");
        })
        .catch(showError);
    }
  },
  mounted() {
    const url = `${baseApiUrl}/vendedores/${this.$route.params.id}`;
    axios.get(url).then(res => (this.vendedor = res.data));
    // this.vendedor.dataFundacao = this.vendedor.dataFundacao.moment().format('DD-MM-YYYY')
    // this.vendedor.dataFundacao = this.vendedor.dataFundacao.date.toISOString().slice(0, 10)
    this.carregarVendedores();
  }
};
</script>

<style>
</style>
