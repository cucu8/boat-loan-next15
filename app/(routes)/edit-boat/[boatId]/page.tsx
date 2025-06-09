import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EditBoatForm from "@/components/EditBoatForm";
import { BoatCardModel } from "@/models";
import { getServerSession } from "next-auth";

export default async function EditBoatPage({
  params,
}: {
  params: { boatId?: string };
}) {
  const { boatId } = await params;
  const session = await getServerSession(authOptions);
  const responseCountries = await fetch("http://localhost:3000/api/countries");
  const coutries = await responseCountries.json();
  const res = await fetch(`http://localhost:3000/api/boats/${boatId}`);
  const boat: BoatCardModel = await res.json();
  console.log("BOAT", boat);
  return (
    <div>
      <h1>Edit Boat Page (Server Side)</h1>
      <p>Boat ID: {JSON.stringify(boat)}</p>
      <EditBoatForm
        ownerId={Number(session?.user?.id)}
        countries={coutries}
        token={session?.accessToken!}
        boat={boat}
      />
    </div>
  );
}
