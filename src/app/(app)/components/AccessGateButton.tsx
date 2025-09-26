"use client";

import React, {useState, useEffect} from "react";
import Modal from "@/components/Modal";
import Button, {ButtonProps} from "@/components/Button";
import AuthorizationForm from "@/components/Authorization/Form";

const AccessGateButton = ({
  label = "Unlock",
  title = "Protected content",
  description = "Enter the shared password to continue.",
  redirectPath = "/projects/archive",
  buttonProps,
  trigger,
  children,
}: {
  label?: string;
  title?: string;
  description?: string;
  redirectPath?: string;
  buttonProps?: Omit<ButtonProps, "label">;
  trigger?: React.ReactElement;
  children?: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const cookiePresent = document.cookie
      .split("; ")
      .some((row) => row.startsWith("auth="));
    setHasAccess(cookiePresent);
  }, []);

  const redirectIfAuthorized = () => {
    window.location.href = redirectPath;
  };

  const handleTriggerClick = (event: React.MouseEvent<HTMLElement>) => {
    if (trigger && React.isValidElement(trigger)) {
      (trigger.props as any).onClick?.(event);
    } else if (buttonProps?.onClick) {
      buttonProps.onClick(
        event as unknown as React.MouseEvent<HTMLButtonElement>
      );
    }

    const cookiePresent = document.cookie
      .split("; ")
      .some((row) => row.startsWith("auth="));

    if (cookiePresent) {
      event.preventDefault();
      redirectIfAuthorized();
      return;
    }

    // If no access, open the modal to show the authorization form
    setOpen(true);
  };

  const handleSuccess = () => {
    setHasAccess(true);
    setOpen(false);
    redirectIfAuthorized();
  };

  const renderTrigger = () => {
    if (trigger && React.isValidElement(trigger)) {
      return React.cloneElement(trigger, {
        onClick: (event: React.MouseEvent<HTMLElement>) => {
          handleTriggerClick(event);
        },
      } as any);
    }

    return (
      <div
        onClick={(event) =>
          handleTriggerClick(event as unknown as React.MouseEvent<HTMLElement>)
        }
      >
        <Button label={label} size="md" {...buttonProps}>
          {children}
        </Button>
      </div>
    );
  };

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      trigger={renderTrigger()}
      title={title}
      description={description}
    >
      <AuthorizationForm
        autoFocus
        redirectPath={redirectPath}
        onSuccess={handleSuccess}
      />
    </Modal>
  );
};

export default AccessGateButton;
