import EditBoatForm from "@/components/Forms/EditBoatForm";
import { authOptions } from "@/libs/auth";
import { BoatCardModel } from "@/models";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function EditBoatPage({ params }: any) {
  const { boatId } = await params;
  const session = await getServerSession(authOptions);

  const responseCountries = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/countries`
  );
  const coutries = await responseCountries.json();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/boats/${boatId}`);
  const boat: BoatCardModel = await res.json();

  // Check if session and accessToken exist before rendering
  if (!session || !session.user || !session.accessToken) {
    redirect("/login");
  }

  return (
    <div>
      <EditBoatForm
        ownerId={Number(session?.user?.id)}
        countries={coutries}
        token={session?.accessToken}
        boat={boat}
      />
    </div>
  );
}
