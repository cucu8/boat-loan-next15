"use client";
import React from "react";
import { ThemeChanger } from "./ThemeToggle";
import { navbarMenuItems } from "@/constants";
import NavbarMenuItem from "./NavbarMenuItem";
import { useSession } from "next-auth/react"; // Import signOut and Session type
import LogoutButton from "./LogoutButton";

const ResponsiveNavbarMenu: React.FC = () => {
  const { data: session, status } = useSession(); // Get session data and status
  return (
    <div className="md:hidden flex flex-col px-4 pb-4 space-y-2 gap-4">
      {navbarMenuItems.map(
        (item: { title: string; href: string }, i: number) => (
          <NavbarMenuItem key={i} href={item.href} title={item.title} />
        )
      )}

      {status === "loading" ? (
        // Optionally show a loading state
        <NavbarMenuItem href="#" title="Loading..." />
      ) : session ? (
        // User is logged in
        <>
          <NavbarMenuItem
            href="/profile"
            title={session.user?.name || "Profile"}
          />
          <LogoutButton />
        </>
      ) : (
        // User is not logged in
        <>
          <NavbarMenuItem href={"/login"} title={"Login"} />
          <NavbarMenuItem href={"/register"} title={"Register"} />
        </>
      )}
      <ThemeChanger />
    </div>
  );
};

export default ResponsiveNavbarMenu;
