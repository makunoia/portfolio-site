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
      className="mt-12px pt-8px border-t border-border-subtle"
    >
      <div className="flex flex-wrap gap-4px mt-8px">
        {links.map((link, index) => (
          <motion.a
            key={`${link.resource_link}-${index}`}
            href={link.resource_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4px py-4px px-8px rounded-8px border transition-all duration-200 shadow-sm hover:shadow-md no-underline"
            style={{
              borderColor: "var(--border-default)",
              backgroundColor: "var(--primitive-200)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--primitive-300)";
              e.currentTarget.style.borderColor = "var(--border-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--primitive-200)";
              e.currentTarget.style.borderColor = "var(--border-default)";
            }}
            initial={{opacity: 0, y: 8}}
            animate={{opacity: 1, y: 0}}
            transition={{
              duration: 0.2,
              delay: index * 0.05,
              ease: "easeOut",
            }}
          >
            <div className="flex-1 min-w-0">
              <span
                className="text-body font-medium truncate block no-underline"
                style={{color: "var(--fg-default)"}}
              >
                {link.resource_name}
              </span>
            </div>
            <ExternalLink
              className="w-12px h-12px transition-colors duration-200 flex-shrink-0"
              style={{color: "var(--fg-subtle)"}}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--fg-default)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--fg-subtle)";
              }}
            />
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default UsefulLinks;
