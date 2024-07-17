import Users from "@/app/(payload)/collections/Users";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/journal-entries/?where[slug][equals]=${slug}`,
    {
      headers: {
        Authentication: `${Users.slug} API-Key ${process.env.PAYLOAD_API_KEY}`,
      },
    }
  );

  const content = await req.json();

  return Response.json({ ...content });
}

// export async function GET({ params }: { params: { slug: string } }) {
//   const slug = params.slug;
//   console.log("route", slug);
//   const req = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/api/journal-entries/?where[slug][equals]=${slug}`,
//     {
//       headers: {
//         Authentication: `${Users.slug} API-Key ${process.env.PAYLOAD_API_KEY}`,
//       },
//     }
//   );

//   const content = await req.json();

//   return Response.json({ ...content });
// }
