import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ResetPassword from "@/app/login/reset-password/page";
import { recoverPassword } from "@/app/services/auth";
import { useRouter } from "next/navigation";

jest.mock("@/app/services/auth", () => ({
  recoverPassword: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Página de Recuperação de Senha", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (recoverPassword as jest.Mock).mockClear();
    mockRouter.push.mockClear();
  });

  it("deve renderizar o formulário de recuperação de senha corretamente", () => {
    render(<ResetPassword />);

    expect(screen.getByText("Esqueci minha senha")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByText("Recuperar senha")).toBeInTheDocument();
    expect(screen.getByText("Voltar ao login")).toBeInTheDocument();
  });

  it("deve mostrar erro de validação quando o email estiver vazio", async () => {
    render(<ResetPassword />);

    const submitButton = screen.getByText("Recuperar senha");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Campo obrigatório")).toBeInTheDocument();
    });
  });

  it("deve mostrar erro de validação quando o email for inválido", async () => {
    render(<ResetPassword />);

    const emailInput = screen.getByPlaceholderText("Email");
    await userEvent.type(emailInput, "invalid-email");

    const submitButton = screen.getByText("Recuperar senha");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Email inválido")).toBeInTheDocument();
    });
  });

  it("deve lidar com a recuperação de senha bem-sucedida", async () => {
    (recoverPassword as jest.Mock).mockResolvedValueOnce({ success: true });

    render(<ResetPassword />);

    const emailInput = screen.getByPlaceholderText("Email");
    await userEvent.type(emailInput, "test@example.com");

    const submitButton = screen.getByText("Recuperar senha");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(recoverPassword).toHaveBeenCalledWith("test@example.com");
      expect(mockRouter.push).toHaveBeenCalledWith(
        "/login/validate-password?email=test@example.com",
      );
    });
  });

  it("deve lidar com a falha na recuperação de senha", async () => {
    (recoverPassword as jest.Mock).mockResolvedValueOnce({ success: false });

    render(<ResetPassword />);

    const emailInput = screen.getByPlaceholderText("Email");
    await userEvent.type(emailInput, "test@example.com");

    const submitButton = screen.getByText("Recuperar senha");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(recoverPassword).toHaveBeenCalledWith("test@example.com");
      expect(mockRouter.push).not.toHaveBeenCalled();
    });
  });
});
