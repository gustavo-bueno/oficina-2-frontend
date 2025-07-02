import ellpLogo from "@/app/assets/img/ellp-logo.png";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
 
export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (session) redirect("/participantes");
 
  return (
    <>
      <main className="bg-white min-h-screen w-screen flex flex-col lg:flex-row">
        <div className="w-full lg:w-[50%] flex-1 flex lg:pt-[64px] justify-center p-4 lg:p-8">
          {children}
        </div>
        <section className="w-full lg:w-[50%] sm:min-h-[300px] lg:min-h-[500px] flex items-center justify-center bg-[#10B0FB]/30 p-4 lg:p-8">
          <Image 
            src={ellpLogo} 
            alt="ELLP Logo" 
            height={500} 
            width={500} 
            className="w-auto h-auto sm:max-w-[300px] lg:w-full lg:max-w-[500px]"
          />
        </section>
      </main>
      <ToastContainer />
    </>
  );
}