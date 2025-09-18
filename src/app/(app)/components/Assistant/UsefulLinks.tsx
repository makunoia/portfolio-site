"use client";

import {motion} from "motion/react";
import {ExternalLink} from "lucide-react";
import {UsefulLink} from "@/app/(app)/types";

interface UsefulLinksProps {
  links: UsefulLink[];
}

const UsefulLinks = ({links}: UsefulLinksProps) => {
  if (!links || links.length === 0) return null;

  return (
    <motion.div
      initial={{opacity: 0, y: 8}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.3, ease: "easeOut"}}
      className="mt-12px pt-8px border-t border-subtle"
    >
      <div className="flex flex-wrap gap-4px mt-8px">
        {links.map((link, index) => (
          <motion.a
            key={`${link.resource_link}-${index}`}
            href={link.resource_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4px p-8px rounded-8px border border-[hsl(var(--border-default))] bg-[hsl(var(--primitive-200))] hover:bg-[hsl(var(--primitive-300))] hover:border-[hsl(var(--border-hover))] transition-all duration-200 shadow-sm hover:shadow-md"
            initial={{opacity: 0, y: 8}}
            animate={{opacity: 1, y: 0}}
            transition={{
              duration: 0.2,
              delay: index * 0.05,
              ease: "easeOut",
            }}
          >
            <div className="flex-1 min-w-0">
              <span className="text-body text-[hsl(var(--fg-default))] font-medium truncate block no-underline">
                {link.resource_name}
              </span>
            </div>
            <ExternalLink className="w-12px h-12px text-[hsl(var(--fg-muted))] hover:text-[hsl(var(--fg-default))] transition-colors duration-200 flex-shrink-0" />
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default UsefulLinks;
