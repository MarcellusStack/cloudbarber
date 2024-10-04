"use client";
import { useAction } from "next-safe-action/hooks";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { modals } from "@mantine/modals";
import { v4 as uuidv4 } from "uuid";
import { useTranslations } from "next-intl";

export type EnhancedActionProps = {
  action: any;
  redirectUrl?: string;
  hideModals?: boolean;
  onExecute?: () => void;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
};

export const useEnhancedAction = ({
  action,
  redirectUrl,
  hideModals,
  onExecute,
  onSuccess,
  onError,
}: EnhancedActionProps) => {
  const t = useTranslations("Notification");
  const router = useRouter();
  const executeNotification = uuidv4();
  const { execute, result, isPending } = useAction(action, {
    onExecute() {
      notifications.show({
        id: executeNotification,
        withCloseButton: false,
        loading: true,
        withBorder: true,
        autoClose: false,
        title: t("executeTitle"),
        message: t("executeMessage"),
        color: "yellow",
      });

      // Call the custom onExecute function, if provided
      if (onExecute) {
        onExecute();
      }
    },
    onSuccess(data, input, reset) {
      if (!data) {
        return;
      }

      notifications.hide(executeNotification);

      notifications.show({
        id: uuidv4(),
        withBorder: true,
        autoClose: 5000,
        title: t("successTitle"),
        message: data.message as string,
        color: "green",
      });

      if (hideModals) {
        modals.closeAll();
      }

      if (redirectUrl) {
        router.push(redirectUrl);
      }

      if (onSuccess && data) {
        onSuccess(data);
      }

      return data;
    },
    onError(error, input, reset) {
      if (!error) {
        return;
      }

      notifications.hide(executeNotification);

      notifications.show({
        id: uuidv4(),
        withBorder: true,
        autoClose: 5000,
        title: t("errorTitle"),
        message: error.serverError ? error.serverError : t("errorMessage"),
        color: "red",
      });

      if (onError && error) {
        onError(error);
      }
    },
  });

  return { execute, result, isPending };
};
