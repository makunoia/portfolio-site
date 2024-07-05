"use client";
import Text from "@/app/(app)/components/Text";
import { motion, useAnimate, usePresence } from "framer-motion";
import { headers } from "next/headers";
import React, { Suspense, useEffect } from "react";

// TO DO
// Loading State
// Align Props with PayLoad

const JournalPage = () => {
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (isPresent) {
      const enterAnimation = async () => {
        await animate(scope.current, { height: 0 });
        await animate(scope.current, { height: "100%" });
      };
      enterAnimation();
    } else {
      const exitAnimation = async () => {
        await animate(scope.current, { height: "100%" });
        await animate(scope.current, { height: 0 });
        safeToRemove();
      };

      exitAnimation();
    }
  }, [isPresent]);

  return (
    <motion.div
      layout
      className="flex flex-col gap-24px min-h-[300px]"
      ref={scope}
    >
      <motion.div layout className="flex flex-col gap-8px">
        <Text as="h3" size="body-large" weight="medium">
          Header
        </Text>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi
        perferendis quasi reprehenderit consequatur dolores possimus id error!
        Sint qui ab, cupiditate voluptates quam, eaque, aperiam voluptas at
        incidunt dignissimos aliquid tempora magnam unde. Atque voluptates
        inventore temporibus quia maxime magnam officia dolore alias
        dignissimos. Assumenda veritatis nisi aliquid omnis enim! Nam officiis
        itaque delectus dolor, distinctio officia sapiente id necessitatibus
        inventore corrupti corporis reprehenderit omnis ut beatae exercitationem
        ratione porro tenetur consectetur suscipit? Non, quam et labore rerum
        quis saepe nobis, optio eveniet in veritatis harum facere reprehenderit
        expedita qui provident mollitia officia culpa quae, numquam magni atque!
        Ab iusto, repellat doloremque deleniti iste vel natus voluptatem et
        cupiditate nulla enim! In, molestiae aperiam. Dolore fugit itaque
        impedit quia voluptate maiores quod cupiditate laboriosam praesentium
        hic cum facere nisi aut, accusantium, illo ratione iure illum tempore
        deserunt? Dignissimos nobis tenetur laudantium vero eos blanditiis
        necessitatibus totam, laborum fugiat officiis cum impedit iusto, ipsam
        nemo quod.
      </motion.div>

      <motion.div layout className="flex flex-col gap-8px">
        <Text as="h3" size="body-large" weight="medium">
          Header
        </Text>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi
        perferendis quasi reprehenderit consequatur dolores possimus id error!
        Sint qui ab, cupiditate voluptates quam, eaque, aperiam voluptas at
        incidunt dignissimos aliquid tempora magnam unde. Atque voluptates
        inventore temporibus quia maxime magnam officia dolore alias
        dignissimos. Assumenda veritatis nisi aliquid omnis enim! Nam officiis
        itaque delectus dolor, distinctio officia sapiente id necessitatibus
        inventore corrupti corporis reprehenderit omnis ut beatae exercitationem
        ratione porro tenetur consectetur suscipit? Non, quam et labore rerum
        quis saepe nobis, optio eveniet in veritatis harum facere reprehenderit
        expedita qui provident mollitia officia culpa quae, numquam magni atque!
        Ab iusto, repellat doloremque deleniti iste vel natus voluptatem et
        cupiditate nulla enim! In, molestiae aperiam. Dolore fugit itaque
        impedit quia voluptate maiores quod cupiditate laboriosam praesentium
        hic cum facere nisi aut, accusantium, illo ratione iure illum tempore
        deserunt? Dignissimos nobis tenetur laudantium vero eos blanditiis
        necessitatibus totam, laborum fugiat officiis cum impedit iusto, ipsam
        nemo quod.
      </motion.div>
    </motion.div>
  );
};

export default JournalPage;
