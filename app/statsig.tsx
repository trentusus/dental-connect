"use client";

import React from "react";

import {
  LogLevel,
  StatsigProvider,
  StatsigUser,
  useClientBootstrapInit, // <- Add this
} from "@statsig/react-bindings";
import { StatsigAutoCapturePlugin } from '@statsig/web-analytics';

export default function MyStatsig({
  children,
  values,
}: {
  values: string;
  children: React.ReactNode;
}) {
  // Update to using useClientBootstrapInit instead of auto initializing in the provider
  const client = useClientBootstrapInit(
    process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY!,
    { userID: "test_override" },
    values,
    {
      logLevel: LogLevel.Debug,
      plugins: [ new StatsigAutoCapturePlugin() ]
    }
  );

  return <StatsigProvider client={client}>{children}</StatsigProvider>;
}