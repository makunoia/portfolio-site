import { Suspense } from "react";
import { Lock } from "lucide-react";

import Text from "@/components/Text";
import PageListSkeleton from "@/components/Skeletons/PageList";
import ListContainer from "@/components/Home/ListContainer";
import AuthenticateForm from "@/components/Authenticate/Form";

import { Project } from "payload-types";
import BackButton from "@/app/(app)/components/Projects/BackButton";
import { getCollection } from "@/lib/payload-actions";

const Authenticate = async () => {
  const projects = await getCollection({
    collection: "projects",
    limit: 5,
    sort: "-year",
    where: {
      isLocked: {
        equals: false,
      },
    },
  });

  const items = projects as Project[];

  return (
    <main className="max-w-[500px] mx-auto my-[80px] flex flex-col gap-40px">
      <div className="flex flex-col gap-8px">
        <div className="flex flex-col gap-24px">
          <BackButton />
          <div className="flex flex-col gap-12px">
            <div className="flex w-fit h-fit gap-8px items-center bg-subtle/60 px-8px py-6px rounded-8px">
              <Lock size={12} className="text" />
              <Text size="caption">Locked</Text>
            </div>
            <div className="flex flex-row gap-12px items-center ">
              <Text size="lead">You're trying to access a private page.</Text>
            </div>
          </div>
        </div>
        <Text size="body" className="text-subtle" multiline>
          Some pages are hidden to ensure that only specific individuals can
          access private information. If you'd like access, please feel free to
          reach out to me.
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
