import Joi from 'joi';
import { cpf, cnpj } from 'cpf-cnpj-validator';

const validarDocumentoJoi = (value: string, helpers: Joi.CustomHelpers) => {
  const docApenasNumeros = value.replace(/[^\d]/g, '');

  const isCpfValido = docApenasNumeros.length === 11 && cpf.isValid(docApenasNumeros);
  const isCnpjValido = docApenasNumeros.length === 14 && cnpj.isValid(docApenasNumeros);

  if (isCpfValido || isCnpjValido) {
    return value;
  }
  return helpers.error('any.invalid');
};

export const loginSchema = Joi.object({
  documento: Joi.string()
    .custom(validarDocumentoJoi, 'CPF/CNPJ custom validation')
    .required()
    .messages({
      'any.required': 'O campo de documento é obrigatório.',
      'any.invalid': 'O CPF ou CNPJ informado é inválido.',
      'string.empty': 'O campo de documento não pode ser vazio.',
    }),
});