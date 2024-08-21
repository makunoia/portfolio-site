import Content from "@/components/Projects/Page/Content";
import { getProject } from "@/lib/payload-actions";

const Page = async ({ params }: { params: { project: string } }) => {
  const projectData = await getProject(params.project);

  return <Content project={projectData} />;
};

export default Page;
