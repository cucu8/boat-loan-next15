import { getServerSession } from "next-auth";
import ProfileEditForm from "@/components/Forms/ProfileEditForm";
import PasswordEditForm from "@/components/Forms/PasswordEditForm";
import Container from "@/components/Container";
import { UserModel } from "@/models";
import { withFetch } from "@/libs";
import ErrorComponent from "@/components/Error";
import { authOptions } from "@/libs/auth";

const Profile = async () => {
  const session = await getServerSession(authOptions);

  const token = session?.accessToken;
  const id = session?.user?.id;

  const { data: user, error } = await withFetch<UserModel>(
    `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/users/${id}`,
    {} as UserModel,
    token
  );

  return (
    <Container>
      {error ? (
        <p className="text-red-500 text-center">
          <ErrorComponent />
        </p>
      ) : (
        <>
          <ProfileEditForm token={token ?? ""} user={user} />
          <PasswordEditForm token={token ?? ""} id={id ?? 0} />
        </>
      )}
    </Container>
  );
};

export default Profile;
