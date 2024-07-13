"use client";
import { useFormFields } from "@payloadcms/ui";
Text;
const SlugField = () => {
  const title = useFormFields(([fields, dispatch]) => fields.title);
  const value: string = title.value as string;

  const slug = value.replaceAll(" ", "-").toLowerCase();

  if (typeof value !== "undefined") {
    return <input className="field-type text" value={slug} />;
  }
};

export default SlugField;
