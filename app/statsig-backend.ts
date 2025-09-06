// app/statsig-backend.ts

import { Statsig, StatsigUser, StatsigOptions } from '@statsig/statsig-node-core';

const specs: string | null = null; // What does this line do? it's not used
const options: StatsigOptions = { environment: "production" };
const statsig = new Statsig(
  process.env.STATSIG_SERVER_KEY!,
  options
);

// Initialize statsig with options

const initialize = statsig.initialize();

export async function generateBootstrapValues(): Promise<string> {
  const user = new StatsigUser({     
    userID: "test_override", // contorl_override test_override
    custom: {
       user_type: 'patient'
     } });
  await initialize;
  const values = statsig.getClientInitializeResponse(user, {
    hashAlgorithm: 'djb2',
  }) as string;
  return values;
}