"use server";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { authQuery } from "@server/utils/query-clients";

export const getUserOrganizations = cache(async () => {
  const user = await authQuery();
  return await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      tenantAdmin: {
        select: {
          id: true,
        },
      },
      activeOrganizationId: true,
      organizations: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
});

export type UserOrganizationsProps = Awaited<
  ReturnType<typeof getUserOrganizations>
>;
