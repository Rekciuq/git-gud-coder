import { type FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export const createContextInner = (opts: { headers: Headers }) => {
  return {
    headers: opts.headers,
    responseHeaders: new Headers(),
  };
};

export const createContext = (opts: FetchCreateContextFnOptions) => {
  return createContextInner({
    headers: opts.req.headers,
  });
};

export type Context = Awaited<ReturnType<typeof createContextInner>>;
