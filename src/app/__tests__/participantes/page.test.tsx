import { render, screen } from "@testing-library/react";
import Participantes from "@/app/(dashboard)/participantes/page";
import { getParticipants } from "@/app/services/participants";

jest.mock("next-auth", () => ({
  __esModule: true,
  default: jest.fn(), 
  getServerSession: jest.fn().mockResolvedValue({ user: { token: "fake-token" } }),
}));

jest.mock("@/app/services/participants", () => ({
  getParticipants: jest.fn(),
}));

jest.mock("@/app/(dashboard)/participantes/Form", () => {
  return function MockForm({ initialParticipants }: { initialParticipants: any[] }) {
    return <div data-testid="mock-form">Mock Form with {initialParticipants.length} participants</div>;
  };
});

describe("Página de Participantes", () => {
  const mockParticipants = [{ id: 1, name: "Participant 1" }, { id: 2, name: "Participant 2" }];

  beforeEach(() => {
    (getParticipants as jest.Mock).mockResolvedValue(mockParticipants);
  });

  it("deve renderizar o formulário com os participantes iniciais", async () => {
    const element = await Participantes();
    render(element);
    await screen.findByTestId("mock-form");
    expect(screen.getByTestId("mock-form")).toHaveTextContent("Mock Form with 2 participants");
  });

  it("deve chamar getParticipants com o token correto", async () => {
    const element = await Participantes();
    render(element);
    await screen.findByTestId("mock-form");
    expect(getParticipants).toHaveBeenCalledWith("fake-token");
  });
}); 