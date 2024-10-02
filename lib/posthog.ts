import { PostHog } from "posthog-node";
export const posthog = new PostHog(
  process.env.NEXT_PUBLIC_POSTHOG_KEY as string,
  {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  }
);

export const trackEvent = async (userId: string, event: string) => {
  const posthog = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  });
  posthog.capture({ event, distinctId: userId });
  await posthog.shutdown();
};
