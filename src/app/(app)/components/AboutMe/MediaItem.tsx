import Image from "next/image";
import Text from "../Text";
import PlaceholderImage from "@/assets/placeholder_img.png";
import { Asset, MediaItem as MediaItemType } from "payload-types";

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
  const imgTransformer =
    "https://marknoya.me/cdn-cgi/image/format=webp,width=250,fit=contain,quality=100/";

  return (
    <li className="flex justify-between items-center">
      <div className="flex items-center gap-12px">
        <div className="w-[55px] h-80px relative overflow-clip bg-subtle rounded-8px">
          <Image
            src={
              image
                ? `${imgTransformer}${image.url as string}`
                : PlaceholderImage
            }
            alt="Profile Banner"
            style={{ objectFit: "cover" }}
            quality={100}
            fill
          />
        </div>
        <div className="flex flex-col gap-4px">
          <Text as="span" size="body" weight="medium">
            {label}
          </Text>
          <Text as="span" size="caption" className="text-subtle">
            {desc}
          </Text>
        </div>
      </div>

      {tag && (
        <Text as="span" size="caption" className="text-subtle text-nowrap">
          {tag}
        </Text>
      )}
    </li>
  );
};

export default MediaItem;
