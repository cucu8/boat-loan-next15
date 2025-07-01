import { signOut } from "next-auth/react";
import React from "react";

const LogoutButton = () => {
  const logout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <button
      onClick={logout}
      className="block w-full md:w-min text-center px-3 py-2 rounded-md bg-red-500 text-base font-medium text-neutral cursor-pointer"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
