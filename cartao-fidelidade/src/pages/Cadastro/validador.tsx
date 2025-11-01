import Joi from 'joi';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import { TelefoneValido } from './validadorTel';
import { NomeValido } from './validadorNome';

interface ValidationContext {
  userType: 'cliente' | 'empresa';
}

const validarDocumentoJoi = (value: string, helpers: Joi.CustomHelpers) => {
  const context = helpers.prefs.context as ValidationContext;
  const userType = context.userType;

  const docApenasNumeros = value.replace(/[^\d]/g, '');

  if (userType === 'cliente') {
    const isCpfValido = docApenasNumeros.length === 11 && cpf.isValid(docApenasNumeros);
    if (isCpfValido) {
      return value;
    }
    return helpers.error('documento.cpfInvalido'); 
  }

  if (userType === 'empresa') {
    const isCnpjValido = docApenasNumeros.length === 14 && cnpj.isValid(docApenasNumeros);
    if (isCnpjValido) {
      return value;
    }
    return helpers.error('documento.cnpjInvalido');
  }

  return helpers.error('any.invalid');
};

export const loginSchema = Joi.object({
  documento: Joi.string()
    .custom(validarDocumentoJoi, 'CPF/CNPJ custom validation')
    .required()
    .messages({
      'any.required': 'O campo de documento é obrigatório.',
      'string.empty': 'O campo de documento não pode ser vazio.',
      'documento.cpfInvalido': 'O CPF informado é inválido.',
      'documento.cnpjInvalido': 'O CNPJ informado é inválido.'
    }),
    telefone: Joi.string()
    .custom(TelefoneValido, 'validação customizada de telefone')
    .required()
    .messages({
      'any.required': 'O campo de telefone é obrigatório.',
      'string.empty': 'O telefone não pode estar vazio.',
      'string.pattern.base': 'O número de telefone informado é inválido.' 
    }),
    nome: Joi.string()
    .custom(NomeValido, 'validação customizada de telefone')
    .required()
    .messages({
      'any.required': 'O nome é obrigatório.',
      'string.empty': 'O nome não pode estar vazio.',
      'string.custom': 'Por favor, insira seu nome completo (nome e sobrenome).',
      'string.pattern.base': 'Por favor, insira seu nome completo (nome e sobrenome).' 

    }),
});