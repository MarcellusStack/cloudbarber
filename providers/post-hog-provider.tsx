"use client";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { usePostHog } from "posthog-js/react";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const PostHogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useEffect(() => {
    const isLocalhost = window.location.hostname === "localhost";

    if (!isLocalhost) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        opt_out_capturing_by_default: false,
      });
    }
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
};

const PostHogPageView = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();
  useEffect(() => {
    // Track pageviews
    if (pathname && posthog) {
      let url = window.origin + pathname;
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      posthog.capture("$pageview", {
        $current_url: url,
      });
    }
  }, [pathname, searchParams, posthog]);

  return null;
};

export default PostHogPageView;
