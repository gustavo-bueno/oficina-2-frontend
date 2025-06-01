"use client";

import DeleteButton from "@/app/components/DeleteButton";
import { deleteParticipant } from "@/app/services/participants";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";
import CreateParticipantModal from "../CreateParticipantModal";

type FormProps = {
  initialParticipants: any[];
};

const Form = ({ initialParticipants }: FormProps) => {
  const [participants, setParticipants] = useState(initialParticipants);
  const [showCreateParticipantModal, setShowCreateParticipantModal] =
    useState(false);
  const [loading, setLoading] = useState(false);

  const deleteUser = async (id: string) => {
  };

  return (
    <>
      <div className="pt-10">
        <div className="flex items-center justify-between">
          <h1 className="text-black text-[42px] font-bold">Participantes</h1>
          <button
            onClick={() => setShowCreateParticipantModal(true)}
            className="text-primary text-[22px] font-bold border-none p-4"
            data-testid="open-create-participant-modal"
          >
            Criar participante
          </button>
        </div>
        <ul className="flex flex-col gap-[36px]">
          {participants.map((participant) => (
            <li
              key={participant._id}
              className="flex items-center justify-between"
            >
              <div className="flex flex-col text-black">
                <p className="font-bold text-[20px]">{participant.nome}</p>
                <p>{participant.email}</p>
              </div>
              <DeleteButton onClick={() => deleteUser(participant._id)} />
            </li>
          ))}
        </ul>
      </div>
      <CreateParticipantModal
        open={showCreateParticipantModal}
        close={() => setShowCreateParticipantModal(false)}
        onSuccess={() => {
          setShowCreateParticipantModal(false);
          // TODO: Implement reload participants
        }}
      />
    </>
  );
};

export default Form;
