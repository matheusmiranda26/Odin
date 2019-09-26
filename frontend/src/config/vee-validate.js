import Vue from 'vue'
import VeeValidate from 'vee-validate'
import { Validator } from 'vee-validate'
import { validaCnpj } from '../utils/validadorCnpj.js'
import { validaCpf } from '../utils/validadorCpf.js'

Validator.extend('cnpj', {
    validate (value) {
      return validaCnpj(value);
    },
    getMessage (field) {
      return 'CNPJ inválido';
    }
  });

  Validator.extend('cpf', {
    validate (value) {
      return validaCpf(value);
    },
    getMessage (field) {
      return 'CPF inválido';
    }
  });

Vue.use(VeeValidate, {
    // This is the default
    inject: true,
    // Important to name this something other than 'fields'
    fieldsBagName: 'veeFields',
    // This is not required but avoids possible naming conflicts
    errorBagName: 'veeErrors'
})