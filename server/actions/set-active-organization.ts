"use server";

import { revalidateTag } from "next/cache";

import prisma from "@lib/prisma";
import { authActionClient } from "@server/utils/action-clients";
import { setActiveOrganizationSchema } from "@/schemas";
import { prismaTransactionConfig } from "@/constants";

export const setActiveOrganization = authActionClient
  .schema(setActiveOrganizationSchema)
  .metadata({ event: "setActiveOrganization" })
  .action(async ({ parsedInput, ctx }) => {
    if (ctx.user.activeOrganizationId === parsedInput.organizationId) {
      throw new Error("Organization already active");
    }
    try {
      await prisma.$transaction(
        async (tx) => {
          const tenant = await tx.tenant.findUnique({
            where: {
              id: ctx.user.organizations[0].tenantId,
            },
            include: {
              organizations: {
                where: {
                  id: {
                    in: [
                      ctx.user.activeOrganizationId as string,
                      parsedInput.organizationId,
                    ],
                  },
                },
              },
            },
          });

          // Überprüfen, ob beide Organisationen existieren
          if (!tenant || tenant.organizations.length < 2) {
            throw new Error("Both organization IDs must belong to the tenant.");
          }

          await tx.user.update({
            where: {
              id: ctx.user.id,
            },
            data: {
              activeOrganizationId: parsedInput.organizationId,
            },
          });
        },
        {
          ...prismaTransactionConfig,
        }
      );
    } catch (error) {
      throw new Error("An error occurred while switching the organization.");
    }
    revalidateTag(ctx.user.id);
    return { message: "Switched organization" };
  });
