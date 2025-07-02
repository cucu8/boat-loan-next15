"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx"; // tailwind class'larını dinamik yönetmek için

interface NavbarMenuItemProps {
  href: string;
  title: string;
  onClick?: () => void;
}

const NavbarMenuItem = ({ title, href, onClick }: NavbarMenuItemProps) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        "transition font-semibold whitespace-nowrap",
        isActive ? "text-sky-500 " : "text-gray-500 hover:text-sky-400"
      )}
    >
      {title}
    </Link>
  );
};

export default NavbarMenuItem;
