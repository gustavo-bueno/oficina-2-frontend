import { getServerSession } from "next-auth";
import Form from "./Form";
import { getParticipants } from "@/app/services/participants";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

const Participantes = async () => {
  const session = await getServerSession(authOptions);
  const participants = await getParticipants(session?.user?.token ?? "");

  return <Form initialParticipants={participants} />;
};

export default Participantes;
