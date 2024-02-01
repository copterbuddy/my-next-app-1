import { headers } from "next/headers";

export default function Page() {
  const headerRequest = headers();
  const user = JSON.parse(headerRequest?.get("user") ?? '');
  return (
    <div>
      Manage Blog page
      <div>{user?.email}</div>
    </div>
  );
}
