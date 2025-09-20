"use client";

import * as Form from "@radix-ui/react-form";
import Text from "@/components/Text";
import { FormEvent, useState } from "react";
import { redirectTo, validatePassword } from "@/lib/actions";
import { toast } from "sonner";
import { Cookie } from "lucide-react";
import { track } from "@vercel/analytics";

const LockedProjectForm = () => {
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsFormSubmitting(true);

      const formData = new FormData(event.currentTarget);
      const isValid = await validatePassword(formData);

      if (isValid) {
        toast.success("Access granted!", {
          description: "You now have access to private content.",
        });
        track("Authorization attempt", { valid: true });
        redirectTo();
      } else {
        track("Authorization attempt", { valid: false });
        toast.error("Wrong password.");
      }
    } catch (error) {
      console.error("Error", error);
    } finally {
      setIsFormSubmitting(false);
    }
  };

  return (
    <Form.Root
      className="w-full flex flex-col gap-16px"
      onSubmit={handleSubmit}
    >
      <Form.Field className="w-full flex flex-col gap-4px" name="password">
        <div className="flex w-full justify-between">
          <Form.Label>
            <Text>Provide the password</Text>
          </Form.Label>

          <Form.Message match="valueMissing">
            <Text className="text-fg-danger">Enter valid text</Text>
          </Form.Message>
        </div>

        <div className="flex items-center border border-opacity-80 p-4px rounded-8px bg-bg-default/90 hover:bg-bg-default transition-colors ease-in-out duration-300">
          <Form.Control asChild>
            <input
              id="password-field"
              name="password"
              autoComplete="off"
              disabled={isFormSubmitting}
              className="w-full pl-8px h-fit text-fg-default bg-bg-subtle/0 text-body-large outline-none autofill:bg-bg-subtle/0"
              required
            />
          </Form.Control>

          <Form.Submit asChild>
            <button
              disabled={isFormSubmitting}
              className="bg-bg-default hover:bg-bg-subtle disabled:bg-bg-subtle/20 disabled:text-fg-subtle/70 transition-colors ease-in-out duration-300 px-8px py-4px rounded-4px"
            >
              <Text size="caption" weight="medium" className="text-fg-default">
                <Text className="text-fg-default text-nowrap">
                  {isFormSubmitting ? "Please wait..." : "Submit"}
                </Text>
              </Text>
            </button>
          </Form.Submit>
        </div>

        <Form.Message className="flex gap-4px mt-4px items-center">
          <Text className="text-fg-subtle" size="caption">
            Your access will be saved in a cookie
          </Text>
          <Cookie size={10} className="text-fg-default" />
        </Form.Message>
      </Form.Field>
    </Form.Root>
  );
};

export default LockedProjectForm;
