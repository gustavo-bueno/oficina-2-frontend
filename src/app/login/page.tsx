"use client";
 
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../components/Input";
import Button from "../components/Button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { useState } from "react";
 
const loginSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Campo obrigatório"),
  password: yup
    .string()
    .min(4, "Mínimo de 8 caracteres")
    .required("Campo obrigatório"),
});
 
type LoginForm = {
  email: string;
  password: string;
};
 
const Login = () => {
  const [loading, setLoading] = useState(false);
  const loginForm = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
  });
  const router = useRouter();
 
  const { errors } = loginForm.formState;
 
  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
 
    if (result?.error) {
      toast.error("Erro ao logar. Verifique as credenciais e tente novamente.");
    } else {
      router.push("/participantes");
    }
    setLoading(false);
  };
 
  return (
    <FormProvider {...loginForm}>
      <section className="flex justify-center w-full">
        <form
          className="w-full max-w-[600px] px-4"
          onSubmit={loginForm.handleSubmit(onSubmit)}
        >
          <h1 className="text-[32px] lg:text-[42px] font-bold text-black">Login</h1>
          <p className="text-[16px] lg:text-[18px] mt-4 mb-8 lg:mb-10 text-black">
            Bem vinda (o) de volta! :)
          </p>
          <div className="flex flex-col w-full gap-5">
            <Input
              placeholder="Email"
              name="email"
              error={errors.email && errors.email.message}
            />
            <Input
              placeholder="Senha"
              name="password"
              type="password"
              error={errors.password && errors.password.message}
            />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <Button loading={loading} className="w-full sm:w-[280px]">
                Entrar
              </Button>
              <Link
                href="/login/reset-password"
                className="font-bold text-secondary text-center sm:text-left"
              >
                Esqueci minha senha
              </Link>
            </div>
          </div>
        </form>
      </section>
    </FormProvider>
  );
};
 
export default Login;