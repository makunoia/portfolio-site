import { JournalEntry, Project } from "payload-types";

//Had to make another type since Payload had *.tag.name
type ProjectListItem = {
  title: string;
  desc: string;
  tag: string;
  slug: string;
};

export type FeaturedProject = {
  id: string;
  title: string;
  desc: string;
  slug: string;
  isFeatured: true;
  featuredData: {
    image: {
      url: string;
      alt: string;
    };
    gradientStart: string;
    gradientEnd: string;
  };
};

export type ContentType = Project["sections"];
export type ProjectsByYear = { year: string; projects: ProjectListItem[] }[];
export type JournalEntriesByYear = { year: string; entries: JournalEntry[] }[];
