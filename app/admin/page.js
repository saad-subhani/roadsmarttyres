import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/+$/, "") ||
    process.env.BACKEND_URL?.replace(/\/+$/, "") ||
    "http://127.0.0.1:8000";

  redirect(`${backendUrl}/admin`);
}
