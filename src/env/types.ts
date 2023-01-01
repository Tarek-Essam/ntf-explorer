export enum NodeEnv {
  development = 'development',
  test = 'test',
  staging = 'staging',
  production = 'production',
}

export interface AppConfig {
  port: number;
  infura: {
    apiKey: string;
    apiSecret: string;
    url: string;
  };
  isProduction: boolean;
  isTest: boolean;
  isDev: boolean;
  nodeEnv: NodeEnv;
}
