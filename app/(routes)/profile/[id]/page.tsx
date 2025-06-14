import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProfileEditForm from "@/components/Forms/ProfileEditForm";
import PasswordEditForm from "@/components/Forms/PasswordEditForm";
import Container from "@/components/Container";

const Profile = async () => {
  const session = await getServerSession(authOptions);

  const token = session?.accessToken;
  const id = session?.user?.id;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    const user: any = await res.json();

    return (
      <Container>
        <ProfileEditForm token={token ?? ""} user={user} />
        <PasswordEditForm token={token ?? ""} id={id ?? 0} />
      </Container>
    );
  } catch (error: any) {
    console.log(error);
  }
};

export default Profile;
