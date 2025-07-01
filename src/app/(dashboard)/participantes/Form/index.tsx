"use client";

import {
  deleteParticipant,
  getParticipants,
} from "@/app/services/participants";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";
import CreateParticipantModal from "../CreateParticipantModal";
import ParticipantListItem from "@/app/components/ParticipantListItem";
import { LoadingSpinner } from "@/app/components/Loading";

type FormProps = {
  initialParticipants: any[];
};

const Form = ({ initialParticipants }: FormProps) => {
  const [participants, setParticipants] = useState(initialParticipants);
  const [showCreateParticipantModal, setShowCreateParticipantModal] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const token = session?.user.token || "";

  const deleteUser = async (id: string) => {
    try {
      const result = await deleteParticipant(id, token);
      if (result.success) {
        toast.success("Participante apagado com sucesso!");
        setParticipants((currentParticipants) =>
          currentParticipants.filter((participant) => participant._id !== id)
        );
      }
    } catch {
      toast.error("Erro ao apagar participante.");
    }
  };

  const reloadParticipants = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const updated = await getParticipants(token);
      setParticipants(updated);
    } catch {
      toast.error("Erro ao recarregar participantes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="pt-10 max-w-[1000px] min-h-screen mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-black text-[32px] sm:text-[42px] font-bold">Participantes</h1>
          <button
            onClick={() => setShowCreateParticipantModal(true)}
            className="text-primary text-[18px] sm:text-[22px] font-bold border-none p-4 self-start sm:self-auto"
            data-testid="open-create-participant-modal"
          >
            Criar participante
          </button>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <LoadingSpinner />
          </div>
        ) : (
          <ul className="grid gap-4 sm:gap-6 mt-8">
            {participants.map((participant) => (
              <ParticipantListItem
                key={participant._id}
                participant={participant}
                onDelete={deleteUser}
              />
            ))}
          </ul>
        )}
      </div>
      <CreateParticipantModal
        open={showCreateParticipantModal}
        close={() => setShowCreateParticipantModal(false)}
        onSuccess={() => {
          setShowCreateParticipantModal(false);
          reloadParticipants();
        }}
      />
    </>
  );
};

export default Form;
