import { api } from "./api";

export type Participant = {
  _id: string;
  nome: string;
  email: string;
  admin: boolean;
};

export type CreateParticipantPayload = {
  nome: string;
  dataNascimento: string;
  telefone: string;
  cpf: string;
  rg: string;
  escola: string;
  nomeResponsavel: string;
  telefoneResponsavel: string;
  emailResponsavel: string;
  cpfResponsavel: string;
  endereco: string;
};

export const getParticipants = async (token: string) => {
  try {
    const participants = await api<Participant[]>({
      path: "api/integrantes",
      method: "GET",
      token,
    });
  
    return participants.filter((participant: { admin: boolean }) => !participant.admin);
  } catch (error) {
    console.log(error);
    return [];
  }
 
  };

export const deleteParticipant = async (id: string, token: string) => {
    const participant = await api<{
      msg: string;
    }>({
      path: `api/integrantes/${id}`,
      method: "DELETE",
      token,
    });
  
    if (participant?.msg === "Integrante deletado!") return { success: true };
    return { success: false };
  };

export const createParticipant = async (data: CreateParticipantPayload, token: string) => {
  try {
    const participant = await api<{
      msg: string;
      participant: Participant;
    }>({
      path: "api/integrantes",
      method: "POST",
      body: data,
      token,
    });
    if (participant?.msg === "Integrante criado!") return { success: true, participant: participant.participant };
    return { success: false };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};