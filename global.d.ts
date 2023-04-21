declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    PORT: string;
    MONGO_USERNAME: string;
    MONGO_PASSWORD: string;
    MONGO_HOSTNAME: string;
    MONGO_PORT: string;
    MONGO_DB: string;
    SECRET_JWT_SEED: string;
  }
}
