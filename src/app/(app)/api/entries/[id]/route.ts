import Users from "@/app/(payload)/collections/Users";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const id = params.slug;
  let content;
  try {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/journal-entries/${id}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authentication: `${Users.slug} API-Key ${process.env.PAYLOAD_API_KEY}`,
        },
      }
    );

    content = await req.json();
  } catch (err) {
    console.log(err);
  }

  console.log(content);
  return Response.json({ content });
}
