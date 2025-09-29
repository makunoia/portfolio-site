import Image from "next/image";
import Text from "../Text";
import PlaceholderImage from "@/assets/placeholder_img.png";
import { Asset } from "payload-types";

const MediaItem = ({
  label,
  desc,
  image,
  tag,
}: {
  label: string;
  desc: string;
  image?: Asset;
  tag?: string;
}) => {
  return (
    <li className="flex justify-between items-center">
      <div className="flex items-center gap-12px">
        <div className="w-[55px] h-80px relative overflow-clip bg-bg-subtle rounded-8px">
          <Image
            src={image ? (image.url as string) : PlaceholderImage}
            alt={image ? (image.alt as string) : "Media Poster"}
            style={{ objectFit: "cover" }}
            sizes="55px"
            fill
            // width={100}
            // height={80}
            quality={100}
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

export default MediaItem;
