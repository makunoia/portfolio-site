import { JournalEntry, Project, ProjectTag } from "payload-types";

//Helper function to group Projects and Journal Entries by year.
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
        projects: (items as Project[])
          .filter((item) => year === item.year) // Filter items based on the year
          .map((item) => {
            // Map the filtered items to the desired structure
            const tag: ProjectTag = item.tag.value as ProjectTag;
            return {
              title: item.title,
              desc: item.desc,
              tag: tag.name,
              slug: item.slug,
            };
          }),
      }))
    : allYearsArr.map((year) => ({
        year: year,
        entries: (items as JournalEntry[]).filter((item) => {
          const yearPublished = new Date(item.date).getFullYear().toString();
          return year === yearPublished;
        }),
      }));

  return data;
}

//Formats Date to MMMM DD, YYYY
export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};
