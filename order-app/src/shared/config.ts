import * as configLib from 'config';

type Config = {
  server: {
    port: number;
  };
  mongodb: {
    uri: string;
  };
  redis: {
    host: string;
    port: number;
  };
  microservices: {
    payment: {
      baseUrl: string;
    };
  };
};

export const config: Config = configLib.get('config');
