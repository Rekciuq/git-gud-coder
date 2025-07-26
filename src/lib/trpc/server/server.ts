import "server-only";

import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { cache } from "react";
import { headers } from "next/headers";
import { makeQueryClient } from "../client/query-client";
import { appRouter } from "./_app";
import { createContextInner } from "./context";

export const getQueryClient = cache(makeQueryClient);

export const trpc = createTRPCOptionsProxy({
  ctx: async () => {
    const readOnlyHeaders = await headers();

    const requestHeaders = new Headers(readOnlyHeaders);

    return createContextInner({ headers: requestHeaders });
  },
  router: appRouter,
  queryClient: getQueryClient,
});
