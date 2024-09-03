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
          organizationId: true,
          organization: {
            select: {
              adminUserId: true,
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
