import { api } from "./api";

type UpdatePasswordData = {
  email: string;
  token: string;
  novaSenha: string;
};

export const recoverPassword = async (email: string) => {
  const response = await api<{
    msg: string;
  }>({
    path: "api/email/recuperar-senha",
    method: "POST",
    body: {
      email,
    },
  });

  if (response?.msg === "Email enviado com sucesso!") return { success: true };

  return { success: false };
};

export const updatePassword = async (body: UpdatePasswordData) => {
  const response = await api<{
    _id: string;
  }>({
    path: "api/email/alterar-senha",
    method: "POST",
    body,
  });

  if (response._id) return { success: true };

  return { success: false };
};
