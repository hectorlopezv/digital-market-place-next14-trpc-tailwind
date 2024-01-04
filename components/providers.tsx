"use client";

import { trpc } from "@/app/_trp-client/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { PropsWithChildren, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
interface Props extends PropsWithChildren {}

export default function Providers({ children }: Props) {
  const [queryClient, _] = useState(() => new QueryClient());
  const [trcpClient, __] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3000/api/trpc",
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trcpClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
