import Joi from 'joi';
export const NomeValido: Joi.CustomValidator = (value, helpers) => {
  

  const palavras = value.trim().split(/\s+/);

  if (palavras.length == 1) {
    return helpers.error('string.custom', { 
      message: 'Por favor, insira seu nome completo (nome e sobrenome).' 
    });
  }

  return value; 
};