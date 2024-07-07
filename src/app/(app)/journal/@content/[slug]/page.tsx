"use client";
import Text from "@/app/(app)/components/Text";
import { motion, useAnimate, usePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

// TO DO
// Loading State
// Align Props with PayLoad

const JournalPage = () => {
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();

  // useEffect(() => {
  //   console.log("Template effect");
  //   if (isPresent) {
  //     console.log("Content mounted");
  //     animate(scope.current, { height: 0 });

  //     const enterAnimation = async () => {
  //       await animate(scope.current, { height: 0 });
  //       await animate(
  //         scope.current,
  //         { height: "100%" },
  //         { type: "spring", damping: 100, stiffness: 400, duration: 600 }
  //       );
  //     };
  //     enterAnimation();
  //   } else {
  //     safeToRemove();
  //   }
  // }, [isPresent]);

  return (
    <motion.div
      layout="position"
      // initial={false}
      initial={{ height: 0, translateY: 20, opacity: 0 }}
      animate={{ height: "fit-content", translateY: 0, opacity: 1 }}
      transition={{
        type: "spring",
        damping: 100,
        stiffness: 400,
        duration: 600,
        delay: 0.4,
      }}
      className="inline-flex flex-col gap-24px pt-0px p-24px"
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
