import LinkButton from "@/components/LinkButton";

import config from "@payload-config";
import { getPayload } from "payload";
import { Asset } from "payload-types";

const getResume = async () => {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "globals",
    where: {
      name: {
        equals: "resume",
      },
    },
  });

  const document = docs[0]?.document as Asset;
  const link = document ? document.url : "";

  return link;
};

const LinksRow = async () => {
  const link = await getResume();

  return (
    <div className="flex flex-row gap-12px">
      <LinkButton
        label="LinkedIn"
        href="https://www.linkedin.com/in/mark-noya/"
      />
      {link ? <LinkButton label="Resume" href={link} /> : null}
    </div>
  );
};

export default LinksRow;
