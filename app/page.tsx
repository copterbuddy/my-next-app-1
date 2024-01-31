async function getBlogs() {
  const response = await fetch(
    "https://65b0d8e5d16d31d11bdd62cc.mockapi.io/api/data/Blogs"
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export default async function Page(/*{ params }: { params: { slug: string } }*/) {
  const blogs: Blogs[] = await getBlogs();

  return (
    <div>
      Test Page
      {blogs.map((blog: any, index: number) => (
        <div key={blog.id}>
          <div>
            {blog.id} {blog.name} {blog.content}
            <button className="px-4 bg-blue-400">Go to Read Blog</button>
          </div>
        </div>
      ))}
    </div>
  );
}

interface Blogs {
  id: number;
  name: String;
  content: String;
}
