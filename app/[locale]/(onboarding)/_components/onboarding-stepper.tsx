"use client";
import { useState } from "react";
import {
  IconCircleCheck,
  IconUserQuestion,
  IconListCheck,
  IconUsersGroup,
} from "@tabler/icons-react";
import { Stepper } from "@mantine/core";
import { iconStyles } from "@constants/index";
import { useTranslations } from "next-intl";

export const OnboardingStepper = () => {
  const t = useTranslations("Onboarding");
  const [active, setActive] = useState(1);

  return (
    <Stepper
      active={active}
      onStepClick={setActive}
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
