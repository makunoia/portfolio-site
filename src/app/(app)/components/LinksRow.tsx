import LinkButton from "@/components/LinkButton";
import {getResumeGlobal} from "@/app/(app)/lib/globals";

const getResume = async (): Promise<string> => {
  const {resume} = await getResumeGlobal();

  if (resume && typeof resume !== "string") {
    return resume.url ?? "";
  }

  return "";
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
