"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { UnstyledButton, Menu, Image, Group } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import classes from "../styles/locale-picker.module.css";

const data = [
  { label: "English", image: "/english.svg", locale: "en" },
  { label: "German", image: "/german.svg", locale: "de" },
];

export const LocalePicker = () => {
  const params = useParams<{ locale: "de" | "en" }>();
  const router = useRouter();
  const pathname = usePathname();
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState(() => {
    const storedLocale = localStorage.getItem("locale");
    return data.find((item) => item.locale === storedLocale) || data[0];
  });

  useEffect(() => {
    const storedLocale = localStorage.getItem("locale");
    if (storedLocale && storedLocale !== params.locale) {
      const newPathname = pathname.replace(
        `/${params.locale}`,
        `/${storedLocale}`
      );
      router.push(newPathname);
    }
  }, [params.locale, pathname, router]);

  const handleLocaleChange = (item) => {
    setSelected(item);
    localStorage.setItem("locale", item.locale);
    const newPathname = pathname.replace(
      `/${params.locale}`,
      `/${item.locale}`
    );
    router.push(newPathname);
  };

  const items = data.map((item) => (
    <Menu.Item
      leftSection={
        <Image src={item.image} width={18} height={18} alt={item.label} />
      }
      onClick={() => handleLocaleChange(item)}
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
