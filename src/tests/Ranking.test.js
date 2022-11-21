import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import data from './helpers/constants';
import mockRanking from '../components/helpers/mockRanking';

describe('Página de ranking', () => {
  beforeEach(() => {
    localStorage.setItem('ranking', JSON.stringify((mockRanking.sort((a, b) => b.score - a.score))))
  });

  it('Verifica se ao carregar a página de ranking, contem os elementos de gravatar, nome e score de pessoas jogadoras',  async () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/ranking');

    const gravatarRanking0 = screen.getByAltText('gravatar-Nome da Pessoa');
    const nameRanking0 = screen.getByTestId('player-name-0');
    const scoreRanking0 = screen.getByTestId('player-score-0');
    
    expect(gravatarRanking0).toBeInTheDocument();
    expect(nameRanking0).toBeInTheDocument();
    expect(scoreRanking0).toBeInTheDocument();
  });

});
