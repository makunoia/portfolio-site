import { Slot } from "@radix-ui/react-slot";
import { Check } from "lucide-react";
import Text from "../Text";

const BooleanItem = ({ label, done }: { label: string; done?: boolean }) => {
  return (
    <li className="flex items-center gap-8px">
      <div className="flex items-center justify-center w-18px h-18px bg-bg-subtle border-border-subtle rounded-4px">
        {done && (
          <Slot className="text-caption text-fg-default">
            <Check size={12} strokeWidth={4} />
          </Slot>
        )}
      </div>
      <Text className={done ? "opacity-70 text-fg-subtle line-through" : "text-fg-default"}>
        {label}
      </Text>
    </li>
  );
};

export default BooleanItem;
