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
  accessType = "project",
  buttonProps,
  trigger,
  children,
}: {
  label?: string;
  title?: string;
  description?: string;
  redirectPath?: string;
  accessType?: "project" | "archive";
  buttonProps?: Omit<ButtonProps, "label">;
  trigger?: React.ReactElement;
  children?: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  const cookieName =
    accessType === "archive" ? "authLockedArchives" : "authLockedProjects";

  useEffect(() => {
    const cookiePresent = document.cookie
      .split("; ")
      .some((row) => row.startsWith(`${cookieName}=`));
    setHasAccess(cookiePresent);
  }, [cookieName]);

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
      .some((row) => row.startsWith(`${cookieName}=`));

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
        <Button
          label={hasAccess ? "Access page" : label}
          size="md"
          className={
            hasAccess
              ? "bg-bg-success/80 hover:bg-bg-success active:bg-bg-success/50 transition-colors ease-in-out duration-300"
              : ""
          }
          {...buttonProps}
        >
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
      title={title ?? "Protected content"}
      description={description}
    >
      <AuthorizationForm
        autoFocus
        redirectPath={redirectPath}
        accessType={accessType}
        onSuccess={handleSuccess}
      />
    </Modal>
  );
};

export default AccessGateButton;
