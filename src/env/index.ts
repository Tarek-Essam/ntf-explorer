import { cleanEnv, str, num } from 'envalid';
import { AppConfig, NodeEnv } from './types';

const env = cleanEnv(process.env, {
  MORALIS_API_KEY: str(),
  NODE_ENV: str({ choices: Object.values(NodeEnv) }),
  PORT: num({ default: 3000 }),
});

export const appConfig: AppConfig = {
  port: env.PORT,
  nodeEnv: env.NODE_ENV,
  moralis: {
    apiKey: env.MORALIS_API_KEY,
  },
  isProduction: env.isProduction,
  isDev: env.isDev,
  isTest: env.isTest,
};
