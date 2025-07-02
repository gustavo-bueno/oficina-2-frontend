import Sidebar from "../components/Sidebar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <main className="flex bg-background items-start">
      <Sidebar />
      <section className="w-full lg:max-w-[1280px] lg:mx-auto p-4 lg:p-[16px]">
        {children}
      </section>
      <ToastContainer />
    </main>
  );
};

export default DashboardLayout;
