import { z } from "zod";

export const createOrganizationSchema = z.object({
  name: z.string().min(1),
  users: z.array(
    z.object({
      email: z.string().email(),
    })
  ),
});
