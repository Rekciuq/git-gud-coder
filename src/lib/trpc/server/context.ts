import { type FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export const createContext = (opts: FetchCreateContextFnOptions) => {
  return {
    req: opts.req,
    resHeaders: opts.resHeaders,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
