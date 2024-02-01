import { headers } from "next/headers";
import Link from "next/link";

async function getBlogs() {
  const response = await fetch(
    "https://65b0d8e5d16d31d11bdd62cc.mockapi.io/api/data/Blogs"
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export default async function Page() {
  const headerRequest = headers();
  const user = JSON.parse(headerRequest?.get("user") ?? "");

  const blogs: Blog[] = await getBlogs();

  return (
    <div>
      Manage Blog page
      <div>{user?.email}</div>
      <div>
        {blogs.map((blog: any, index: number) => (
          <div key={blog.id}>
            <div>
              {blog.id} {blog.name}
              <Link
                href={`/manage/blog/${blog.id}`}
                className="px-4 bg-blue-400"
              >
                Go to Edit Blog
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
