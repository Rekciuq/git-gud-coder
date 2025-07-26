import { appRouter, responseMeta } from "@/lib/trpc/server/_app";
import { createContext } from "@/lib/trpc/server/context";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext,
    responseMeta,
  });
export { handler as GET, handler as POST };
