"use client";

import React from "react";

import {
  LogLevel,
  StatsigProvider,
  StatsigOptions,
  LogEventCompressionMode,
  useClientBootstrapInit, // <- Add this
} from "@statsig/react-bindings";
import { StatsigAutoCapturePlugin } from '@statsig/web-analytics';
import { StatsigSessionReplayPlugin } from '@statsig/session-replay';

export default function MyStatsig({
  children,
  values,
}: {
  values: string;
  children: React.ReactNode;
}) {
  // Update to using useClientBootstrapInit instead of auto initializing in the provider
  const sdkKey = process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY!;
  const initialUser = { 
    userID: "test_override",
    custom: {
       user_type: 'patient',
       early_access: true
     }
  };
  const bootstrapValues = values;
  const options: StatsigOptions = {
    environment: { tier: 'production' }, // development staging production
    logEventCompressionMode: LogEventCompressionMode.Disabled,
    logLevel: LogLevel.Debug,
    plugins: [
      new StatsigAutoCapturePlugin(),
      new StatsigSessionReplayPlugin()
    ]
  };

  const client = useClientBootstrapInit(sdkKey, initialUser, bootstrapValues, options);

  return <StatsigProvider client={client}>{children}</StatsigProvider>;
}