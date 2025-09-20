import GalleryGrid from "./GalleryGrid";
import GalleryHero from "@/components/HeroSections/Gallery";
import {GalleryEntry} from "@/types";

const GalleryPage = ({items}: {items: GalleryEntry[]}) => {
  return (
    <section className="my-[80px] flex w-full flex-col items-center gap-40px px-16px md:px-0">
      <div className="w-full max-w-[500px]">
        <GalleryHero />
      </div>

      <div className="w-full max-w-[1100px]">
        <GalleryGrid items={items} />
      </div>
    </section>
  );
};

export default GalleryPage;
