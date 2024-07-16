import { type ClassValue, clsx } from "clsx";
import { User } from "payload";
import { JournalEntry, Project, ProjectTag } from "payload-types";
import { extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
  override: {
    classGroups: {
      "font-size": [
        "text-caption",
        "text-body",
        "text-body-large",
        "text-lead",
        "text-heading",
        "text-display",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}

//Had to make another type since Payload had *.tag.value.name
type ProjectListItem = {
  title: string;
  desc: string;
  tag: string;
  slug: string;
};

export type ProjectsByYear = { year: string; projects: ProjectListItem[] }[];
export type JournalEntriesByYear = { year: string; entries: JournalEntry[] }[];

export function GroupByYear(
  items: Project[] | JournalEntry[],
  type: "projects" | "journal-entries"
) {
  const areProjects = type === "projects";

  const allYearsArr = items.reduce<string[]>((arr, item) => {
    const timeTag = areProjects
      ? (item as Project).year
      : new Date((item as JournalEntry).date).getFullYear().toString();
    if (!arr.includes(timeTag)) {
      arr.push(timeTag);
    }
    return arr;
  }, []);

  const data = areProjects
    ? allYearsArr.map((year) => ({
        year: year,
        projects: (items as Project[]).map((item) => {
          if (year === item.year) {
            const tag: ProjectTag = item.tag.value as ProjectTag;
            return {
              title: item.title,
              desc: item.desc,
              tag: tag.name,
              slug: item.slug,
            };
          }
        }),
      }))
    : allYearsArr.map((year) => ({
        year: year,
        entries: (items as JournalEntry[]).map((item) => {
          const yearPublished = new Date(item.date).getFullYear().toString();
          if (year === yearPublished) {
            return item;
          }
        }),
      }));

  return data;
}

export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};
