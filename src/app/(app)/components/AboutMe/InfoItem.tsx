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
  const imgTransformer =
    "https://marknoya.me/cdn-cgi/image/format=webp,width=250,fit=contain,quality=100/";

  return (
    <li className="flex justify-between items-center">
      <div className="flex items-center gap-12px">
        <div className="w-40px h-40px relative overflow-clip bg-subtle rounded-8px">
          <Image
            src={
              image
                ? `${imgTransformer}${image.url as string}`
                : PlaceholderImage
            }
            alt="Profile Banner"
            quality={100}
            sizes="40px"
            fill
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

export default InfoItem;
