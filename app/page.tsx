import Link from 'next/link'

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
  const blogs: Blog[] = await getBlogs();
  console.log(blogs);
  return (
    <div>
      Test Page
      {blogs.map((blog: any, index: number) => (
        <div key={blog.id}>
          <div>
            {blog.id} {blog.name} 
            <Link href={`/blog/${blog.id}`} className="px-4 bg-blue-400">Go to Read Blog</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
// {blog.content.substring(0, 20)}

interface Blog {
  id: number;
  name: String;
  content: String;
}
