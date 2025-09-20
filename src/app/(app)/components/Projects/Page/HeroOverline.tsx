import Text from "@/components/Text";

const Overline = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-col gap-4px w-fit">
      <Text
        as="span"
        size="caption"
        weight="medium"
        className="text-fg-subtle text-nowrap"
      >
        {label}
      </Text>
      <Text as="span" size="body" className="text-fg-default text-nowrap">
        {value}
      </Text>
    </div>
  );
};

export default Overline;
