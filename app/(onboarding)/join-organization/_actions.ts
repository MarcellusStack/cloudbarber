"use server";

import prisma from "@lib/prisma";
import { authActionClient } from "@server/utils/action-clients";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { createOrganizationSchema } from "./_schemas";
import { prismaTransactionConfig } from "@/constants";
import { clerkClient } from "@clerk/nextjs/server";

export const createOrganization = authActionClient
  .schema(createOrganizationSchema)
  .metadata({ event: "createOrganization" })
  .action(async ({ parsedInput, ctx }) => {
    try {
      await prisma.$transaction(
        async (tx) => {
          //create tenant
          const tenant = await tx.tenant.create({
            data: {
              name: parsedInput.tenantName,
              admin: {
                connect: {
                  id: ctx.user.id,
                },
              },
            },
          });
          // Organisation erstellen
          const organization = await tx.organization.create({
            data: {
              tenant: {
                connect: {
                  id: tenant.id,
                },
              },
              name: parsedInput.organizationName,
              street: parsedInput.street,
              city: parsedInput.city,
              state: parsedInput.state,
              postalCode: parsedInput.postalCode,
              country: parsedInput.country,
              permissions: {
                createMany: {
                  data: [
                    {
                      name: "Admin",
                      description: "Admin-Berechtigung",
                      isAdmin: true,
                    },
                    {
                      name: "Benutzer",
                      description: "Benutzer-Berechtigung",
                    },
                  ],
                },
              },
            },
            select: {
              id: true,
              permissions: {
                select: {
                  id: true,
                },
              },
            },
          });

          // Benutzer aktualisieren, um die Organisations-ID und Berechtigungen zu setzen
          await tx.user.update({
            where: { id: ctx.user.id },
            data: {
              organizations: {
                connect: {
                  id: organization.id,
                },
              },
              activeOrganizationId: organization.id,
              permissions: {
                connect: [
                  {
                    id: organization.permissions[0].id,
                  },
                ],
              },
            },
          });

          if (parsedInput.users.length > 0) {
            await tx.invitation.createMany({
              data: parsedInput.users.map((user) => ({
                email: user.email,
                organizationId: organization.id,
                permissionId: organization.permissions[1].id,
              })),
            });
            await Promise.all(
              parsedInput.users.map(async (user) => {
                await clerkClient.invitations.createInvitation({
                  emailAddress: user.email,
                  redirectUrl: "http://localhost:3000",
                  ignoreExisting: true,
                });
              })
            );
          }
        },
        {
          ...prismaTransactionConfig,
        }
      );
    } catch (error) {
      throw new Error(`Ein Fehler ist aufgetreten: ${error}`);
    }
    revalidateTag(ctx.user.id);
    redirect("/onboarding-completed");
  });
