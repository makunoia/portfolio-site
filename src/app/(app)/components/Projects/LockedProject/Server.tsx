import { Suspense } from "react";
import { Lock } from "lucide-react";

import Text from "@/components/Text";
import PageListSkeleton from "@/components/Skeletons/PageList";
import ListContainer from "@/components/Home/ListContainer";
import LockedProjectForm from "./Client";

import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
const payload = await getPayloadHMR({ config });

import { Project } from "payload-types";

const LockedProject = async ({
  codename,
  desc,
}: {
  codename: string;
  desc: string;
}) => {
  const { docs } = await payload.find({
    collection: "projects",
    limit: 5,
    sort: "createdAt",
    where: {
      isLocked: {
        equals: false,
      },
    },
  });

  const items = docs as Project[];

  return (
    <main className="max-w-[500px] mx-auto my-[80px] flex flex-col gap-40px">
      <div className="flex flex-col gap-8px">
        <div className="flex gap-8px items-center bg-subtle/60 p-8px rounded-8px w-fit mb-16px">
          <Lock size={16} className="text" />
          <Text size="body">This project is locked</Text>
        </div>
        <div className="flex flex-col gap-0px">
          <Text size="caption" className="font-mono">
            Codename
          </Text>
          <Text size="heading">{codename}</Text>
        </div>
        <Text size="body" className="text-subtle" multiline>
          {desc}
        </Text>
      </div>

      <LockedProjectForm />

      <hr />
      <div className="flex flex-col gap-24px">
        <Text size="body-large" weight="medium">
          Visit other projects instead
        </Text>
        <Suspense fallback={<PageListSkeleton />}>
          <ListContainer link="/projects" items={items} />
        </Suspense>
      </div>
    </main>
  );
};

export default LockedProject;
