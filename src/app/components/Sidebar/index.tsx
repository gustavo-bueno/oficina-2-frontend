"use client";

import { tv } from "tailwind-variants";
import SidebarLink from "./SidebarLink";
import {
  RiFilePaperLine,
  RiGitRepositoryLine,
  RiLogoutBoxRLine,
  RiTeamLine,
} from "@remixicon/react";
import { usePathname } from "next/navigation";
import sidebarLogo from "@/app/assets/img/logo-sidebar.png";
import Image from "next/image";
import { signOut } from "next-auth/react";

import { useSession } from "next-auth/react";

const button = tv({
  slots: {
    container:
      "w-[196px] sticky top-0 h-screen flex flex-col justify-between bg-white shadow-custom p-[12px]",
    listContainer: "flex flex-col gap-[20px]",
    logo: "mb-5 mx-auto object-position-center",
  },
});

const Sidebar = () => {
  const { container, listContainer, logo } = button();
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (route: string) => {
    return pathname.includes(route);
  };

  const isAdmin = session?.user.admin;

  return (
    <aside className={container()}>
      <div>
        x
        <Image
          src={sidebarLogo}
          height={85}
          width={100}
          alt="ELLP Logo"
          className={logo()}
        />
        <nav>
          <ul className={listContainer()}>
            {isAdmin && (
              <li>
                <SidebarLink
                  active={isActive("participantes")}
                  icon={<RiTeamLine />}
                  href="/participantes"
                >
                  Participantes
                </SidebarLink>
              </li>
            )}
            <li>
              <SidebarLink
                active={isActive("certificados")}
                icon={<RiFilePaperLine />}
                href="/certificados"
              >
                Certificados
              </SidebarLink>
            </li>
            <li>
              <SidebarLink
                active={isActive("cursos")}
                icon={<RiGitRepositoryLine />}
                href="/cursos"
              >
                Cursos
              </SidebarLink>
            </li>
          </ul>
        </nav>
      </div>
      <button
        className="text-primary mb-4 pl-2 font-medium text-[18px] flex items-center gap-[12px]"
        onClick={() => signOut()}
      >
        <RiLogoutBoxRLine /> Log out
      </button>
    </aside>
  );
};

export default Sidebar;
