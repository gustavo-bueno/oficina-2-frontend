"use client";

import { tv } from "tailwind-variants";
import SidebarLink from "./SidebarLink";
import {
  RiFilePaperLine,
  RiGitRepositoryLine,
  RiLogoutBoxRLine,
  RiTeamLine,
  RiMenuLine,
} from "@remixicon/react";
import { usePathname } from "next/navigation";
import sidebarLogo from "@/app/assets/img/logo-sidebar.png";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { useSession } from "next-auth/react";

const button = tv({
  slots: {
    container:
      "fixed lg:relative lg:w-[196px] w-full lg:sticky top-0 h-screen flex flex-col justify-between bg-white shadow-custom p-[12px] z-50 transform transition-transform duration-300 ease-in-out",
    listContainer: "flex flex-col gap-[20px]",
    logo: "mb-5 mx-auto object-position-center",
    mobileOverlay: "fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden",
    mobileMenuButton: "lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg",
  },
});

const Sidebar = () => {
  const { container, listContainer, logo, mobileOverlay, mobileMenuButton } = button();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (route: string) => {
    return pathname.includes(route);
  };

  const isAdmin = session?.user.admin;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <button
        className={mobileMenuButton()}
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <RiMenuLine className="w-6 h-6" />
      </button>

      {isMobileMenuOpen && (
        <div className={mobileOverlay()} onClick={closeMobileMenu} />
      )}

      <aside className={container({
        className: isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      })}>
        <div>
          <Image
            src={sidebarLogo}
            height={85}
            width={100}
            alt="ELLP Logo"
            className={logo()}
          />
          <nav>
            <ul className={listContainer()}>
              <li>
                <SidebarLink
                  active={isActive("participantes")}
                  icon={<RiTeamLine />}
                  href="/participantes"
                  onClick={closeMobileMenu}
                >
                  Participantes
                </SidebarLink>
              </li>
              <li>
                <SidebarLink
                  active={isActive("certificados")}
                  icon={<RiFilePaperLine />}
                  href="/certificados"
                  onClick={closeMobileMenu}
                >
                  Certificados
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
    </>
  );
};

export default Sidebar;
