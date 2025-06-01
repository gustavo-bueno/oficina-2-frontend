import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import Modal, { ModalProps } from "@/app/components/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

const createParticipantSchema = yup.object().shape({
  name: yup
    .string()
    .required("Campo obrigatório")
    .min(2, "O campo deve ter no mínimo dois caracteres"),
  age: yup
    .number()
    .typeError("O campo só aceita números")
    .required("Campo obrigatório")
    .min(0, "Idade inválida")
    .max(120, "Idade inválida"),
  phone: yup.string().required("Campo obrigatório"),
  cpf: yup.string().required("Campo obrigatório"),
  rg: yup.string().required("Campo obrigatório"),
  school: yup.string().required("Campo obrigatório"),
  guardianName: yup.string().required("Campo obrigatório"),
  guardianPhone: yup.string().required("Campo obrigatório"),
  guardianEmail: yup
    .string()
    .required("Campo obrigatório")
    .email("Email inválido"),
  guardianCpf: yup.string().required("Campo obrigatório"),
  address: yup.string().required("Campo obrigatório"),
});

export type CreateParticipantForm = yup.InferType<
  typeof createParticipantSchema
>;

type CreateParticipantModalProps = {
  onSuccess: () => void;
} & Omit<ModalProps, "title">;

const CreateParticipantModal = ({
  onSuccess,
  ...props
}: CreateParticipantModalProps) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const createParticipantForm = useForm<CreateParticipantForm>({
    resolver: yupResolver(createParticipantSchema),
  });

  const { errors } = createParticipantForm.formState;
  const token = session?.user.token || "";

  const onSubmit = async (data: CreateParticipantForm) => {
    setLoading(true);
    try {
      // TODO: Implement the API call to create participant
      // const result = await createParticipant(
      //   {
      //     nome: data.name,
      //     idade: data.age,
      //     telefone: data.phone,
      //     cpf: data.cpf,
      //     rg: data.rg,
      //     escola: data.school,
      //     nomeResponsavel: data.guardianName,
      //     telefoneResponsavel: data.guardianPhone,
      //     emailResponsavel: data.guardianEmail,
      //     cpfResponsavel: data.guardianCpf,
      //     endereco: data.address,
      //   },
      //   token,
      // );

      // if (result.success) {
      //   toast.success("Participante criado com sucesso!");
      //   createParticipantForm.reset();
      //   onSuccess();
      // } else {
      //   throw Error("Erro ao criar participante");
      // }
      toast.success("Participante criado com sucesso!");
      createParticipantForm.reset();
      onSuccess();
    } catch {
      toast.error(
        "Não foi possível criar o participante. Tente novamente mais tarde.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal {...props} title="Criar participante">
      <FormProvider {...createParticipantForm}>
        <form
          className="min-h-[350px] flex flex-col justify-between pt-6"
          onSubmit={createParticipantForm.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-[24px] pr-4">
            <Input
              name="name"
              placeholder="Nome"
              error={errors.name && errors.name?.message}
            />
            <Input
              type="number"
              name="age"
              placeholder="Idade"
              error={errors.age && errors.age?.message}
            />
            <Input
              name="phone"
              placeholder="Telefone"
              error={errors.phone && errors.phone?.message}
            />
            <Input
              name="cpf"
              placeholder="CPF"
              error={errors.cpf && errors.cpf?.message}
            />
            <Input
              name="rg"
              placeholder="RG"
              error={errors.rg && errors.rg?.message}
            />
            <Input
              name="school"
              placeholder="Escola/Turma"
              error={errors.school && errors.school?.message}
            />
            <Input
              name="guardianName"
              placeholder="Nome do responsável"
              error={errors.guardianName && errors.guardianName?.message}
            />
            <Input
              name="guardianPhone"
              placeholder="Telefone do responsável"
              error={errors.guardianPhone && errors.guardianPhone?.message}
            />
            <Input
              name="guardianEmail"
              placeholder="Email do responsável"
              error={errors.guardianEmail && errors.guardianEmail?.message}
            />
            <Input
              name="guardianCpf"
              placeholder="CPF do responsável"
              error={errors.guardianCpf && errors.guardianCpf?.message}
            />
            <Input
              name="address"
              placeholder="Endereço"
              error={errors.address && errors.address?.message}
            />
          </div>
          <Button loading={loading} className="max-w-[300px] self-end mt-4" data-testid="submit-create-participant">
            Criar participante
          </Button>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default CreateParticipantModal;
