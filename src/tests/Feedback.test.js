import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import App from "../App";
import mockQuestions from "./mock/mockQuestions";

describe("Testes da página de Feedback", () => {
    const nameId = "input-player-name";
    const emailId = "input-gravatar-email";
    const buttonId = "btn-play";

    it("Verificando os elementos da página de Feedback", async () => {
        const { history } = renderWithRouterAndRedux(<App />);
        history.push('/feedback');
        await waitFor(() => {
            expect(screen.getByTestId("header-profile-picture")).toBeInTheDocument();
        });
        expect(screen.getByTestId("header-score")).toBeInTheDocument();
        expect(screen.getByTestId("feedback-text")).toBeInTheDocument();
        expect(screen.getByTestId("feedback-total-score")).toBeInTheDocument();
        expect(screen.getByTestId("feedback-total-question")).toBeInTheDocument();
        expect(screen.getByTestId("btn-play-again")).toHaveTextContent('Play Again');
        expect(screen.getByTestId("btn-ranking")).toHaveTextContent('Ranking');
    });

    it("Verificando o botão 'Ranking' de Feedback", async () => {

        jest.resetAllMocks();

        jest.spyOn(global, 'fetch');
        global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockQuestions),
        });

        const { history } = renderWithRouterAndRedux(<App />);
        history.push('/feedback');
        await waitFor(() => {
            expect(screen.getByTestId("header-profile-picture")).toBeInTheDocument();
        });
        userEvent.click(screen.getByTestId("btn-ranking"));
        await waitFor(() => {
            expect(screen.getByTestId('ranking-title')).toBeInTheDocument();
        });
        expect(history.location.pathname).toBe("/ranking");
    });

    it("Verificando o botão 'Play Again' de Feedback", async () => {

        jest.resetAllMocks();

        jest.spyOn(global, 'fetch');
        global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockQuestions),
        });

        const { history } = renderWithRouterAndRedux(<App />);
        history.push('/feedback');
        await waitFor(() => {
            expect(screen.getByTestId("header-profile-picture")).toBeInTheDocument();
        });
        userEvent.click(screen.getByTestId("btn-play-again"));
        await waitFor(() => {
            expect(screen.getByTestId(testIdName)).toBeInTheDocument();
        });
        expect(history.location.pathname).toBe("/");
    });
});