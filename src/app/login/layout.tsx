import ellpLogo from "@/app/assets/img/ellp-logo.png";
import Image from "next/image";
import { ToastContainer } from "react-toastify";

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <main className="bg-white h-screen w-screen flex">
        <div className="w-[50%]">{children}</div>
        <section className="min-h-screen w-[50%] flex items-center justify-center bg-[#10B0FB]/30">
          <Image src={ellpLogo} alt="ELLP Logo" height={500} width={500} />
        </section>
      </main>
      <ToastContainer />
    </>
  );
}
