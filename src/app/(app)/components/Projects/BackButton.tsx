import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Text from "@/components/Text";

const BackButton = () => {
  return (
    <Link prefetch href="/projects">
      <div className="flex flex-row items-center gap-8px group hover:-translate-x-8px transition-transform ease-in-out duration-200">
        <ArrowLeft size={16} className="text" />
        <Text
          size="body"
          className="opacity-40 group-hover:opacity-100 transition-opacity ease-in-out duration-500"
        >
          Back to all projects
        </Text>
      </div>
    </Link>
  );
};

export default BackButton;
