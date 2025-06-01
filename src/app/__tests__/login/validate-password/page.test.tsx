import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ResetPassword from "@/app/login/validate-password/page";
import { updatePassword } from "@/app/services/auth";
import { useRouter, useSearchParams } from "next/navigation";

// Mock the auth service
jest.mock("@/app/services/auth", () => ({
  updatePassword: jest.fn(),
}));

// Mock the next/navigation module
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("Página de Validação de Senha", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  const mockSearchParams = {
    get: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
    (updatePassword as jest.Mock).mockClear();
    mockRouter.push.mockClear();
    mockSearchParams.get.mockReturnValue("test@example.com");
  });

  it("deve renderizar o formulário de validação de senha corretamente", () => {
    render(<ResetPassword />);

    expect(screen.getByText("Crie sua senha nova")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Código de verificação"),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirmar senha")).toBeInTheDocument();
    expect(screen.getByText("Alterar senha")).toBeInTheDocument();
  });

  it("deve mostrar erro de validação quando os campos estiverem vazios", async () => {
    render(<ResetPassword />);

    const submitButton = screen.getByText("Alterar senha");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getAllByText("Campo obrigatório")).toHaveLength(3);
    });
  });

  it("deve mostrar erro de validação quando a senha for muito curta", async () => {
    render(<ResetPassword />);

    const passwordInput = screen.getByPlaceholderText("Senha");
    await userEvent.type(passwordInput, "123");

    const submitButton = screen.getByText("Alterar senha");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("A senha deve ter ao menos 8 caracteres"),
      ).toBeInTheDocument();
    });
  });

  it("deve mostrar erro de validação quando as senhas não coincidirem", async () => {
    render(<ResetPassword />);

    const passwordInput = screen.getByPlaceholderText("Senha");
    const confirmPasswordInput = screen.getByPlaceholderText("Confirmar senha");

    await userEvent.type(passwordInput, "password123");
    await userEvent.type(confirmPasswordInput, "password456");

    const submitButton = screen.getByText("Alterar senha");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("As senhas devem coincidir")).toBeInTheDocument();
    });
  });

  it("deve lidar com a atualização de senha bem-sucedida", async () => {
    (updatePassword as jest.Mock).mockResolvedValueOnce({ success: true });

    render(<ResetPassword />);

    const tokenInput = screen.getByPlaceholderText("Código de verificação");
    const passwordInput = screen.getByPlaceholderText("Senha");
    const confirmPasswordInput = screen.getByPlaceholderText("Confirmar senha");

    await userEvent.type(tokenInput, "123456");
    await userEvent.type(passwordInput, "password123");
    await userEvent.type(confirmPasswordInput, "password123");

    const submitButton = screen.getByText("Alterar senha");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(updatePassword).toHaveBeenCalledWith({
        email: "test@example.com",
        token: "123456",
        novaSenha: "password123",
      });
    });

    await waitFor(
      () => {
        expect(mockRouter.push).toHaveBeenCalledWith("/login");
      },
      { timeout: 4000 },
    );
  });

  it("deve lidar com a falha na atualização de senha", async () => {
    (updatePassword as jest.Mock).mockResolvedValueOnce({ success: false });

    render(<ResetPassword />);

    const tokenInput = screen.getByPlaceholderText("Código de verificação");
    const passwordInput = screen.getByPlaceholderText("Senha");
    const confirmPasswordInput = screen.getByPlaceholderText("Confirmar senha");

    await userEvent.type(tokenInput, "123456");
    await userEvent.type(passwordInput, "password123");
    await userEvent.type(confirmPasswordInput, "password123");

    const submitButton = screen.getByText("Alterar senha");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(updatePassword).toHaveBeenCalledWith({
        email: "test@example.com",
        token: "123456",
        novaSenha: "password123",
      });
      expect(mockRouter.push).not.toHaveBeenCalled();
    });
  });

  it("deve lidar com erro na atualização de senha", async () => {
    (updatePassword as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

    render(<ResetPassword />);

    const tokenInput = screen.getByPlaceholderText("Código de verificação");
    const passwordInput = screen.getByPlaceholderText("Senha");
    const confirmPasswordInput = screen.getByPlaceholderText("Confirmar senha");

    await userEvent.type(tokenInput, "123456");
    await userEvent.type(passwordInput, "password123");
    await userEvent.type(confirmPasswordInput, "password123");

    const submitButton = screen.getByText("Alterar senha");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(updatePassword).toHaveBeenCalledWith({
        email: "test@example.com",
        token: "123456",
        novaSenha: "password123",
      });
      expect(mockRouter.push).not.toHaveBeenCalled();
    });
  });

  it("deve lidar com email não fornecido nos parâmetros", async () => {
    mockSearchParams.get.mockReturnValue(null);

    render(<ResetPassword />);

    const tokenInput = screen.getByPlaceholderText("Código de verificação");
    const passwordInput = screen.getByPlaceholderText("Senha");
    const confirmPasswordInput = screen.getByPlaceholderText("Confirmar senha");

    await userEvent.type(tokenInput, "123456");
    await userEvent.type(passwordInput, "password123");
    await userEvent.type(confirmPasswordInput, "password123");

    const submitButton = screen.getByText("Alterar senha");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(updatePassword).toHaveBeenCalledWith({
        email: "",
        token: "123456",
        novaSenha: "password123",
      });
    });
  });
});
