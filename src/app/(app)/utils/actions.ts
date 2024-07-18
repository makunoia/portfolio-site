"use server";

import Users from "@/app/(payload)/collections/Users";

export const getContent = async (slug: string) => {
  console.log("API KEY", process.env.PAYLOAD_API_KEY);
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/journal-entries/?where[slug][equals]=${slug}`,
    {
      headers: {
        Authentication: `${Users.slug} API-Key ${process.env.PAYLOAD_API_KEY}`,
      },
    }
  );

  if (req.ok) {
    const data = await req.json();
    console.log(data);
    return Response.json({ data });
  } else {
    const data = await req.json();
    return Response.json({ data });
  }
};
