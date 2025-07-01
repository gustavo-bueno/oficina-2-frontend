"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm, FormProvider } from "react-hook-form";
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";
import { getParticipants, Participant } from "@/app/services/participants";
import { toast } from "react-toastify";
import { generateCertificate } from "@/app/services/certificates";

const Certificados = () => {
  const { data: session } = useSession();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(false);
  const form = useForm<{ nome: string; horas: number; projeto: string }>();
  const { handleSubmit, formState: { errors }, register } = form;

  useEffect(() => {
    const fetchParticipants = async () => {
      if (!session?.user?.token) return;
      const data = await getParticipants(session.user.token);
      setParticipants(data);
    };
    fetchParticipants();
  }, [session]);

  const onSubmit = async (data: { nome: string; horas: number; projeto: string }) => {
    setLoading(true);
    try {
      const blob = await generateCertificate(data, session?.user?.token || "");
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (err) {
      console.log(err)
      toast.error("Não foi possível gerar o certificado. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center bg-gray-50 pt-10 min-h-screen">
      <div className="w-full max-w-[1000px] mx-auto px-4">
        <div className="flex items-center justify-between w-full mb-8">
          <h1 className="text-black text-[42px] font-bold">Certificados</h1>
        </div>
        <FormProvider {...form}>
          <form className="flex flex-col gap-8 w-full" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <select
                {...register("nome", { required: "Selecione um participante" })}
                className="h-[52px] w-full rounded-lg px-[16px] outline-primary py-[12px] text-black bg-input border border-gray-300"
                defaultValue=""
              >
                <option value="" disabled>
                  Selecione um participante
                </option>
                {participants.map((p) => (
                  <option key={p._id} value={p.nome}>
                    {p.nome}
                  </option>
                ))}
              </select>
              {errors.nome && <p className="text-red-600 mt-2">{errors.nome.message as string}</p>}
            </div>
            <div className="flex gap-6 w-full">
              <div className="w-2/3">
                <Input
                  name="projeto"
                  placeholder="Projeto"
                  error={errors.projeto && (errors.projeto.message as string)}
                />
              </div>
              <div className="w-1/3">
                <Input
                  name="horas"
                  placeholder="Horas"
                  type="number"
                  error={errors.horas && (errors.horas.message as string)}
                />
              </div>
            </div>
            <div className="flex justify-end w-full">
              <Button loading={loading} className="mt-4 max-w-[300px]">
                Gerar certificado
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Certificados;
