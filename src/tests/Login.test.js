import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import data from './helpers/constants';
import mockToken from './mock/mockToken';
import mockQuestions from './mock/mockQuestions';

describe('Página de login', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockToken),
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
  it('Verifica se ao carregar a home, ela contém os inputs de email e nome', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');

    expect(inputEmail).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
  });

  it('Verifica se o botão Play inicialmente está desabilitado e é habilitado após preenchimento', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');
    const playBtn = screen.getByRole('button', { name: 'Play' });
    const settingBtn = screen.getByRole('button', { name: 'Setting' });

    expect(playBtn).toBeInTheDocument();
    expect(settingBtn).toBeInTheDocument();
    expect(playBtn).toBeDisabled();

    userEvent.type(inputEmail, data.INVALID_EMAIL);
    expect(playBtn).toBeDisabled();

    userEvent.type(inputName, data.INVALID_NAME);
    expect(playBtn).toBeDisabled();

    userEvent.clear(inputEmail);
    userEvent.clear(inputName);
    userEvent.type(inputEmail, data.VALID_EMAIL);
    expect(playBtn).toBeDisabled();
    userEvent.type(inputEmail, data.INVALID_NAME);
    expect(playBtn).toBeDisabled();

    userEvent.clear(inputEmail);
    userEvent.clear(inputName);
    userEvent.type(inputEmail, data.INVALID_EMAIL);
    expect(playBtn).toBeDisabled();
    userEvent.type(inputEmail, data.VALID_NAME);
    expect(playBtn).toBeDisabled();

    userEvent.clear(inputEmail);
    userEvent.clear(inputName);
    userEvent.type(inputEmail, data.VALID_EMAIL);
    expect(playBtn).toBeDisabled();
    userEvent.type(inputName, data.VALID_NAME);
    expect(playBtn).not.toBeDisabled();
  });

  it('Verifica se ao clicar no botão Play a função fetch é chamada e é feito redirecionamento para pagina Game', async () => {

    jest.resetAllMocks();

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockQuestions),
    });

    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');
    const playBtn = screen.getByRole('button', { name: 'Play' });
    
    userEvent.clear(inputEmail);
    userEvent.clear(inputName);
    userEvent.type(inputEmail, data.VALID_EMAIL);
    userEvent.type(inputName, data.VALID_NAME);
    userEvent.click(playBtn);

    expect(global.fetch).toBeCalled();

    const questionTitle = await screen.findByTestId('question-text');
    expect(questionTitle).toBeInTheDocument();
  });
});
