import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EditBoatForm from "@/components/Forms/EditBoatForm";
import { BoatCardModel } from "@/models";
import { getServerSession } from "next-auth";

export default async function EditBoatPage({
  params,
}: {
  params: { boatId?: string };
}) {
  const { boatId } = await params;
  const session = await getServerSession(authOptions);
  const responseCountries = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/countries`
  );
  const coutries = await responseCountries.json();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/boats/${boatId}`);
  const boat: BoatCardModel = await res.json();

  return (
    <div>
      <EditBoatForm
        ownerId={Number(session?.user?.id)}
        countries={coutries}
        token={session?.accessToken!}
        boat={boat}
      />
    </div>
  );
}
