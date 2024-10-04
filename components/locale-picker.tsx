"use client";
import React, { useState, useEffect } from "react";
import {
  Combobox,
  useCombobox,
  Group,
  ActionIcon,
  Text,
  Box,
  Flex,
} from "@mantine/core";
import Image from "next/image";
import { useEnhancedAction } from "@/hooks/use-enhanced-action";
import { setUserLocale } from "@server/utils/set-user-locale";
import { useLocale } from "next-intl";

const data = [
  { label: "English", image: "/english.svg", value: "en" },
  { label: "German", image: "/german.svg", value: "de" },
];

export const LocalePicker = () => {
  const locale = useLocale();
  const [selected, setSelected] = useState(locale);

  const { execute } = useEnhancedAction({
    action: setUserLocale,
  });

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  useEffect(() => {
    setSelected(locale);
  }, [locale]);

  const handleChange = (value: string | null) => {
    if (value) {
      execute({ locale: value });
      setSelected(value);
    }
  };

  const options = data.map((item) => (
    <Combobox.Option value={item.value} key={item.value}>
      <Group gap="sm">
        <Image src={item.image} width={22} height={22} alt={item.label} />
        <Text>{item.label}</Text>
      </Group>
    </Combobox.Option>
  ));

  const selectedItem = data.find((item) => item.value === selected);

  return (
    <Flex pos="relative" align="center">
      <Combobox
        radius="sm"
        store={combobox}
        onOptionSubmit={(val) => {
          handleChange(val);
          combobox.closeDropdown();
        }}
        width={140}
      >
        <Combobox.Target>
          <ActionIcon
            onClick={() => combobox.toggleDropdown()}
            style={{
              background: "transparent",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          >
            {selectedItem && (
              <Image
                src={selectedItem.image}
                width={28}
                height={28}
                alt={selectedItem.label}
              />
            )}
          </ActionIcon>
        </Combobox.Target>
        <Combobox.Dropdown>
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </Flex>
  );
};
