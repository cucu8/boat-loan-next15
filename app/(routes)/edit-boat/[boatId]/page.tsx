export default async function EditBoatPage({
  params,
}: {
  params: { boatId?: string };
}) {
  const { boatId } = await params;
  console.log(boatId);
  return (
    <div>
      <h1>Edit Boat Page (Server Side)</h1>
      <p>Boat ID: {boatId}</p>
    </div>
  );
}
