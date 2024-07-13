import type {
  CollectionConfig,
  CollectionAfterDeleteHook,
  CollectionBeforeValidateHook,
} from "payload";
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
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
  data, // incoming data to update or create with
  req, // full express request
  operation,
  originalDoc, // original document
}) => {
  // console.log("Operation Type:", operation);
  // console.log("originalDoc", originalDoc);
  // console.log("data", data);

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

  const uploadFile = async (file: any) => {
    const uploadParams: PutObjectCommandInput = {
      Bucket,
      Key: filename,
      Body: file,
      ContentType: data?.mimeType,
      ContentDisposition: `inline; filename=${filename}`, //so we can prevent the file from being auto downloaded
      ACL: "public-read",
    };

    try {
      await S3.send(new PutObjectCommand(uploadParams));
      console.log(`File uploaded successfully.`);
    } catch (err) {
      console.error("Error uploading file:", err);
      return data;
    }
  };

  const deleteFile = async (filename: string) => {
    const deleteParams: DeleteObjectCommandInput = {
      Bucket: process.env.CLOUDFLARE_BUCKET_NAME as string,
      Key: filename,
    };

    try {
      await S3.send(new DeleteObjectCommand(deleteParams));
      console.log(`File deleted.`);
    } catch (err) {
      console.error("Error deleting file:", err);
    }
  };

  uploadFile(file);

  // If uploaded file is a new file type, delete the old file.
  isNewFileType && originalDoc && deleteFile(originalDoc?.filename);

  const newData = {
    ...data,
    newdata: "hello",
    url: `${process.env.CLOUDFLARE_BUCKET_PUBLIC_LINK}/${filename}`,
    thumbnailURL: `${process.env.CLOUDFLARE_BUCKET_PUBLIC_LINK}/${filename}`,
    filename,
  };

  console.log("New Data", newData);
  return newData;
};

const HandleDelete: CollectionAfterDeleteHook = async ({ doc }) => {
  console.log("Deleting doc", doc);
  const deleteFile = async (filename: string) => {
    const deleteParams: DeleteObjectCommandInput = {
      Bucket: process.env.CLOUDFLARE_BUCKET_NAME as string,
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
            console.log("Before Validate siblingData", siblingData);
            if (!value) {
              return siblingData.filename;
            } else return value;
          },
        ],
      },
    },
    { label: "Alt text", name: "alt", type: "text" },
  ],
  hooks: {
    beforeValidate: [HandleUpload],
    afterChange: [
      (siblingData) => {
        console.log("after change data", siblingData.doc);
      },
    ],
    afterDelete: [HandleDelete],
  },
};

export default Assets;

// on create
// beforeChange file.png
// originalDoc undefined
// data file.png
// new data file.png

// on update
// beforeChange file-1.png
// originalDoc file.png
// data file-1.png
// new data file.png
