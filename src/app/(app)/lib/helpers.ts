import { JournalEntry, Project, ProjectTag } from "payload-types";

//Helper function to group Projects and Journal Entries by year.
export function GroupByYear(items: Project[] | JournalEntry[]) {
  let allYearsArr = [];
  let data = [];
  if (isProject(items[0])) {
    allYearsArr = (items as Project[]).reduce<string[]>((arr, item) => {
      const timeTag = item.year;
      if (!arr.includes(timeTag)) {
        arr.push(timeTag);
      }
      return arr;
    }, []);

    data = allYearsArr.map((year) => ({
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
    }));

    return data;
  } else if (isJournalEntry(items[0])) {
    allYearsArr = (items as JournalEntry[]).reduce<string[]>((arr, item) => {
      const timeTag = new Date((item as JournalEntry).date)
        .getFullYear()
        .toString();
      if (!arr.includes(timeTag)) {
        arr.push(timeTag);
      }
      return arr;
    }, []);

    data = allYearsArr.map((year) => ({
      year: year,
      entries: (items as JournalEntry[]).filter((item) => {
        const yearPublished = new Date(item.date).getFullYear().toString();
        return year === yearPublished;
      }),
    }));
    return data;
  }
}

export const isProject = (props: any): props is Project => {
  return props.type === "project" ? true : false;
};

export const isJournalEntry = (props: any): props is JournalEntry => {
  return props.type === "journal-entry" ? true : false;
};

//Formats Date to MMMM DD, YYYY
export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};
