"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Page = () => {
  const [open, setOpen] = useState(false);
  const items = [
    {
      id: "some-test",
      subtitle: "A long subtitle",
      title: "This is the title",
    },
  ];

  return (
    <div>
      {!open && (
        <motion.div layoutId="item-id" onClick={() => setOpen(true)}>
          <motion.h5 layout>This is a title</motion.h5>
          <motion.h2 layout>A subtitle</motion.h2>
        </motion.div>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="item-id"
            transition={{ duration: 200 }}
            initial={{ translateX: -20 }}
            animate={{ translateX: 0 }}
            exit={{ translateX: -20 }}
            className="bg p-24px rounded-16px text"
          >
            <motion.h5 className="text-heading">This is a title</motion.h5>
            <motion.h2>A subtitle</motion.h2>
            <motion.button onClick={() => setOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page;
