import Content from "@/components/Projects/Page/Content";

const Page = async ({ params }: { params: { project: string } }) => {
  return <Content project={params.project} />;
};

export default Page;
