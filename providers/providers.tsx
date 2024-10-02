"use client";
import React from "react";
import { PostHogProvider } from "./post-hog-provider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <PostHogProvider>{children}</PostHogProvider>;
};
