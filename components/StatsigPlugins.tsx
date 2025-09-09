"use client";

import { useEffect } from "react";
import { useStatsigClient } from "@statsig/react-bindings";
import { StatsigAutoCapturePlugin } from "@statsig/web-analytics";
import { StatsigSessionReplayPlugin } from "@statsig/session-replay";

export default function StatsigPlugins(): null {
  const { client } = useStatsigClient();

  useEffect(() => {
    if (!client) return;
    // Bind desired plugins to the initialized client on the client side
    try {
      new StatsigAutoCapturePlugin().bind(client);
    } catch {}
    try {
      new StatsigSessionReplayPlugin().bind(client);
    } catch {}
  }, [client]);

  return null;
}
