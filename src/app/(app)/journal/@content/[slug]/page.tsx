"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Users from "@/app/(payload)/collections/Users";

// TO DO
// Loading State
// Align Props with PayLoad

const JournalPage = async ({ params }: { params: { slug: string } }) => {
  const id = params.slug;

  // useEffect(() => {
  //   const getEntries = async (id: string) => {
  //     const req = await fetch(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}/api/entries/${id}`
  //     );

  //     if (req.ok) {
  //       const data = await req.json();
  //       console.log(data);
  //     } else {
  //       console.log(await req.json());
  //     }
  //   };

  //   getEntries(id);
  // }, []);

  // const content = await getEntries(params.slug);

  return <div>Content</div>;

  // return (
  //   <div
  //   // layout="position"
  //   // animate={{ height: "fit-content" }}
  //   // transition={{ type: "spring", delay: 0.8, duration: 0.2 }}
  //   // exit={{ height: 0, transition: { duration: 0.2 } }}
  //   >
  //     <div className="flex flex-col gap-8px">
  //       <Text as="h3" size="body-large" weight="medium">
  //         Header
  //       </Text>
  //       Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi
  //       perferendis quasi reprehenderit consequatur dolores possimus id error!
  //       Sint qui ab, cupiditate voluptates quam, eaque, aperiam voluptas at
  //       incidunt dignissimos aliquid tempora magnam unde. Atque voluptates
  //       inventore temporibus quia maxime magnam officia dolore alias
  //       dignissimos. Assumenda veritatis nisi aliquid omnis enim! Nam officiis
  //       itaque delectus dolor, distinctio officia sapiente id necessitatibus
  //       inventore corrupti corporis reprehenderit omnis ut beatae exercitationem
  //       ratione porro tenetur consectetur suscipit? Non, quam et labore rerum
  //       quis saepe nobis, optio eveniet in veritatis harum facere reprehenderit
  //       expedita qui provident mollitia officia culpa quae, numquam magni atque!
  //       Ab iusto, repellat doloremque deleniti iste vel natus voluptatem et
  //       cupiditate nulla enim! In, molestiae aperiam. Dolore fugit itaque
  //       impedit quia voluptate maiores quod cupiditate laboriosam praesentium
  //       hic cum facere nisi aut, accusantium, illo ratione iure illum tempore
  //       deserunt? Dignissimos nobis tenetur laudantium vero eos blanditiis
  //       necessitatibus totam, laborum fugiat officiis cum impedit iusto, ipsam
  //       nemo quod.
  //     </div>

  //     <div className="flex flex-col gap-8px">
  //       <Text as="h3" size="body-large" weight="medium">
  //         Header
  //       </Text>
  //       Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi
  //       perferendis quasi reprehenderit consequatur dolores possimus id error!
  //       Sint qui ab, cupiditate voluptates quam, eaque, aperiam voluptas at
  //       incidunt dignissimos aliquid tempora magnam unde. Atque voluptates
  //       inventore temporibus quia maxime magnam officia dolore alias
  //       dignissimos. Assumenda veritatis nisi aliquid omnis enim! Nam officiis
  //       itaque delectus dolor, distinctio officia sapiente id necessitatibus
  //       inventore corrupti corporis reprehenderit omnis ut beatae exercitationem
  //       ratione porro tenetur consectetur suscipit? Non, quam et labore rerum
  //       quis saepe nobis, optio eveniet in veritatis harum facere reprehenderit
  //       expedita qui provident mollitia officia culpa quae, numquam magni atque!
  //       Ab iusto, repellat doloremque deleniti iste vel natus voluptatem et
  //       cupiditate nulla enim! In, molestiae aperiam. Dolore fugit itaque
  //       impedit quia voluptate maiores quod cupiditate laboriosam praesentium
  //       hic cum facere nisi aut, accusantium, illo ratione iure illum tempore
  //       deserunt? Dignissimos nobis tenetur laudantium vero eos blanditiis
  //       necessitatibus totam, laborum fugiat officiis cum impedit iusto, ipsam
  //       nemo quod.
  //     </div>
  //   </div>
  // );
};

export default JournalPage;
