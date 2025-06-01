import Sidebar from "../components/Sidebar";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ToastContainer } from "react-toastify";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <main className="flex bg-background items-start">
      <Sidebar />
      <section className="max-w-[1280px] w-full p-[16px] mx-auto ">
        {children}
      </section>
      <ToastContainer />
    </main>
  );
};

export default DashboardLayout;
