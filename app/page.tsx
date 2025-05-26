import BoatCard from "@/components/BoatCard";
import { BoatCardModel } from "../models/BoatCard";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/boats");
  const boats = await res.json();

  return (
    <div className="bg-gray-100 px-10 py-4 flex flex-wrap gap-4">
      {boats &&
        boats.length > 0 &&
        boats.map((boat: BoatCardModel) => (
          <BoatCard key={boat.id} boat={boat} />
        ))}
    </div>
  );
}
