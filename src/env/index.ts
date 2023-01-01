import { cleanEnv, str, num, url } from 'envalid';
import { AppConfig, NodeEnv } from './types';

const env = cleanEnv(process.env, {
  INFURA_API_KEY: str(),
  INFURA_SECRET: str(),
  INFURA_URL: url(),
  NODE_ENV: str({ choices: Object.values(NodeEnv) }),
  PORT: num({ default: 3000 }),
});

export const appConfig: AppConfig = {
  port: env.PORT,
  nodeEnv: env.NODE_ENV,
  infura: {
    apiKey: env.INFURA_API_KEY,
    apiSecret: env.INFURA_SECRET,
    url: env.INFURA_URL,
  },
  isProduction: env.isProduction,
  isDev: env.isDev,
  isTest: env.isTest,
};
