"use client";

import {
  IconCircleCheck,
  IconUserQuestion,
  IconListCheck,
  IconUsersGroup,
} from "@tabler/icons-react";
import { Stepper } from "@mantine/core";
import { iconStyles } from "@constants/index";
import { useTranslations } from "next-intl";

import { type CurrentUserProps } from "@/server/utils/get-current-user";

export const OnboardingStepper = ({ user }: { user: CurrentUserProps }) => {
  const t = useTranslations("Onboarding");

  // Function to determine the active step based on user properties
  const getActiveStep = (user: CurrentUserProps) => {
    if (!user || !user.dataPolicy) {
      return 0;
    }
    if (
      user.dataPolicy &&
      (!user.firstName || !user.lastName || !user.gender || !user.birthDate)
    ) {
      return 1;
    }
    if (
      user.firstName &&
      user.lastName &&
      user.gender &&
      user.birthDate &&
      (!user.organizations || user.organizations.length === 0)
    ) {
      return 2;
    }
    if (user.organizations && user.organizations.length > 0) {
      return 3;
    }
    return 0;
  };

  return (
    <Stepper
      active={getActiveStep(user)}
      completedIcon={<IconCircleCheck style={iconStyles} />}
    >
      <Stepper.Step
        icon={<IconListCheck style={iconStyles} />}
        label={t("termLabel")}
        description={t("termDescription")}
      />
      <Stepper.Step
        icon={<IconUserQuestion style={iconStyles} />}
        label={t("aboutLabel")}
        description={t("aboutDescription")}
      />
      <Stepper.Step
        icon={<IconUsersGroup style={iconStyles} />}
        label={t("teamLabel")}
        description={t("teamDescription")}
      />
    </Stepper>
  );
};
