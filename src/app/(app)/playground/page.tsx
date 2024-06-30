"use client";
import { useState } from "react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";

const Page = () => {
  const [open, setOpen] = useState(false);

  return (
    <LayoutGroup>
      <motion.div layoutId="layoutID" onClick={() => setOpen(true)}>
        <motion.h5 layout>This is a title</motion.h5>
        <motion.h2 layout>A subtitle</motion.h2>
      </motion.div>

      {open && (
        <motion.div
          layoutId="layoutID"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg p-24px rounded-16px text"
        >
          <motion.h5 layout className="text-heading">
            This is a title
          </motion.h5>
          <motion.h2 layout>A subtitle</motion.h2>
          <motion.button onClick={() => setOpen(false)} />
        </motion.div>
      )}
    </LayoutGroup>
  );
};

export default Page;
