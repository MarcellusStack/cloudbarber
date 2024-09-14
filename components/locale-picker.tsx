"use client";
import React, { useState, useEffect } from "react";
import { UnstyledButton, Menu, Image, Group } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import classes from "../styles/locale-picker.module.css";
import { useEnhancedAction } from "@/hooks/use-enhanced-action";
import { setUserLocale } from "@server/utils/set-user-locale";
import { useLocale } from "next-intl";

const data = [
  { label: "English", image: "/english.svg", locale: "en" },
  { label: "German", image: "/german.svg", locale: "de" },
];

export const LocalePicker = () => {
  const locale = useLocale();
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState(
    data.find((item) => item.locale === locale)
  );

  const { execute } = useEnhancedAction({
    action: setUserLocale,
  });

  useEffect(() => {
    const selectedLocale = data.find((item) => item.locale === locale);
    setSelected(selectedLocale);
  }, [locale]);

  const items = data.map((item) => (
    <Menu.Item
      leftSection={
        <Image src={item.image} width={18} height={18} alt={item.label} />
      }
      onClick={() => execute({ locale: item.locale })}
      key={item.label}
    >
      {item.label}
    </Menu.Item>
  ));

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="target"
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton
          className={classes.control}
          data-expanded={opened || undefined}
        >
          <Group gap="xs">
            <Image src={selected.image} width={22} height={22} alt="locale" />
            <span className={classes.label}>{selected.label}</span>
          </Group>
          <IconChevronDown size="1rem" className={classes.icon} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
};
