import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "@/app/login/page";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// Mock the next/navigation module
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Página de Login", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (signIn as jest.Mock).mockClear();
    mockRouter.push.mockClear();
  });

  it("deve renderizar o formulário de login corretamente", () => {
    render(<Login />);

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
    expect(screen.getByText("Entrar")).toBeInTheDocument();
    expect(screen.getByText("Esqueci minha senha")).toBeInTheDocument();
  });

  it("deve mostrar erro de validação quando os campos estiverem vazios", async () => {
    render(<Login />);

    const submitButton = screen.getByText("Entrar");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Campo obrigatório")).toBeInTheDocument();
    });
  });

  it("deve mostrar erro de validação quando o email for inválido", async () => {
    render(<Login />);

    const emailInput = screen.getByPlaceholderText("Email");
    await userEvent.type(emailInput, "invalid-email");

    const submitButton = screen.getByText("Entrar");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Email inválido")).toBeInTheDocument();
    });
  });

  it("deve lidar com o login bem-sucedido", async () => {
    (signIn as jest.Mock).mockResolvedValueOnce({ error: null });

    render(<Login />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Senha");

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");

    const submitButton = screen.getByText("Entrar");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith("credentials", {
        redirect: false,
        email: "test@example.com",
        password: "password123",
      });
      expect(mockRouter.push).toHaveBeenCalledWith("/participantes");
    });
  });

  it("deve lidar com o login mal-sucedido", async () => {
    (signIn as jest.Mock).mockResolvedValueOnce({
      error: "Invalid credentials",
    });

    render(<Login />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Senha");

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "wrongpassword");

    const submitButton = screen.getByText("Entrar");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith("credentials", {
        redirect: false,
        email: "test@example.com",
        password: "wrongpassword",
      });
      expect(mockRouter.push).not.toHaveBeenCalled();
    });
  });
});
