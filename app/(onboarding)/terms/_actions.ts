"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@lib/prisma";
import { termsSchema } from "./_schemas";
import { actionClientWithMeta } from "@server/utils/action-clients";

export const acceptTerms = actionClientWithMeta
  .schema(termsSchema)
  .metadata({ event: "acceptTerms" })
  .action(async ({ parsedInput }) => {
    try {
      auth().protect();
      const user = await currentUser();

      await prisma.user.create({
        data: {
          email: user?.emailAddresses[0].emailAddress,
          id: user?.id,
          dataPolicy: parsedInput.dataPolicy,
        },
      });
      revalidateTag(user?.id);
    } catch (error) {
      throw new Error("An error occurred while accepting the terms.");
    }

    return redirect(`/user-info`);
  });
