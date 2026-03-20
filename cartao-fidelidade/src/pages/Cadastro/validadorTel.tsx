import Joi from 'joi';
const telefoneRegex = /^([1-9][1-9])(9)(\d{8})$/;
export const TelefoneValido: Joi.CustomValidator = (value, helpers) => {

  if (!telefoneRegex.test(value)) {
    
    return helpers.error('string.pattern.base', { 
      name: 'telefone', 
      base: 'TELEFONE INVALIDO' 
    });
  }

  return value; 
};