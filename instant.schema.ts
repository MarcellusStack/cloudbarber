// Docs: https://www.instantdb.com/docs/modeling-data

import { i } from "@instantdb/react";

const _schema = i.schema({
  entities: {
    $files: i.entity({
      path: i.string().unique().indexed(),
      url: i.string(),
    }),
    $users: i.entity({
      activeOrganizationId: i.string().indexed().optional(),
      email: i.string().unique().indexed().optional(),
      firstName: i.string().optional(),
      imageURL: i.string().optional(),
      lastName: i.string().optional(),
      type: i.string().optional(),
      // Billing (User-centric)
      stripeCustomerId: i.string().optional(),
      subscriptionStatus: i.string().optional(), // 'active', 'past_due', 'canceled'
      subscriptionTier: i.string().optional(), // 'free', 'pro'
    }),
    invites: i.entity({
      email: i.string().unique().indexed(),
      role: i.string(), // 'member', 'admin'
      status: i.string(), // 'pending', 'accepted'
    }),
    organizations: i.entity({
      name: i.string(),
    }),
    seats: i.entity({
      available: i.boolean(),
      label: i.string().optional(),
    }),
  },
  links: {
    invitesOrganization: {
      forward: {
        on: "invites",
        has: "one",
        label: "organization",
      },
      reverse: {
        on: "organizations",
        has: "many",
        label: "invites",
      },
    },
    $usersAdminOrganizations: {
      forward: {
        on: "$users",
        has: "many",
        label: "adminOrganizations",
      },
      reverse: {
        on: "organizations",
        has: "many",
        label: "admins",
      },
    },
    $usersLinkedPrimaryUser: {
      forward: {
        on: "$users",
        has: "one",
        label: "linkedPrimaryUser",
        onDelete: "cascade",
      },
      reverse: {
        on: "$users",
        has: "many",
        label: "linkedGuestUsers",
      },
    },
    $usersOrganizations: {
      forward: {
        on: "$users",
        has: "many",
        label: "organizations",
      },
      reverse: {
        on: "organizations",
        has: "many",
        label: "members",
      },
    },
    seatsOrganization: {
      forward: {
        on: "seats",
        has: "one",
        label: "organization",
      },
      reverse: {
        on: "organizations",
        has: "many",
        label: "seats",
      },
    },
    seatsUser: {
      forward: {
        on: "seats",
        has: "one",
        label: "user",
      },
      reverse: {
        on: "$users",
        has: "many",
        label: "seats",
      },
    },
  },
  rooms: {},
});

// This helps TypeScript display nicer intellisense
type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
