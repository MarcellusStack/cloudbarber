"use server";

import { unstable_cache } from "next/cache";
import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { rateLimit } from "@/lib/redis";

export const getCurrentUser = cache(async () => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not found");
  }

  await rateLimit(userId);

  return await unstable_cache(
    async (userId) => {
      return await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          gender: true,
          birthDate: true,
          dataPolicy: true,
          organizationId: true,
          organization: {
            select: {
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
    [userId],
    {
      tags: ["user", userId],
      revalidate: 60,
    }
  )(userId);
});

export type CurrentUserProps = Awaited<ReturnType<typeof getCurrentUser>>;
