import Text from "@/components/Text";

const HeroBadge = ({ label }: { label: string }) => {
  return (
    <div className="px-16px py-12px rounded-24px border-border-inverse border w-fit">
      <Text as="h1" size="body-large" weight="medium" className="text-nowrap">
        {label}
      </Text>
    </div>
  );
};

export default HeroBadge;
