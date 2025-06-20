import Container from "@/components/Container";
import ErrorComponent from "@/components/Error";
import GetAllBoats from "@/components/GetAllBoats";
import { withFetch } from "@/libs";
import { BoatCardModel } from "@/models";

export default async function Home() {
  const { data: boats, error } = await withFetch<BoatCardModel[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/boats`,
    []
  );

  return (
    <Container>
      {error ? (
        <p className="text-red-500 text-center">
          <ErrorComponent />
        </p>
      ) : (
        <GetAllBoats boats={boats} />
      )}
    </Container>
  );
}
