import {
  BooleanItem,
  InfoItem,
  JournalEntry,
  MediaItem,
  Project,
  Showcase,
  URLItem,
} from "payload-types";

//Had to make another type since Payload had *.tag.name
type ProjectListItem = {
  title: string;
  desc: string;
  tag: string;
  slug: string;
} & (
  | { locked: true; codename: string }
  | { locked: false; codename?: undefined }
);

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

// Lexical Root.Children
export type LexicalBlock = (
  | {
      type: "paragraph" | "quote";
      children?: {
        text: string;
        type: "text" | "linebreak";
      }[];
    }
  | {
      type: "block";
      fields: Showcase;
    }
  | {
      type: "heading";
      tag: "h1" | "h3";
      children?: {
        text: string;
        type: "text" | "linebreak";
      }[];
    }
  | { type: "horizontalrule" }
)[];

export type AboutMeSection = {
  title: string;
  layout: "stack" | "two-col";
  content: (InfoItem | BooleanItem | MediaItem | URLItem)[];
  id?: string | null;
};

export const LexicalStyleMap = {
  1: "bold",
  8: "underlined",
  9: "bold and underlined",
  10: "italic",
  11: "italic and bold",
};
