import Text from "@/components/Text";

export default ({ lead, content }: { lead: string; content: string }) => {
  return (
    <div className="flex flex-col gap-4px">
      <Text size="body-large" weight="medium">
        {lead}
      </Text>
      <Text size="body" className="text-fg-subtle whitespace-pre-line" multiline>
        {content}
      </Text>
    </div>
  );
};
