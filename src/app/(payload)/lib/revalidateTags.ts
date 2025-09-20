import { revalidateTag } from "next/cache";

export const invalidateCacheTags = (tags: string[]) => {
  const uniqueTags = new Set(tags.filter(Boolean));

  uniqueTags.forEach((tag) => {
    revalidateTag(tag);
  });
};
