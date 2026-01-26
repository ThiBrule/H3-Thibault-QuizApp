export async function GET(request, { params }) {
  const { userId } = await params;

  const users = [
    { id: 1, name: "Mathys" },
    { id: 2, name: "Emilio" },
    { id: 3, name: "Thibault" },
    { id: 4, name: "Olivia" },
    { id: 5, name: "Alexandre" }
  ];

  const user = users.find((u) => u.id == userId);

  return Response.json({
    user: user,
  });
}


