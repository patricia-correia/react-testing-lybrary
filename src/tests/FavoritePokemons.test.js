import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../pages/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('testando o conteúdo da pagina', () => {
  test('testa se a pagina exibe uma mensagem, caso não tenha pokémons favoritos',
    async () => {
      renderWithRouter(<FavoritePokemons pokemons={ undefined } />);
      const titleExpect = screen.getByText('No favorite pokemon found');
      expect(titleExpect).toBeInTheDocument();
    });
  test('Testa se são exibidos todos os cards de pokémons favoritados', async () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByText('More details');
    userEvent.click(details);
    const favorito = screen.getByText('Favorite Pokémons');
    const { pathname } = history.location;
    expect(pathname).toBe(`${pathname}`);
    const checkbox = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    userEvent.click(favorito);
    const selectedPokemon = screen.getByText(/pikachu/i);
    expect(selectedPokemon).toBeInTheDocument();
  });
});
