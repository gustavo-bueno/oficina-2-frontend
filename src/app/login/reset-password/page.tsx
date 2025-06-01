"use client";
 
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
 
import { toast } from "react-toastify";
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";
import Link from "next/link";
import { recoverPassword } from "@/app/services/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
 
const resetPasswordSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Campo obrigatório"),
});
 
type ResetPasswordForm = {
  email: string;
};
 
const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const resetPasswordForm = useForm<ResetPasswordForm>({
    resolver: yupResolver(resetPasswordSchema),
  });
  const { errors } = resetPasswordForm.formState;
  const router = useRouter();
 
  const onSubmit = async (data: ResetPasswordForm) => {
    setLoading(true);
    try {
      const { success } = await recoverPassword(data.email);
      if (success) {
        toast.success(
          "Senha alterado com sucesso! Você será redirecionado para a tela de Login em 3 segundos",
        );
        router.push(`/login/validate-password?email=${data.email}`);
      } else {
        throw Error("Erro ao mandar email");
      }
    } catch {
      toast.error(
        "Não possível enviar o email de recuperação. Verique o email ou tente novamente mais tarde.",
      );
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <FormProvider {...resetPasswordForm}>
      <section className="flex justify-center pt-[64px]">
        <form
          className="w-full max-w-[600px]"
          onSubmit={resetPasswordForm.handleSubmit(onSubmit)}
        >
          <h1 className="text-[42px] font-bold text-black">
            Esqueci minha senha
          </h1>
          <p className="text-[18px] mt-4 mb-10 text-black">
            Digite o email que você tem cadastrado aqui.
          </p>
          <div className="flex flex-col w-full gap-5">
            <Input
              placeholder="Email"
              name="email"
              error={errors.email && errors.email.message}
            />
            <div className="flex items-center justify-between">
              <Button loading={loading} className="w-[300px]">
                Recuperar senha
              </Button>
              <Link href="/login" className="font-bold text-primary">
                Voltar ao login
              </Link>
            </div>
          </div>
        </form>
      </section>
    </FormProvider>
  );
};
 
export default ResetPassword;
 