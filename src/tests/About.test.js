import React from 'react';
import { screen, render } from '@testing-library/react';
import About from '../pages/About';

describe('testando o conteúdo da página About', () => {
  test('o titulo deve está na tela em um h2', () => {
    render(<About />);
    expect(screen.getByRole('heading', { name: /About Pokédex/i, level: 2 }))
      .toBeInTheDocument();
  });
  test('testa a quantidade de paragrafos que é renderizado na pagina', () => {
    render(<About />);
    //  const paragrafo = (screen.getAllByRole('paragraph'));
    //  expect(paragrafo).toHaveLength(2);

    const part1 = (/This application ... /i);
    const part2 = (/One can filter Pokémons by type.../i);
    const textAbout = screen.getByText(part1 && part2);
    expect(textAbout).toBeInTheDocument();
  });
  test(' testa se há uma imagem renderizada na tela', () => {
    render(<About />);
    const imagem = screen.getByAltText(/pokédex/i);
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(imagem).toHaveAttribute('src', url);
  });
});
