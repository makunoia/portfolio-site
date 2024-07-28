"use client";
import * as Form from "@radix-ui/react-form";
import Text from "@/components/Text";
import { FormEvent, useState } from "react";
import { validatePassword } from "@/app/(app)/lib/validate";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

const LockedProjectForm = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    !isFormSubmitted && setIsFormSubmitted(false);

    try {
      setIsFormSubmitting(true);

      const formData = new FormData(event.currentTarget);
      const valid = await validatePassword(formData);

      if (valid) {
        if (valid === true) {
          setIsPasswordValid(true);
          router.refresh();
        } else setIsPasswordValid(false);
      }
    } catch (error) {
      console.error("Error", error);
    } finally {
      !isFormSubmitted && setIsFormSubmitted(true);
      setIsFormSubmitting(false);
    }
  };

  return (
    <Form.Root
      className="w-full flex flex-col gap-16px"
      onSubmit={handleSubmit}
    >
      <Form.Field
        className="w-full flex flex-col gap-4px"
        name="password"
        serverInvalid={isPasswordValid}
      >
        <div className="flex w-full justify-between">
          <Form.Label>
            <Text>Provide the password</Text>
          </Form.Label>

          {!isPasswordValid && isFormSubmitted ? (
            <Form.Message forceMatch={isPasswordValid}>
              <Text className="text-danger">Incorrect Password</Text>
            </Form.Message>
          ) : null}

          {isPasswordValid ? (
            <Form.Message forceMatch={isPasswordValid}>
              <Text className="text-success">Access granted!</Text>
            </Form.Message>
          ) : null}

          <Form.Message match="valueMissing">
            <Text className="text-danger">Enter valid text</Text>
          </Form.Message>
        </div>

        <div className="flex items-center border border-opacity-80 p-4px rounded-8px bg/90 hover:bg transition-colors ease-in-out duration-300">
          <Form.Control asChild>
            <input
              id="password-field"
              name="password"
              autoComplete="off"
              disabled={isFormSubmitting}
              className="w-full pl-8px h-fit text bg-subtle/0 text-body-large outline-none autofill:bg-subtle/0"
              required
            />
          </Form.Control>

          <Form.Submit asChild>
            <button
              disabled={isFormSubmitting}
              className="bg hover:bg-subtle disabled:bg-subtle/20 disabled:text-subtle/70 transition-colors ease-in-out duration-300 px-8px py-4px rounded-4px"
            >
              <Text size="caption" weight="medium" className="text">
                <Text className="text text-nowrap">
                  {isFormSubmitting ? "Please wait..." : "Submit"}
                </Text>
              </Text>
            </button>
          </Form.Submit>
        </div>
      </Form.Field>
    </Form.Root>
  );
};

export default LockedProjectForm;
