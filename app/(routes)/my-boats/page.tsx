import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BoatCard from "@/components/BoatCard";
import { BoatCardModel } from "@/models";
import axios from "axios";
import { Container } from "lucide-react";
import { getServerSession } from "next-auth";
import React from "react";

const MyBoats = async () => {
  const session = await getServerSession(authOptions);

  const res = await fetch(
    `http://localhost:7229/api/boats/user/${session?.user?.id}`,
    { cache: "no-store" }
  );

  const boats = await res.json();

  if (!boats || boats.length === 0) {
    return <Container className="text-center">No boats found</Container>;
  }

  return (
    <div className="container mx-auto">
      {boats.map((boat: BoatCardModel) => (
        <BoatCard key={boat.id} boat={boat} />
      ))}
    </div>
  );
};

export default MyBoats;
