import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';
import pokemons from '../data';

describe('Testando a renderização da página Pokémon', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon',
    () => {
      const { history } = renderWithRouter(
        <Pokemon pokemon={ pokemons[0] } isFavorite />,
      );

      const nome = screen.getByText(/Pikachu/i);
      expect(nome).toBeInTheDocument();

      const tipo = screen.getByTestId('pokemon-type');
      expect(tipo).toHaveTextContent(/Electric/i);

      const pesoMedio = screen.getByTestId('pokemon-weight');
      expect(pesoMedio).toHaveTextContent(/Average weight: 6.0 kg/i);

      const imagem = screen.getByRole('img', { name: /Pikachu sprite/i }).src;
      expect(imagem).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');

      const maisDetalhes = screen.getByRole('link', { name: /more details/i });
      expect(maisDetalhes).toBeInTheDocument();
      const hrefMaisDetalhes = screen.getByRole('link', { name: /more details/i }).href;
      expect(hrefMaisDetalhes).toMatch('pokemons/25');
      userEvent.click(maisDetalhes);
      expect(history.location.pathname).toBe('/pokemons/25');

      const favorite = screen.getByAltText(/Pikachu is marked as favorite/i);
      expect(favorite).toBeDefined();

      const imgFavorite = screen
        .getByRole('img', { name: /Pikachu is marked as favorite/i }).src;
      expect(imgFavorite).toMatch(/star-icon.svg/i);
    });
});
