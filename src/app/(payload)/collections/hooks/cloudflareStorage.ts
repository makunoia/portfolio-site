import type {
  CollectionAfterDeleteHook,
  CollectionBeforeValidateHook,
} from "payload";
import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";

const S3 = new S3Client({
  region: process.env.CLOUDFLARE_REGION,
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY as string,
  },
});

const Bucket = process.env.CLOUDFLARE_BUCKET_NAME as string;

const deleteRemoteObject = async (filename?: string | null) => {
  if (!filename) return;

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

export const handleCloudflareUpload: CollectionBeforeValidateHook = async ({
  data,
  originalDoc,
}) => {
  const isNewFileType =
    !originalDoc || originalDoc?.mimeType !== data?.mimeType;

  const filename = originalDoc
    ? isNewFileType
      ? data?.filename
      : originalDoc?.filename
    : data?.filename;

  if (isNewFileType && originalDoc) {
    await deleteRemoteObject(originalDoc?.filename);
  }

  return {
    ...data,
    filename,
  };
};

export const handleCloudflareDelete: CollectionAfterDeleteHook = async ({ doc }) => {
  await deleteRemoteObject(doc?.filename);
};

