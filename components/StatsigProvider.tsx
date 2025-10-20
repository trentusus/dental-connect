import { StatsigBootstrapProvider } from '@statsig/next';
import { LogEventCompressionMode, LogLevel } from '@statsig/client-core';

export default async function StatsigProvider({ children }: { children: React.ReactNode }) {
  const initialUser = {
    userID: "test_override",
    custom: {
      user_type: 'patient',
      early_access: true
    }
  };
  // run on client only
  const decision = typeof window === 'undefined' ? 'disabled' : window.localStorage.getItem("statsig_consent");
  console.log(decision);

  return (
    <StatsigBootstrapProvider
      user={initialUser}
      clientKey={process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY || ''}
      serverKey={process.env.STATSIG_SERVER_KEY || ''}
      clientOptions={{ 
        logEventCompressionMode: LogEventCompressionMode.Disabled,
        logLevel: LogLevel.Debug,
        loggingEnabled: decision==='accepted' ? 'browser-only' : 'disabled', 
        disableStorage: false
        
        }
      }
    >
      {children}
    </StatsigBootstrapProvider>
  );
}
