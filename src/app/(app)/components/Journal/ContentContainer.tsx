import {
  AnimatePresence,
  motion,
  useAnimate,
  usePresence,
} from "framer-motion";
import { ReactNode, Suspense, useEffect } from "react";
import JournalEntrySkeleton from "../Skeletons/JournalEntry";

export default ({ content }: { content: ReactNode }) => {
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (!isPresent) {
      const exitAnimation = async () => {
        await animate(scope.current, { height: 0, opacity: 0 });

        safeToRemove();
      };

      exitAnimation();
    }
  }, [isPresent]);

  return (
    <motion.div
      layout
      ref={scope}
      className="flex flex-col gap-16px px-24px pb-24px"
    >
      <motion.hr layout key="hr" exit={{ opacity: 0 }} />
      <motion.div
        layout="position"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col gap-16px"
      >
        <Suspense fallback={<JournalEntrySkeleton />}>{content}</Suspense>
      </motion.div>
    </motion.div>
  );
};
