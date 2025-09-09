'use client';

import { StatsigBootstrapProvider } from '@statsig/next';
import { LogLevel, StatsigOptions, LogEventCompressionMode } from "@statsig/react-bindings";
import { StatsigAutoCapturePlugin } from '@statsig/web-analytics';
import { StatsigSessionReplayPlugin } from '@statsig/session-replay';

export function StatsigProvider({ children }: { children: React.ReactNode }) {
  const initialUser = { 
    userID: "test_override",
    custom: {
      user_type: 'patient',
      early_access: true
    }
  };

  const clientOptions: StatsigOptions = {
    environment: { tier: 'production' },
    logEventCompressionMode: LogEventCompressionMode.Disabled,
    logLevel: LogLevel.Debug,
    plugins: [
      new StatsigAutoCapturePlugin(),
      new StatsigSessionReplayPlugin()
    ]
  };

  return (
    <StatsigBootstrapProvider
      user={initialUser}
      clientKey={process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY || ''}
      serverKey={process.env.STATSIG_SERVER_KEY || ''}
      clientOptions={clientOptions}
    >
      {children}
    </StatsigBootstrapProvider>
  );
}
