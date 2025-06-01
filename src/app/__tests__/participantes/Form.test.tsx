import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Form from "@/app/(dashboard)/participantes/Form";
import { toast } from "react-toastify";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn().mockReturnValue({ data: { user: { token: "fake-token" } } }),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("Form Component", () => {
  const initialParticipants = [
    { _id: "1", nome: "Participant 1", email: "participant1@example.com" },
    { _id: "2", nome: "Participant 2", email: "participant2@example.com" },
  ];

  it("renders the form with initial participants", () => {
    render(<Form initialParticipants={initialParticipants} />);
    expect(screen.getByText("Participantes")).toBeInTheDocument();
    expect(screen.getByText("Participant 1")).toBeInTheDocument();
    expect(screen.getByText("Participant 2")).toBeInTheDocument();
  });

  it("opens the create participant modal when the button is clicked", () => {
    render(<Form initialParticipants={initialParticipants} />);
    fireEvent.click(screen.getByTestId("open-create-participant-modal"));
    expect(screen.getByRole("heading", { name: "Criar participante" })).toBeInTheDocument();
  });

  it("closes the modal and shows success toast when form is submitted", async () => {
    render(<Form initialParticipants={initialParticipants} />);
    fireEvent.click(screen.getByTestId("open-create-participant-modal"));

    const nameInput = screen.getByPlaceholderText("Nome");
    const ageInput = screen.getByPlaceholderText("Idade");
    const phoneInput = screen.getByPlaceholderText("Telefone");
    const cpfInput = screen.getByPlaceholderText("CPF");
    const rgInput = screen.getByPlaceholderText("RG");
    const schoolInput = screen.getByPlaceholderText("Escola/Turma");
    const guardianNameInput = screen.getByPlaceholderText("Nome do responsável");
    const guardianPhoneInput = screen.getByPlaceholderText("Telefone do responsável");
    const guardianEmailInput = screen.getByPlaceholderText("Email do responsável");
    const guardianCpfInput = screen.getByPlaceholderText("CPF do responsável");
    const addressInput = screen.getByPlaceholderText("Endereço");

    fireEvent.change(nameInput, { target: { value: "Test Participant" } });
    fireEvent.change(ageInput, { target: { value: "25" } });
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    fireEvent.change(cpfInput, { target: { value: "12345678901" } });
    fireEvent.change(rgInput, { target: { value: "123456789" } });
    fireEvent.change(schoolInput, { target: { value: "Test School" } });
    fireEvent.change(guardianNameInput, { target: { value: "Test Guardian" } });
    fireEvent.change(guardianPhoneInput, { target: { value: "0987654321" } });
    fireEvent.change(guardianEmailInput, { target: { value: "guardian@example.com" } });
    fireEvent.change(guardianCpfInput, { target: { value: "09876543210" } });
    fireEvent.change(addressInput, { target: { value: "Test Address" } });

    const submitButton = screen.getByTestId("submit-create-participant");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Participante criado com sucesso!");
    });
  });
}); 