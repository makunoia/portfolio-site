import Text from "@/components/Text";
import Showcase from "@/components/Showcase";
import InfoItem from "@/components/AboutMe/InfoItem";
import BooleanItem from "@/components/AboutMe/BooleanItem";
import MediaItem from "@/components/AboutMe/MediaItem";

import {Asset, JournalEntry, Project, ProjectTag} from "payload-types";
import {AboutMeSection, LexicalBlock} from "@/types";
import {MouseEventHandler} from "react";
import EntrySection from "../components/Journal/EntrySection";

//Mouse Event handler for List Items on Projects and Journal page
export const handleMouseEvents: MouseEventHandler<HTMLAnchorElement> = (
  event
) => {
  event.stopPropagation();
  const items = document.getElementsByClassName("page-list-item");
  const target = event.currentTarget as HTMLElement;

  if (event.type === "mouseenter") {
    for (let i = 0; i < items.length; i++) {
      const item = items[i] as HTMLElement;
      if (item === target) {
        item.classList.remove("not-hovered-item");
      } else {
        item.classList.add("not-hovered-item");
      }
    }
  } else if (event.type === "mouseleave") {
    for (let i = 0; i < items.length; i++) {
      const item = items[i] as HTMLElement;
      item.classList.remove("not-hovered-item");
    }
  }
};

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
          const tag: ProjectTag = item.tag as ProjectTag;
          return {
            id: item.id,
            title: item.title,
            desc: item.desc,
            tag: tag.name,
            slug: item.slug,
            locked: item.isLocked,
            codename: item.lockedData?.codename,
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
  return props?.type === "project" ? true : false;
};

export const isJournalEntry = (props: any): props is JournalEntry => {
  return props?.type === "journal-entry" ? true : false;
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

export const extractLexicalHeading = (
  blocks: LexicalBlock,
  target: "h1" | "h3" = "h1"
) => {
  if (!Array.isArray(blocks) || blocks.length === 0) {
    return {heading: null as string | null, rest: [] as LexicalBlock};
  }

  let heading: string | null = null;
  const rest = blocks.filter((node) => {
    if (!heading && node.type === "heading" && node.tag === target) {
      heading = node.children
        ?.map((child) => child.text)
        .join("")
        .trim() || null;
      return false;
    }

    return true;
  }) as LexicalBlock;

  return {heading, rest};
};

export const renderLexicalContent = (root: LexicalBlock) => {
  return root
    ? root.map((child, i) => {
        const type = child.type;
        if (type === "paragraph" || type === "quote" || type === "heading") {
          const content = child.children;

          switch (type) {
            case "heading":
              return content?.map((block, i) =>
                child.tag === "h1" ? (
                  <Text
                    as="h1"
                    size="heading"
                    key={`type-${i}-${child.tag}`}
                    className="max-sm:text-[1.5rem] max-sm:leading-[2.2rem]"
                  >
                    {block.text}
                  </Text>
                ) : (
                  <Text
                    as="h3"
                    size="body-large"
                    weight="normal"
                    multiline
                    className="text-fg-subtle"
                    key={`type-${i}-${child.tag}`}
                  >
                    {block.text}
                  </Text>
                )
              );

            case "paragraph":
              return content?.length ? (
                <div className="flex flex-col" key={`type-${child.type}-${i}`}>
                  {content?.map((block, i) =>
                    block.text ? (
                      <Text
                        as="p"
                        size="body"
                        className="text-fg-subtle"
                        multiline
                        key={`type-${block.type}-${i}`}
                      >
                        {block.text}
                      </Text>
                    ) : null
                  )}
                </div>
              ) : null;

            case "quote":
              return (
                <div
                  className="flex flex-col gap-8px pl-8px border-l-2"
                  key={`type-${child.type}-${i}`}
                >
                  {content?.map((block, i) =>
                    i !== content.length - 1 ? (
                      block.type === "text" ? (
                        <Text
                          as="p"
                          size="body"
                          className="bold"
                          key={`type-${block.type}-${i}`}
                        >
                          {block.text}
                        </Text>
                      ) : null
                    ) : (
                      <Text
                        as="p"
                        size="body"
                        className="italic"
                        key={`type-${block.type}-${i}`}
                      >
                        {block.text}
                      </Text>
                    )
                  )}
                </div>
              );
          }
        } else if (type === "block") {
          const blockType = child.fields.blockType;

          switch (blockType) {
            case "showcase":
              return (
                <Showcase
                  image={child.fields.image}
                  title={child.fields.title}
                  desc={child.fields.desc}
                  tag={child.fields.tag}
                  key={`type-${blockType}-${i}}`}
                />
              );

            case "entry-section":
              return (
                <EntrySection
                  lead={child.fields.lead}
                  content={child.fields.content}
                  key={`type-${blockType}-${i}}`}
                />
              );
          }
        } else if (type === "horizontalrule") {
          return <hr key={`type-${type}-${i}`} />;
        }
      })
    : null;
};

export const renderSections = (data: AboutMeSection) => {
  return data
    ? data.content?.map((content) => {
        const type = content.blockType;

        switch (type) {
          case "info-item":
            return (
              <InfoItem
                label={content.label}
                desc={content.desc}
                tag={content.tag as string}
                image={content.image as Asset}
                key={content.id}
              />
            );

          case "boolean-item":
            return (
              <BooleanItem
                label={content.label}
                done={content.value}
                key={content.id}
              />
            );

          case "media-item":
            return (
              <MediaItem
                label={content.label}
                desc={content.genre}
                image={content.poster as Asset}
                tag={content.tag as string}
                key={content.id}
              />
            );
        }
      })
    : null;
};

export const AnimationVariants = {
  section: {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        staggerChildren: 0.2,
      },
    },
  },

  container: {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        delayChildren: 0.2,
        staggerChildren: 0.2,
      },
    },
  },

  item: {
    hidden: {
      opacity: 0,
      filter: "blur(20px)",
      y: 50,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      animate: {
        type: "spring",
        stiffness: 400,
        damping: 80,
      },
      transition: {
        duration: 0.6,
      },
    },
  },
};
