import DashBoardComponent from "@/components/dashboard";
import { db } from "@/db";
import { getUserSubscriptionPlan } from "@/lib/integrations/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function DashBoard() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || !user.id) {
    redirect("/auth-callback?origin=dashboard");
  }

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });
  if (!dbUser) {
    redirect("/auth-callback?origin=dashboard");
  }
  const subscriptionPlan = await getUserSubscriptionPlan();
  return <DashBoardComponent subscriptionPlan={subscriptionPlan} />;
}
