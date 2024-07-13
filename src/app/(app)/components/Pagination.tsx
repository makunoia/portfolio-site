import PaginationItem from "./PaginationItem";
import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";

const getPages = async () => {};

const Pagination = async ({ currID }: { currID: string }) => {
  return (
    <div className="flex gap-24px justify-between">
      <PaginationItem
        desc="Previous"
        label="An app for Filipino citizens"
        left
      />
      <PaginationItem
        desc="Next"
        label="An small business online store app"
        right
      />
    </div>
  );
};

export default Pagination;
