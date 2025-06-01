import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import React from "react";

const AddBoat = async () => {
  const session = await getServerSession(authOptions);
  console.log("ID", session?.user.id);
  console.log("NAME:", session?.user.name);
  console.log("TOKEN:", session?.accessToken);

  return <div>AddBoat</div>;
};

export default AddBoat;
