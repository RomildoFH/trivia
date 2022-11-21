import React from 'react';
import { act, findByTestId, findByText, screen } from '@testing-library/react';
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
  
  it('Verifica se ao renderizar a página game, contém os dados do jogador', async () => {

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

    const userGravatar = await screen.findByTestId('header-profile-picture');
    expect(userGravatar).toBeInTheDocument();

    const userName = screen.getByRole('heading', { level: 3, name: data.VALID_NAME });
    const userScore = screen.getByTestId('header-score');

    expect(userName).toBeInTheDocument();
    expect(userScore).toHaveTextContent('0');
  });

  it('Verifica se ao renderizar a página game, contém apenas uma pergunta, uma categoria e as opções de resposta com seus respectivos test-ids', async () => {

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

    const questionText = await screen.findByTestId('question-text');
    expect(questionText).toBeInTheDocument();

    const questionType = screen.getByTestId('question-category');
    const questionAnswers = screen.getByTestId('answer-options');
    const incorrectAnswer0 = screen.getByTestId('wrong-answer-0');
    const incorrectAnswer1 = screen.getByTestId('wrong-answer-1');
    const incorrectAnswer2 = screen.getByTestId('wrong-answer-2');
    const correctAnswer = screen.getByTestId('correct-answer');

    // const originalArray = [mockQuestions.results[0].correct_answer, ...mockQuestions.results[0].incorrect_answers]
    // const currentArray = [correctAnswer.innerHTML, incorrectAnswer0.innerHTML, incorrectAnswer1.innerHTML, incorrectAnswer2.innerHTML]
    
    expect(questionType).toBeInTheDocument();
    expect(questionAnswers).toBeInTheDocument();
    expect(incorrectAnswer0).toBeInTheDocument();
    expect(incorrectAnswer1).toBeInTheDocument();
    expect(incorrectAnswer2).toBeInTheDocument();
    expect(correctAnswer).toBeInTheDocument();
    // expect(originalArray).not.toEqual(currentArray);
  });

  it('Verifica se ao clicar na resposta incorreta, todos os botões são desabilitados e o ranking permanece em zero', async () => {

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

    const questionText = await screen.findByTestId('question-text');
    expect(questionText).toBeInTheDocument();

    const currScore = screen.getByTestId('header-score')
    expect(currScore).toHaveTextContent('0')

    const incorrectAnswer0 = screen.getByTestId('wrong-answer-0');
    const incorrectAnswer1 = screen.getByTestId('wrong-answer-1');
    const incorrectAnswer2 = screen.getByTestId('wrong-answer-2');
    const correctAnswer = screen.getByTestId('correct-answer');

    userEvent.click(incorrectAnswer0);

    expect(currScore).toHaveTextContent('0');
    expect(incorrectAnswer0).toBeDisabled();
    expect(incorrectAnswer1).toBeDisabled();
    expect(incorrectAnswer2).toBeDisabled();
    expect(correctAnswer).toBeDisabled();
    expect(incorrectAnswer0).toHaveStyle('border: 3px solid red');
    expect(incorrectAnswer1).toHaveStyle('border: 3px solid red');
    expect(incorrectAnswer2).toHaveStyle('border: 3px solid red');
    expect(correctAnswer).toHaveStyle('border: 3px solid rgb(6, 240, 15)');
  });

  it('Verifica se é possível clicar apenas uma vez na alternativa correta e quando clicada aumenta o score no header', async () => {

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

    const questionText = await screen.findByTestId('question-text');
    expect(questionText).toBeInTheDocument();

    const currScore = screen.getByTestId('header-score')
    expect(currScore).toHaveTextContent('0')

    const correctAnswer = screen.getByTestId('correct-answer');

    userEvent.click(correctAnswer);

    expect(currScore).toHaveTextContent('70');
    expect(correctAnswer).toBeDisabled();
  });

  it('Verifica se ao iniciar o jogo o timer inicia em 30 segundos e após zerar, as respostas são desabilitadas e o botão next aparece na tela', async () => {

    jest.resetAllMocks();

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockQuestions),
    });

    jest.useFakeTimers()

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

    const timer = await screen.findByTestId('timer');
    expect(timer).toHaveTextContent('30');
    const questionText = await screen.findByTestId('question-text');
    const correctAnswer = screen.getByTestId('correct-answer');
    expect(questionText).toBeInTheDocument();
    expect(correctAnswer).not.toBeDisabled();

    act(() => jest.advanceTimersByTime(32000));

    expect(timer).toHaveTextContent('0');
    expect(correctAnswer).toBeDisabled();

    const nextBtn = screen.getByTestId('btn-next');
    expect(nextBtn).toBeInTheDocument();

    jest.runOnlyPendingTimers()
    jest.useRealTimers()
    
  });

  it('Verifica se ao clicar no botão next, uma nova pergunta é renderizada na tela e o timer retorna a 30 segundos', async () => {

    jest.resetAllMocks();

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockQuestions),
    });

    jest.useFakeTimers()

    renderWithRouterAndRedux(<App />, {}, '/game');

    const questionTitle = await screen.findByTestId('question-text');
    expect(questionTitle).toBeInTheDocument();

    const correctAnswer = screen.getByTestId('correct-answer');
    userEvent.click(correctAnswer);

    const nextBtn = screen.getByTestId('btn-next');
    userEvent.click(nextBtn);

    const questionTitle2 = await screen.findByText('In Hitman: Blood Money, what is the name of the target in the mission &quot;Death of a Showman&quot;?');
    expect(questionTitle2).toBeInTheDocument();
    
  });

  it('Verifica se ao responder 4 perguntas é redirecionado para a página de feedback', async () => {

    jest.resetAllMocks();

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockQuestions),
    });

    jest.useFakeTimers()

    localStorage.clear();

    const { history } = renderWithRouterAndRedux(<App />, {}, '/game');

    const questionTitle0 = await screen.findByText('Which one of these films are shot entirely in one-take?');
    expect(questionTitle0).toBeInTheDocument();
    const correctAnswer = screen.getByTestId('correct-answer');
    userEvent.click(correctAnswer);

    const nextBtn = screen.getByTestId('btn-next');
    userEvent.click(nextBtn);

    const questionTitle1 = await screen.findByText('In Hitman: Blood Money, what is the name of the target in the mission &quot;Death of a Showman&quot;?');
    expect(questionTitle1).toBeInTheDocument();
    const correctAnswer1 = screen.getByTestId('correct-answer');
    userEvent.click(correctAnswer1);
    const nextBtn1 = screen.getByTestId('btn-next');
    userEvent.click(nextBtn1);

    const questionTitle2 = await screen.findByText('Who was Firestorm&#039;s rival during the original run of UK Robot Wars?');
    expect(questionTitle2).toBeInTheDocument();
    const correctAnswer2 = screen.getByTestId('correct-answer');
    userEvent.click(correctAnswer2);
    const nextBtn2 = screen.getByTestId('btn-next');
    userEvent.click(nextBtn2);

    const questionTitle3 = await screen.findByText('Which part from the JoJo&#039;s Bizarre Adventure manga is about a horse race across America?');
    expect(questionTitle3).toBeInTheDocument();
    const correctAnswer3 = screen.getByTestId('correct-answer');
    userEvent.click(correctAnswer3);
    const nextBtn3 = screen.getByTestId('btn-next');
    userEvent.click(nextBtn3);

    const questionTitle4 = await screen.findByText('Greenland is a part of which kingdom?');
    expect(questionTitle4).toBeInTheDocument();
    const incorrectAnswer4 = screen.getByTestId('wrong-answer-0');
    userEvent.click(incorrectAnswer4);
    const nextBtn4 = screen.getByTestId('btn-next');
    userEvent.click(nextBtn4);

    const result = [{"name":"","assertions":4,"gravatarEmail":"https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e","score":250}]
    const ranking = localStorage.getItem('ranking');
    expect(JSON.parse(ranking)).toEqual(result);

    await history.push('/');

    const inputEmail = await screen.findByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');
    const playBtn = screen.getByRole('button', { name: 'Play' });
    
    userEvent.clear(inputEmail);
    userEvent.clear(inputName);
    userEvent.type(inputEmail, data.VALID_EMAIL);
    userEvent.type(inputName, data.VALID_NAME);
    userEvent.click(playBtn);

    const questionTitle0b = await screen.findByText('Which one of these films are shot entirely in one-take?');
    expect(questionTitle0b).toBeInTheDocument();
    const correctAnswer0b = screen.getByTestId('correct-answer');
    userEvent.click(correctAnswer0b);

    const nextBtnb = screen.getByTestId('btn-next');
    userEvent.click(nextBtnb);

    const questionTitle1b = await screen.findByText('In Hitman: Blood Money, what is the name of the target in the mission &quot;Death of a Showman&quot;?');
    expect(questionTitle1b).toBeInTheDocument();
    const correctAnswer1b = screen.getByTestId('correct-answer');
    userEvent.click(correctAnswer1b);
    const nextBtn1b = screen.getByTestId('btn-next');
    userEvent.click(nextBtn1b);

    const questionTitle2b = await screen.findByText('Who was Firestorm&#039;s rival during the original run of UK Robot Wars?');
    expect(questionTitle2b).toBeInTheDocument();
    const correctAnswer2b = screen.getByTestId('correct-answer');
    userEvent.click(correctAnswer2b);
    const nextBtn2b = screen.getByTestId('btn-next');
    userEvent.click(nextBtn2b);

    const questionTitle3b = await screen.findByText('Which part from the JoJo&#039;s Bizarre Adventure manga is about a horse race across America?');
    expect(questionTitle3b).toBeInTheDocument();
    const correctAnswer3b = screen.getByTestId('correct-answer');
    userEvent.click(correctAnswer3b);
    const nextBtn3b = screen.getByTestId('btn-next');
    userEvent.click(nextBtn3b);

    const questionTitle4b = await screen.findByText('Greenland is a part of which kingdom?');
    expect(questionTitle4b).toBeInTheDocument();
    const correctAnswer4b = screen.getByTestId('correct-answer');
    userEvent.click(correctAnswer4b);
    const nextBtn4b = screen.getByTestId('btn-next');
    userEvent.click(nextBtn4b);

    const result2 = [{"name":"teste da silva","assertions":5,"gravatarEmail":"https://www.gravatar.com/avatar/ce11fce876c93ed5d2a72da660496473","score":290}, {"name":"","assertions":4,"gravatarEmail":"https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e","score":250}]
    const ranking2 = localStorage.getItem('ranking');
    expect(JSON.parse(ranking2)).toEqual(result2);
  });

  it('Verifica se ao acessar o jogo com token inválido é redirecionado para a home', async () => {

    const INVALID_TOKEN = {
      "response_code":0,
      "response_message":"Token Generated Successfully!",
      "token":"INVALID_TOKEN"
    }

    const INVALID_QUESTIONS = {
      "response_code":3,
      "results":[]
    }

    jest.resetAllMocks();

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(INVALID_TOKEN),
    });

    jest.useFakeTimers()

    const { history } = renderWithRouterAndRedux(<App />);
    console.log(history.entries[0].pathname);

    const inputEmail = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');
    const playBtn = screen.getByRole('button', { name: 'Play' });
    
    userEvent.clear(inputEmail);
    userEvent.clear(inputName);
    userEvent.type(inputEmail, data.VALID_EMAIL);
    userEvent.type(inputName, data.VALID_NAME);
    userEvent.click(playBtn);

    // expect(history.entries[0].pathname).toBe('/game');
    // await waitFor(() => expect(history.entries[0].pathname).toBe('/game'))

    expect(global.fetch).toBeCalled();

    console.log(global);

    jest.resetAllMocks();

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(INVALID_QUESTIONS),
    });

    console.log(history.entries[0].pathname);

    // act(() => jest.advanceTimersByTime(32000));

    // const inputEmail2 = screen.getByTestId('input-gravatar-email');
    // expect(inputEmail2.value).toBe('');
    
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  });
});
