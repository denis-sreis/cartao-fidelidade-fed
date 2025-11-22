export interface Premio {
  id: number;
  nome: string;
  pontos: number;
  imagemUrl: string; 
}

export const premios: Premio[] = [
  {
    id: 1,
    nome: 'Suco de Laranja',
    pontos: 4,
    imagemUrl: '/suco-laranja.png' 
  },
  {
    id: 2,
    nome: 'Hambúrguer',
    pontos: 9,
    imagemUrl: '/hamburguer.png' 
  },
  {
    id: 3,
    nome: 'Porção de Batatas',
    pontos: 6,
    imagemUrl: '/porcao-batatas.png' 
  }
];