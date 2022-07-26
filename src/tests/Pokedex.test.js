import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRoutes from '../renderWithRouter';

describe('Testando a Pokedex', () => {
  test('Teste se a página contém um h2 com o texto Encountered pokémons', () => {
    renderWithRoutes(<App />);
    const heading = (screen
      .getByRole('heading', { name: /Encountered pokémons/i, level: 2 }));
    expect(heading).toBeInTheDocument();
  });
  test(`Teste se é exibido o próximo pokémon da lista quando o botão Próximo pokémon
      é clicado`, () => {
    renderWithRoutes(<App />);

    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();

    const nextPokemon = screen.getByTestId('next-pokemon');
    userEvent.click(nextPokemon);
    expect(nextPokemon).toHaveTextContent(/Próximo/i);

    const charmander = screen.getByText(/Charmander/i);
    expect(charmander).toBeInTheDocument();

    userEvent.click(nextPokemon);
    const caterpie = screen.getByText(/Caterpie/i);
    expect(caterpie).toBeInTheDocument();
  });
  test('Teste se é mostrado apenas um pokémon por vez', () => {
    renderWithRoutes(<App />);
    const everyPokemons = screen.getAllByTestId('pokemon-name');
    expect(everyPokemons).toHaveLength(1);
  });
  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRoutes(<App />);
    const pokemonsTypeBtn = screen.getAllByTestId('pokemon-type-button');
    const all = 7;
    expect(pokemonsTypeBtn).toHaveLength(all);

    const electric = screen.getAllByRole('button', { name: /Electric/i });
    expect(electric[0]).toBeInTheDocument();
    expect(electric).toHaveLength(1);

    const fire = screen.getAllByRole('button', { name: /Fire/i });
    expect(fire[0]).toBeInTheDocument();
    expect(fire).toHaveLength(1);

    const bug = screen.getAllByRole('button', { name: /Bug/i });
    expect(bug[0]).toBeInTheDocument();
    expect(bug).toHaveLength(1);

    const psychic = screen.getAllByRole('button', { name: /Psychic/i });
    expect(psychic[0]).toBeInTheDocument();
    expect(psychic).toHaveLength(1);

    const normal = screen.getAllByRole('button', { name: /Normal/i });
    expect(normal[0]).toBeInTheDocument();
    expect(normal).toHaveLength(1);

    const dragon = screen.getAllByRole('button', { name: /Dragon/i });
    expect(dragon[0]).toBeInTheDocument();
    expect(dragon).toHaveLength(1);
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRoutes(<App />);
    const allButton = screen.getByRole('button', { name: /All/i });
    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);
    expect(allButton).toHaveTextContent(/All/i);
  });
});
