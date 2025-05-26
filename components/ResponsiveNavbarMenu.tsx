import React from "react";
import { ThemeChanger } from "./ThemeToggle";
import { navbarMenuItems } from "@/constants";
import NavbarMenuItem from "./NavbarMenuItem";

const ResponsiveNavbarMenu = () => {
  return (
    <div className="md:hidden flex flex-col px-4 pb-4 space-y-2">
      {navbarMenuItems.map(
        (item: { title: string; href: string }, i: number) => (
          <NavbarMenuItem key={i} href={item.href} title={item.title} />
        )
      )}

      <NavbarMenuItem href={"/login"} title={"Login"} />
      <NavbarMenuItem href={"/register"} title={"Register"} />
      <ThemeChanger />
    </div>
  );
};

export default ResponsiveNavbarMenu;
