import { api } from "./api";

export type Participant = {
  _id: string;
  nome: string;
  email: string;
  admin: boolean;
};


export const getParticipants = async (token: string) => {
    const participants = await api<Participant[]>({
      path: "api/usuarios",
      method: "GET",
      token,
    });
  
    return participants.filter((participant: { admin: boolean }) => !participant.admin);
  };

export const deleteParticipant = async (id: string, token: string) => {
    const participant = await api<{
      msg: string;
    }>({
      path: `api/usuarios/${id}`,
      method: "DELETE",
      token,
    });
  
    if (participant?.msg === "Usuário deletado!") return { success: true };
    return { success: false };
  };