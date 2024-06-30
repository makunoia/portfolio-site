"use client";
import Text from "@/components/Text";
import SectionDivider from "@/components/SectionDivider";
import React, { ReactNode, useEffect } from "react";
import Template from "./template";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";

const Layout = ({
  children,
  entries,
}: {
  children: ReactNode;
  entries: ReactNode;
}) => {
  const router = useRouter();
  const section = useSelectedLayoutSegment("entries");

  useEffect(() => {
    console.log(section);
  }, [section]);

  return (
    <>
      <main className="max-w-[500px] mx-auto flex flex-col gap-40px my-[80px]">
        <div className="flex flex-col gap-4px">
          <Text as="h1" size="heading" weight="normal">
            Journal
          </Text>
          <Text
            as="h3"
            size="body-large"
            weight="normal"
            multiline
            className="text-subtle mr-40px"
          >
            Space to share my thoughts, rants, ephiphanies and comments about
            certain things in life.
          </Text>
        </div>

        <SectionDivider header="2024" />

        <div className="flex flex-col gap-16px">
          <Template key="journal-template">
            <>
              {section && <Overlay backHandler={() => router.back()} />}

              <AnimatePresence>
                <motion.div
                  layout
                  exit={{ opacity: 0 }}
                  className={`${
                    section && "fixed z-10 left-0px top-0px bg p-24px border"
                  } w-full text`}
                >
                  <Link href="journal/project">
                    <motion.div layout="position" className="text">
                      <Text
                        size={`${section ? "heading" : "body"}`}
                        className="transition-all ease-in-out duration-300"
                      >
                        Page Title
                      </Text>
                    </motion.div>
                  </Link>

                  {/* {section && (
                    <motion.div layoutId="content">{entries}</motion.div>
                  )} */}
                </motion.div>
              </AnimatePresence>
            </>
          </Template>
        </div>
      </main>
    </>
  );
};

const Overlay = ({ backHandler }: { backHandler: () => void }) => {
  return (
    <AnimatePresence>
      <motion.div
        onClick={() => backHandler()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        exit={{ opacity: 0 }}
        className="absolute bg inset-0px z-10"
      />
    </AnimatePresence>
  );
};

export default Layout;
