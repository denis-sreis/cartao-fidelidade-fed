import { cpf, cnpj } from 'cpf-cnpj-validator';

export const validarDocumento = (documento: string): boolean => {
  const docApenasNumeros = documento.replace(/[^\d]/g, '');

  if (docApenasNumeros.length === 11) {
    return cpf.isValid(docApenasNumeros);
  }
  else if (docApenasNumeros.length === 14) {
    return cnpj.isValid(docApenasNumeros);
  }
  return false;
};