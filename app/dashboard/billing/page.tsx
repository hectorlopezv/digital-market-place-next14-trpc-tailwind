import BillingForm from "@/components/billing-form";
import { getUserSubscriptionPlan } from "@/lib/integrations/stripe";
import React from "react";

type Props = {};

export default async function DashboardBilling({}: Props) {
  const subscription = await getUserSubscriptionPlan();

  return <BillingForm subscriptionPlan={subscription} />;
}
