"use client";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { trpc } from "@/app/_trp-client/client";

type Props = {};

export default function UpgradeButton({}: Props) {
  const { mutate: createStripeSession } = trpc.createStripeSession.useMutation({
    onSuccess: ({ url }) => {
      window.location.href = url ?? "/dashboard/billing";
    },
  });
  return (
    <Button onClick={() => createStripeSession()}>
      upgrade now <ArrowRight className="h-5 w-5 ml-1.5" />{" "}
    </Button>
  );
}
