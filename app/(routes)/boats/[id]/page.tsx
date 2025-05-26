import ImageCarousel from "@/components/ImageCarousel";
import { BoatCardModel } from "@/models/BoatCard";
import { IdParams } from "@/models/General";

export default async function BoatDetailPage({ params }: IdParams) {
  const { id } = await params;
  const res = await fetch(`http://localhost:3000/api/boats/${id}`);
  const boat: BoatCardModel = await res.json();

  return (
    <div className="p-4">
      <ImageCarousel imageUrls={boat.imageUrls} />
      <h1 className="text-2xl font-bold mb-4">{boat.name}</h1>
      <p>{boat.description}</p>
    </div>
  );
}
