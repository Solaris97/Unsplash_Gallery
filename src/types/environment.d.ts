export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
        UNSPLASH_API_KEY: string;
        UNSPLASH_ACCESS_TOKEN: string;
    }
  }
}