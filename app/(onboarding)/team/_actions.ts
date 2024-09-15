"use server";

import prisma from "@/lib/prisma";
import { actionClient, authActionClient } from "@server/utils/action-clients";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { termsSchema } from "../terms/_schemas";
import { userInfoSchema } from "./_schemas";

export const createUserInfo = authActionClient
  .schema(userInfoSchema)
  .action(async ({ parsedInput, ctx }) => {
    try {
      await prisma.user.update({
        where: { id: ctx.user.id },
        data: {
          firstName: parsedInput.firstName,
          lastName: parsedInput.lastName,
          gender: parsedInput.gender,
          birthDate: parsedInput.birthDate,
        },
      });
      revalidateTag(ctx.user.id);
    } catch (error) {
      throw new Error(`An error occurred : ${error}`);
    }

    return redirect(`/user-info`);
  });
