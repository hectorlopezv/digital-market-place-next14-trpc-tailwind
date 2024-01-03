import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "@/trpc-config";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

export const trpc = createTRPCReact<AppRouter>({});
