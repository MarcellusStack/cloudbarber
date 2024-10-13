"use client";
import React from "react";
import { PostHogProvider } from "./post-hog-provider";
import { ReactQueryProvider } from "./react-query-provider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactQueryProvider>
      <PostHogProvider>{children}</PostHogProvider>
    </ReactQueryProvider>
  );
};
