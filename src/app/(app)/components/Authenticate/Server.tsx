import { Suspense } from "react";
import { Lock } from "lucide-react";

import Text from "@/components/Text";
import PageListSkeleton from "@/components/Skeletons/PageList";
import ListContainer from "@/components/Home/ListContainer";
import AuthenticateForm from "./Form";

import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
const payload = await getPayloadHMR({ config });

import { Project } from "payload-types";
import BackButton from "../Projects/BackButton";

const Authenticate = async ({
  codename,
  desc,
}: {
  codename: string;
  desc: string;
}) => {
  const { docs } = await payload.find({
    collection: "projects",
    limit: 5,
    sort: "-year",
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
        <div className="flex flex-col gap-24px">
          <BackButton />
          <div className="flex flex-col">
            <Text size="caption" className="font-mono">
              Codename
            </Text>
            <div className="flex flex-row gap-12px items-center ">
              <Text size="heading">{codename}</Text>
              <div className="flex w-fit h-fit gap-8px items-center bg-subtle/60 px-8px py-6px rounded-8px">
                <Lock size={12} className="text" />
                <Text size="caption">Locked</Text>
              </div>
            </div>
          </div>
        </div>
        <Text size="body" className="text-subtle" multiline>
          {desc}
        </Text>
      </div>

      <AuthenticateForm />

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

export default Authenticate;
