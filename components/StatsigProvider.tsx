import { StatsigBootstrapProvider } from '@statsig/next';

export default async function StatsigProvider({ children }: { children: React.ReactNode }) {
  const initialUser = { 
    userID: "test_override",
    custom: {
      user_type: 'patient',
      early_access: true
    }
  };

  return (
    <StatsigBootstrapProvider
      user={initialUser}
      clientKey={process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY || ''}
      serverKey={process.env.STATSIG_SERVER_KEY || ''}
    >
      {children}
    </StatsigBootstrapProvider>
  );
}
