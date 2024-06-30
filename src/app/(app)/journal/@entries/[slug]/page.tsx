"use client";
import JournalEntries from "../../../sample-payload/journal-entries";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Text from "@/components/Text";
import React from "react";
import Link from "next/link";

type JournalPageProps = {
  title: string;
  date: string;
  desc: string;
  tag: string;
  slug: string;
  content: {
    lead: string;
    paragraph: string;
  }[];
};

const JournalPage = () => {
  const router = useRouter();
  const path = usePathname();
  console.log(path);

  // initial={{ opacity: 0 }}
  // animate={{ opacity: 1 }}
  // exit={{ opacity: 0 }}

  return (
    <AnimatePresence>
      <motion.div
        layoutId="journal-page"
        exit={{ opacity: 0 }}
        className="absolute bg p-40px rounded-16px"
      >
        <motion.div layout>
          <Link href={`journal/test`}>
            <Text
              size="heading"
              className="transition-all duration-600 ease-in"
            >
              Some text
            </Text>
          </Link>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  // return (
  //   <>
  //     <Overlay backHandler={() => router.back()} />
  //     <motion.div
  //       layoutId="entry"
  //       className="cursor-pointer rounded-12px fixed z-10 top-40px left-0px right-0px bg border shadow p-24px w-[540px] mx-auto"
  //     >
  //       <AnimatePresence>
  //         <motion.div
  //           layout
  //           initial={{ opacity: 0 }}
  //           animate={{ opacity: 1 }}
  //           exit={{ opacity: 0 }}
  //           className="flex flex-col gap-16px"
  //         >
  //           <motion.div
  //             layout
  //             layoutId="entry"
  //             className="flex flex-row justify-between"
  //           >
  //             <motion.div
  //               transition={{ duration: 0.2, damping: 100, stiffness: 100 }}
  //               className="flex flex-col gap-4px"
  //             >
  //               <Text
  //                 size="body"
  //                 className=" transition-all duration-600 ease-in"
  //               >
  //                 A Day in Toronto
  //               </Text>
  //               <Text size="caption" className="text-subtle">
  //                 May 5, 2024
  //               </Text>
  //             </motion.div>
  //             <motion.div
  //               layout
  //               transition={{ duration: 0.2 }}
  //               className="flex items-center h-fit rounded-10px px-10px py-12px transition-colors duration-500 ease-in-out bg-subtle/40"
  //             >
  //               <Text size="caption" className="text-subtle text-nowrap">
  //                 Reflection
  //               </Text>
  //             </motion.div>
  //           </motion.div>
  //         </motion.div>
  //       </AnimatePresence>
  //       {/* <motion.div className={`flex flex-col gap-18px`}>
  //         <motion.div
  //           className="flex flex-row justify-between"
  //           exit={{ opacity: 0, translateX: -20 }}
  //         >
  //           <motion.div
  //             layout
  //             transition={{ duration: 0.2, damping: 100, stiffness: 100 }}
  //             className="flex flex-col gap-4px"
  //           >
  //             <Text
  //               size="body"
  //               className=" transition-all duration-600 ease-in"
  //             >
  //               A Day in Toronto
  //             </Text>
  //             <Text size="caption" className="text-subtle">
  //               May 5, 2024
  //             </Text>
  //           </motion.div>
  //           <motion.div
  //             layout
  //             transition={{ duration: 0.2 }}
  //             className="flex items-center h-fit rounded-10px px-10px py-12px transition-colors duration-500 ease-in-out bg-subtle/80"
  //           >
  //             <Text size="caption" className="text-subtle text-nowrap">
  //               Reflection
  //             </Text>
  //           </motion.div>
  //         </motion.div>

  //         <motion.div
  //           layout
  //           initial={{ opacity: 0 }}
  //           animate={{ opacity: 1 }}
  //           exit={{ opacity: 0 }}
  //           className="flex flex-col gap-18px"
  //         >
  //           <hr />
  //           <PageContent content={JournalEntries[0].content} />
  //         </motion.div>
  //       </motion.div> */}
  //     </motion.div>
  //   </>
  // );
};

const PageContent = ({ content }: Pick<JournalPageProps, "content">) => {
  return (
    <motion.article layout className="flex flex-col gap-24px">
      {content.map((block) => (
        <motion.div key={block.lead} className="flex flex-col gap-8px">
          <Text as="h3" weight="medium" className="text w-full">
            {block.lead}
          </Text>
          <Text as="p" multiline className="text w-full">
            {block.paragraph}
          </Text>
        </motion.div>
      ))}
    </motion.article>
  );
};

const Overlay = ({ backHandler }: { backHandler: () => void }) => {
  return (
    // <AnimatePresence>
    <motion.div
      onClick={() => backHandler()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.4 }}
      exit={{ opacity: 0 }}
      className="absolute bg inset-0px z-10"
    />
    // </AnimatePresence>
  );
};

export default JournalPage;
