import Image from "next/image";
import Text from "../Text";
import PlaceholderImage from "@/assets/placeholder_img.png";
import { Asset, MediaItem as MediaItemType } from "payload-types";

const MediaItem = ({
  label,
  desc,
  image,
  tag,
  progress,
}: {
  label: string;
  desc: string;
  image?: Asset;
  tag?: string;
  progress?: MediaItemType["progress"];
}) => {
  const episodeCount = progress?.episodeCount ? progress.episodeCount : 0;
  const watchedCount = progress?.watchedCount ? progress.watchedCount : 0;
  const percentFinished = (watchedCount / episodeCount) * 100;

  return (
    <li className="flex items-center gap-12px">
      <div className="w-[55px] h-80px relative overflow-clip bg-subtle rounded-8px">
        <Image
          src={image ? (image.url as string) : PlaceholderImage}
          alt="Profile Banner"
          width={55}
          height={80}
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div className="flex flex-col gap-4px">
        <Text as="span" size="body" weight="medium">
          {`${label} • ${percentFinished}%`}
        </Text>
        <Text as="span" size="caption" className="text-subtle">
          {desc}
        </Text>
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
