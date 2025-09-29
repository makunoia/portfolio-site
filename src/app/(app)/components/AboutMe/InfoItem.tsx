import Image from "next/image";
import Text from "../Text";
import PlaceholderImage from "@/assets/placeholder_img.png";
import { Asset } from "payload-types";

const InfoItem = ({
  label,
  desc,
  tag,
  image,
}: {
  label: string;
  desc: string;
  tag?: string;
  image?: Asset;
}) => {
  return (
    <li className="flex justify-between items-center">
      <div className="flex items-center gap-12px">
        <div className="w-40px h-40px relative overflow-clip bg-bg-subtle rounded-8px">
          <Image
            src={image ? (image.url as string) : PlaceholderImage}
            alt={image ? (image.alt as string) : "Info Icon"}
            quality={100}
            sizes="40px"
            fill
            // width={40}
            // height={40}
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>
        <div className="flex flex-col gap-4px">
          <Text as="span" size="body" weight="medium">
            {label}
          </Text>
          <Text as="span" size="caption" className="text-fg-subtle">
            {desc}
          </Text>
        </div>
      </div>

      {tag && (
        <Text as="span" size="caption" className="text-fg-subtle text-nowrap">
          {tag}
        </Text>
      )}
    </li>
  );
};

export default InfoItem;
