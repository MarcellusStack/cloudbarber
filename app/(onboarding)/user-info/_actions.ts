"use server";

import prisma from "@/lib/prisma";
import { authActionClient } from "@server/utils/action-clients";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { userInfoSchema } from "./_schemas";
import { convertDateToUTC } from "@/utils/convert-date-to-utc";

export const createUserInfo = authActionClient
  .schema(userInfoSchema)
  .metadata({ event: "createUserInfo" })
  .action(async ({ parsedInput, ctx }) => {
    try {
      const utcDate = convertDateToUTC(parsedInput.birthDate);
      await prisma.user.update({
        where: { id: ctx.user.id },
        data: {
          firstName: parsedInput.firstName,
          lastName: parsedInput.lastName,
          gender: parsedInput.gender,
          birthDate: utcDate,
        },
      });
    } catch (error) {
      throw new Error(`An error occurred : ${error}`);
    }

    revalidateTag(ctx.user.id);
    return redirect(`/join-organization`);
  });
