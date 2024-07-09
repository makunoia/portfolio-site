import type { CollectionConfig, CollectionBeforeValidateHook } from "payload";
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";

// TO DO
// You can write an Upload to Cloudflare R2 with PayloadCMS 3.0 article

const beforeValidateHook: CollectionBeforeValidateHook = async ({
  data, // incoming data to update or create with
  req, // full express request
  operation, // name of the operation ie. 'create', 'update'
  originalDoc, // original document
}) => {
  if (operation === "create") {
    const S3 = new S3Client({
      region: process.env.CLOUDFLARE_REGION,
      endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY as string,
      },
    });

    var file;
    if (req.file) file = req.file.data;

    const uploadParams: PutObjectCommandInput = {
      Bucket: process.env.CLOUDFLARE_BUCKET_NAME as string,
      Key: data?.filename,
      Body: file,
      ContentType: data?.mimeType,
      ContentDisposition: `inline; filename=${data?.filename}`, //so we can prevent the file from being autodownloaded
      ACL: "public-read",
    };

    try {
      await S3.send(new PutObjectCommand(uploadParams));
      console.log(`File uploaded successfully.`);

      return {
        url: `${process.env.CLOUDFLARE_BUCKET_PUBLIC_LINK}/${data?.filename}`,
        ...data,
      };
    } catch (err) {
      console.error("Error uploading file:", err);
      return data;
    }
  }
};

const Assets: CollectionConfig = {
  slug: "assets",
  admin: {
    group: "Settings",
    useAsTitle: "name",
    defaultColumns: ["name", "alt"],
  },
  upload: {
    staticDir: `${process.env.CLOUDFLARE_BUCKET_PUBLIC_LINK}`,
    disableLocalStorage: true,
    mimeTypes: ["image/*", "application/pdf"],
    adminThumbnail: ({ doc }) =>
      `${process.env.CLOUDFLARE_BUCKET_PUBLIC_LINK}/${doc.filename}`,
  },

  fields: [
    { label: "Name", name: "name", type: "text" },
    { label: "Alt text", name: "alt", type: "text" },
  ],
  hooks: {
    beforeValidate: [beforeValidateHook],
  },
};

export default Assets;
