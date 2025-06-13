import Container from "@/components/Container";
import GetAllBoats from "@/components/GetAllBoats";

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/boats`);
  const boats = await res.json();

  return (
    <Container>
      <GetAllBoats boats={boats} />
    </Container>
  );
}
