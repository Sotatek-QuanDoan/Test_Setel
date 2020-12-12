import * as configLib from 'config';

type Config = {
  server: {
    port: number;
  };
};

export const config: Config = configLib.get('config');
