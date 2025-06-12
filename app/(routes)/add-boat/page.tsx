import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AddBoatForm from "@/components/Forms/AddBoatForm";
import { getServerSession } from "next-auth";

const AddBoat = async () => {
  const session = await getServerSession(authOptions);
  const res = await fetch("http://localhost:3000/api/countries");
  const coutries = await res.json();

  return (
    <AddBoatForm
      ownerId={Number(session?.user?.id)}
      countries={coutries}
      token={session?.accessToken!}
    />
  );
};

export default AddBoat;
