'use client'

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
 
import { toast } from "react-toastify";
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";
import { updatePassword } from "@/app/services/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
 
const resetPasswordSchema = yup.object().shape({
  token: yup.string().required("Campo obrigatório"),
  password: yup
    .string()
    .required("Campo obrigatório")
    .min(8, "A senha deve ter ao menos 8 caracteres"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas devem coincidir")
    .required("Campo obrigatório"),
});
 
type ResetPasswordForm = {
  token: string;
  password: string;
  confirmPassword: string;
};
 
const ResetPassword = () => {
  const validatePasswordForm = useForm<ResetPasswordForm>({
    resolver: yupResolver(resetPasswordSchema),
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
 
  const email = searchParams.get("email") || "";
  const { errors } = validatePasswordForm.formState;
 
  const onSubmit = async (data: ResetPasswordForm) => {
    setLoading(true);
    try {
      const { success } = await updatePassword({
        email,
        novaSenha: data.password,
        token: data.token,
      });
      if (success) {
        toast.success(
          "Senha alterada com sucesso. Você será redirecionado para a tela de Login em 3 segundos",
        );
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    } catch {
      toast.error(
        "Não foi possível alterar a senha. Tente novamente mais tarde.",
      );
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <FormProvider {...validatePasswordForm}>
      <section className="flex justify-center pt-[64px]">
        <form
          className="w-full max-w-[600px]"
          onSubmit={validatePasswordForm.handleSubmit(onSubmit)}
        >
          <h1 className="text-[42px] font-bold text-black">
            Crie sua senha nova
          </h1>
          <p className="text-[18px] mt-4 mb-10 text-black">
            Utilize o código que você recebeu no seu e-mail para atualizar a sua
            senha.
          </p>
          <div className="flex flex-col w-full gap-5">
            <Input
              placeholder="Código de verificação"
              name="token"
              error={errors.token && errors.token.message}
            />
            <Input
              placeholder="Senha"
              name="password"
              error={errors.password && errors.password.message}
            />
            <Input
              placeholder="Confirmar senha"
              name="confirmPassword"
              error={errors.confirmPassword && errors.confirmPassword.message}
            />
            <div className="flex items-center justify-between">
              <Button loading={loading} className="w-[300px]">
                Alterar senha
              </Button>
            </div>
          </div>
        </form>
      </section>
    </FormProvider>
  );
};
 
export default ResetPassword;