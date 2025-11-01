// Caminho: src/components/ListaPremios/produtosTeste.ts

// 1. Defina e **EXPORTE** a interface 'Premio'.
// Este 'export' é o que corrige o erro da sua imagem.
export interface Premio {
  id: number;
  nome: string;
  pontos: number;
  imagemUrl: string; // URL da imagem principal
}

// 2. Defina e EXPORTE a lista de prêmios
export const premios: Premio[] = [
  {
    id: 1,
    nome: 'Suco de Laranja',
    pontos: 4,
    // Se suas imagens estão na pasta 'public', use o caminho assim:
    imagemUrl: '/suco-laranja.png' 
    // Se você importa as imagens no topo do arquivo (ex: import imgSuco from './suco-laranja.png'),
    // então use a variável: imagemUrl: imgSuco
  },
  {
    id: 2,
    nome: 'Hambúrguer',
    pontos: 9,
    imagemUrl: '/hamburguer.png' // Ajuste o caminho se necessário
  },
  {
    id: 3,
    nome: 'Porção de Batatas',
    pontos: 6,
    imagemUrl: '/porcao-batatas.png' // Ajuste o caminho se necessário
  }
];