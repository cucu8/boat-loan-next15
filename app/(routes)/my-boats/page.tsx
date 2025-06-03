import React from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { BoatCardModel } from "@/models";
import { getServerSession } from "next-auth";
import Container from "@/components/Container";
import Link from "next/link";
import BoatCardEdit from "@/components/BoatCardEdit";

const MyBoats = async () => {
  const session = await getServerSession(authOptions);

  const res = await fetch(
    `http://localhost:7229/api/boats/user/${session?.user?.id}`,
    { cache: "no-store" }
  );

  const boats = await res.json();

  if (boats.length === 0) {
    return (
      <Container extraClasses="text-center text-bold text-2xl mt-10">
        Henüz eklenmiş bir tekneniz yok. Eklemek için
        <Link href="/add-boat" className="unterline text-blue-500">
          tıklayınız.
        </Link>
      </Container>
    );
  }

  return (
    <Container extraClasses="container mx-auto">
      {boats.map((boat: BoatCardModel) => (
        <BoatCardEdit key={boat.id} boat={boat} />
      ))}
    </Container>
  );
};

export default MyBoats;
