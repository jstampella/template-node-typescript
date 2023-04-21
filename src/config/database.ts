import 'dotenv/config';

interface IConfig {
  [index: string]: string;
  default: string;
  main: string;
  admin: string;
}

const url = <string>process.env.DB_URI;

export const config: IConfig = {
  default: 'main',
  main: url,
  admin: url,
};
