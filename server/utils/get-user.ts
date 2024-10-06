"use server";

import { unstable_cache } from "next/cache";
import { cache } from "react";
import prisma from "@/lib/prisma";

export const getUser = cache(async (id: string) => {
  return await unstable_cache(
    async (id) => {
      return await prisma.user.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          gender: true,
          birthDate: true,
          dataPolicy: true,
          tenantAdmin: {
            select: {
              id: true,
              name: true,
            },
          },
          activeOrganizationId: true,
          organizations: {
            select: {
              id: true,
              name: true,
            },
          },
          permissions: {
            select: {
              isAdmin: true,
              createOrganization: true,
              readOrganization: true,
              updateOrganization: true,
              deleteOrganization: true,
              createInvitation: true,
              readInvitation: true,
              updateInvitation: true,
              deleteInvitation: true,
              createPermission: true,
              readPermission: true,
              updatePermission: true,
              deletePermission: true,
            },
          },
        },
      });
    },
    [id],
    {
      tags: ["user", id],
      revalidate: 60,
    }
  )(id);
});

export type UserProps = Awaited<ReturnType<typeof getUser>>;
