import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const LogoutButton = () => {
  const router = useRouter();

  const logout = () => {
    signOut();
    router.push("/");
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
