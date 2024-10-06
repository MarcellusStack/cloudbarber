import { z } from "zod";

export const createOrganizationSchema = z.object({
  tenantName: z.string().min(1),
  organizationName: z.string().min(1),
  street: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  postalCode: z.string().min(1),
  country: z.string().min(1),
  users: z.array(
    z.object({
      email: z.string().email(),
    })
  ),
});
