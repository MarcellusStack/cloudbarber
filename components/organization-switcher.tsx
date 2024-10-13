"use client";
import React, { useEffect, useState } from "react";
import {
  Combobox,
  InputBase,
  Input,
  Loader,
  useCombobox,
  Button,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { getUserOrganizations } from "@server/actions/get-user-organizations";
import { useEnhancedAction } from "@hooks/use-enhanced-action";
import { setActiveOrganization } from "@server/actions/set-active-organization";
import { IconPlus } from "@tabler/icons-react";

export const OrganizationSwitcher = () => {
  const [value, setValue] = useState<string | null>(null);
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["user-organizations"],
    queryFn: async () => getUserOrganizations(),
  });
  const { execute, isPending } = useEnhancedAction({
    action: setActiveOrganization,
  });

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => {
      refetch();
    },
  });

  const options =
    data &&
    data.organizations.map((org) => (
      <Combobox.Option value={org.name} key={org.id}>
        {org.name}
      </Combobox.Option>
    ));

  useEffect(() => {
    if (data) {
      const activeOrgName = data.organizations.find(
        (org) => org.id === data.activeOrganizationId
      )?.name;
      setValue(activeOrgName);
    }
  }, [data]);

  return (
    <Combobox
      disabled={isPending || isLoading}
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        const orgId = data?.organizations.find((org) => org.name === val)?.id;
        if (orgId) {
          setValue(val);
          combobox.closeDropdown();
          execute({ organizationId: orgId });
        }
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          rightSection={
            isLoading || isPending ? <Loader size={18} /> : <Combobox.Chevron />
          }
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
        >
          {isLoading || isPending ? (
            <Input.Placeholder>Loading...</Input.Placeholder>
          ) : (
            value
          )}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {isLoading ? <Combobox.Empty>Loading...</Combobox.Empty> : options}
        </Combobox.Options>
        <Combobox.Footer>
          <Button
            variant="subtle"
            leftSection={<IconPlus size={16} />}
            fullWidth
            size="compact-sm"
          >
            Create Organization
          </Button>
        </Combobox.Footer>
      </Combobox.Dropdown>
    </Combobox>
  );
};
