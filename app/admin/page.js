import { redirect } from "next/navigation";

export default function AdminPage() {
  const backendUrl =
    process.env.BACKEND_URL?.replace(/\/+$/, "") ||
    "http://127.0.0.1:8000";

  redirect(`${backendUrl}/admin`);
}
