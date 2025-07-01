export type CertificatePayload = {
  nome: string;
  projeto: string;
  horas: number;
};

export async function generateCertificate(payload: CertificatePayload, token: string): Promise<Blob> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/certificados`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Erro ao gerar certificado");
  return await res.blob();
} 