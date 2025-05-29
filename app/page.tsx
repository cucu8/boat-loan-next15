import BoatCard from "@/components/BoatCard";
import { BoatCardModel } from "../models/BoatCard";
import Container from "@/components/Container";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/boats");
  const boats = await res.json();

  return (
    <Container>
      {boats &&
        boats.length > 0 &&
        boats.map((boat: BoatCardModel) => (
          <BoatCard key={boat.id} boat={boat} />
        ))}
    </Container>
  );
}
