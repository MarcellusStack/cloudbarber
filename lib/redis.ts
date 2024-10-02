import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis";
import { getTranslations } from "next-intl/server";

// Create a new ratelimiter, that allows 10 requests per 10 seconds
export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(50, "30 s"),
  analytics: true,
  /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */
  prefix: "@upstash/ratelimit",
});

export const rateLimit = async (identifier: string) => {
  if (process.env.NODE_ENV === "development") return;
  const t = await getTranslations("RateLimit");
  const { success } = await ratelimit.limit(identifier);

  if (!success) {
    throw new Error(t("tooManyRequests"));
  }
  return success;
};
