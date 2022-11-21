import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import data from './helpers/constants';
import mockRanking from '../components/helpers/mockRanking';

describe('Página de settings', () => {

  it('Verifica se ao renderizar a página de setting é renderizado o título',  async () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/setting');

    const settingTitle = screen.getByTestId('settings-title');
    expect(settingTitle).toBeInTheDocument();
  });

});
