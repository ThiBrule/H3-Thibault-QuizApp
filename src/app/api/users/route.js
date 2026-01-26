const users = [
    { name: "Mathys" },
    { name: "Emilio" },
    { name: "Thibault" },
    { name: "Olivia" },
    { name: "Alexandre" },
];

export async function GET() {
  return Response.json(users);
}