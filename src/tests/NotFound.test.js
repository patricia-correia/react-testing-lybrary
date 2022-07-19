import React from 'react';
import { screen, render } from '@testing-library/react';
import NotFound from '../pages/NotFound';

describe('', () => {
  test('o titulo deve está na tela em um h2', () => {
    render(<NotFound />);
    expect(screen
      .getByRole('heading', { name: /Page requested not found/i, level: 2 }))
      .toBeInTheDocument();
  });
  test(' testa se há uma imagem renderizada na tela', () => {
    render(<NotFound />);
    const imagem = screen
      .getByAltText(/Pikachu crying because the page requested was not found/i);
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(imagem).toHaveAttribute('src', url);
  });
});
