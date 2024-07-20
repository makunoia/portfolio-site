import type {
  CollectionConfig,
  CollectionAfterDeleteHook,
  CollectionBeforeValidateHook,
} from "payload";
import {
  S3Client,
  DeleteObjectCommandInput,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

// TO DO
// You can write an Upload to Cloudflare R2 with PayloadCMS 3.0 article

const S3 = new S3Client({
  region: process.env.CLOUDFLARE_REGION,
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY as string,
  },
});

const Bucket = process.env.CLOUDFLARE_BUCKET_NAME as string;

const HandleUpload: CollectionBeforeValidateHook = async ({
  data,
  req,
  originalDoc,
}) => {
  var file;

  const isNewFileType =
    !originalDoc || originalDoc?.mimeType !== data?.mimeType;

  // If incoming file has a different mime type, change file name
  // Otherwise, retain the file name.
  const filename = originalDoc
    ? isNewFileType
      ? data?.filename
      : originalDoc?.filename
    : data?.filename;

  if (req.file) file = req.file.data;

  const deleteFile = async (filename: string) => {
    const deleteParams: DeleteObjectCommandInput = {
      Bucket,
      Key: filename,
    };

    try {
      await S3.send(new DeleteObjectCommand(deleteParams));
      console.log(`File deleted.`);
    } catch (err) {
      console.error("Error deleting file:", err);
    }
  };

  // If uploaded file is a new file type, delete the old file.
  isNewFileType && originalDoc && deleteFile(originalDoc?.filename);

  const newData = {
    ...data,
    filename,
  };

  return newData;
};

const HandleDelete: CollectionAfterDeleteHook = async ({ doc }) => {
  const deleteFile = async (filename: string) => {
    const deleteParams: DeleteObjectCommandInput = {
      Bucket,
      Key: filename,
    };

    try {
      await S3.send(new DeleteObjectCommand(deleteParams));
      console.log(`File deleted.`);
    } catch (err) {
      console.error("Error deleting file:", err);
    }
  };

  await deleteFile(doc.filename);
};

const Assets: CollectionConfig = {
  slug: "assets",
  admin: {
    group: "Collections",
    useAsTitle: "name",
    defaultColumns: ["name", "alt"],
  },
  upload: {
    crop: false,
    staticDir: `${process.env.CLOUDFLARE_BUCKET_PUBLIC_LINK}/`,
    disableLocalStorage: true,
    mimeTypes: ["image/*", "application/pdf"],
    adminThumbnail: ({ doc }) =>
      `${process.env.CLOUDFLARE_BUCKET_PUBLIC_LINK}/${doc.filename}`,
  },
  fields: [
    {
      label: "Name",
      name: "name",
      type: "text",
      hooks: {
        beforeValidate: [
          ({ value, siblingData }) => {
            if (!value) {
              return siblingData.filename;
            } else return value;
          },
        ],
      },
    },
    { label: "Alt text", name: "alt", type: "text" },
    {
      name: "url",
      type: "text",
    },
  ],
  hooks: {
    beforeValidate: [HandleUpload],
    afterDelete: [HandleDelete],
  },
};

export default Assets;
