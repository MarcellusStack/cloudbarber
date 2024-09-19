"use server";

import { unstable_cache } from "next/cache";
import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const getCurrentUser = cache(async () => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not found");
  }

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
