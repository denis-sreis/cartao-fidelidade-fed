export interface PayloadGeracao {
  tipo: 'adicionar';
  pontos: number;
  titulo: string;
  descricao?: string;
}