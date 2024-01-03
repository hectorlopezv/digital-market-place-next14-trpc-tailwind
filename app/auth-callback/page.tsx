"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { trpc } from "../_trp-client/client";
import { Loader2 } from "lucide-react";

export default function AuthCallBack() {
  const router = useRouter();
  const searchParamms = useSearchParams();
  const origin = searchParamms.get("origin");
  trpc.authCallback.useQuery(undefined, {
    onSuccess: (data) => {
      if (data?.success) {
        router.push(origin ? `/${origin}` : "/dashboard");
      }
    },
    onError: (error) => {
      if (error.data?.code === "UNAUTHORIZED") {
        router.push("/sign-in");
      }
    },
    retry: true,
    retryDelay: 500,
  });
  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
        <h3 className="font-semibold text-xl">Setting up your account...</h3>
        <p>you will be redirected automatically</p>
      </div>
    </div>
  );
}
