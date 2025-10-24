
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

export const hasLowercase = (password: string) => /[a-z]/.test(password);
export const hasUppercase = (password:string) => /[A-Z]/.test(password);
export const hasNumber = (password: string) => /[0-9]/.test(password);
export const hasSpecialChar = (password: string) => /[!@#$%^&*()_+=[\]{};':"\\|,.<>/?~-]/.test(password);

export const loginSchema = Joi.object({
  documento: Joi.string()
    .custom(validarDocumentoJoi, 'CPF/CNPJ custom validation')
    .required()
    .messages({
      'any.required': 'O campo de documento é obrigatório.',
      'any.invalid': 'O CPF ou CNPJ informado é inválido.',
      'string.empty': 'O campo de documento não pode ser vazio.',
    }),

  senha: Joi.string()
    .min(8)
    .required()
    .custom((value, helpers) => {
      if (!hasLowercase(value) || !hasUppercase(value)) {
        return helpers.error('password.noCase');
      }
      if (!hasNumber(value)) {
        return helpers.error('password.noNumber');
      }
      if (!hasSpecialChar(value)) {
        return helpers.error('password.noSpecialChar');
      }
      return value;
    }, 'Password strength validation')
    .messages({
      'any.required': 'A senha é obrigatória.',
      'string.min': 'A senha deve ter no mínimo 8 caracteres.',
      'string.empty': 'A senha não pode ser vazia.',
      'password.noCase': 'A senha deve incluir letras minúsculas e maiúsculas.',
      'password.noNumber': 'A senha deve incluir um número (0-9).',
      'password.noSpecialChar': 'A senha deve incluir um caractere especial (!@#$%^&*).',
    }),
});

//comentários dos códigos da senha//

// funções responsáveis por verificar uma única regra da senha

/*export const hasLowercase = (password: string) => /[a-z]/.test(password);
export const hasUppercase = (password: string) => /[A-Z]/.test(password);
export const hasNumber = (password: string) => /[0-9]/.test(password);
export const hasSpecialChar = (password: string) => /[!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?~-]/.test(password);*/


//É a validação da senha se valida se a senha regras 

/*senha: Joi.string()
    .min(8)
    .required()
    .custom((value, helpers) => {
      if (!hasLowercase(value) || !hasUppercase(value)) {
        return helpers.error('password.noCase');
      }
      if (!hasNumber(value)) {
        return helpers.error('password.noNumber');
      }
      if (!hasSpecialChar(value)) {
        return helpers.error('password.noSpecialChar');
      }
      return value;
    }, 'Password strength validation')
    .messages({
      'any.required': 'A senha é obrigatória.',
      'string.min': 'A senha deve ter no mínimo 8 caracteres.',
      'string.empty': 'A senha não pode ser vazia.',
      'password.noCase': 'A senha deve incluir letras minúsculas e maiúsculas.',
      'password.noNumber': 'A senha deve incluir um número (0-9).',
      'password.noSpecialChar': 'A senha deve incluir um caractere especial (!@#$%^&*).',
    }),*/