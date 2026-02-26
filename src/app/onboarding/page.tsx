import { redirect } from "next/navigation";
import { onboardUser } from "./actions";

export default async function SyncUserPage() {
  await onboardUser();
  return redirect("/");
} 