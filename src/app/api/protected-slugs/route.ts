import {getPayload} from "payload";
import config from "@payload-config";
import {unstable_cache} from "next/cache";
import {NextResponse} from "next/server";

const getProtectedSlugs = unstable_cache(
  async () => {
    const payload = await getPayload({config});
    const {docs} = await payload.find({
      collection: "projects",
      where: {
        or: [
          {isLocked: {equals: true}},
          {isArchived: {equals: true}},
        ],
      },
      limit: 100,
    });

    return {
      locked: docs.filter((p) => p.isLocked).map((p) => p.slug),
      archived: docs.filter((p) => p.isArchived).map((p) => p.slug),
    };
  },
  ["protectedSlugs"],
  {
    tags: ["protectedSlugs", "collection:projects"],
  }
);

export async function GET() {
  const slugs = await getProtectedSlugs();
  return NextResponse.json(slugs);
}
