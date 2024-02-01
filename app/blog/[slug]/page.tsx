async function getBlog(slug: string) {
  const response = await fetch(
    `https://65b0d8e5d16d31d11bdd62cc.mockapi.io/api/data/Blogs/${slug}`
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const blogData : Blog = await response.json();
  return blogData;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const blog: Blog = await getBlog(params.slug);
  console.log('my blog', blog);

  return (<div>ID: {params.slug}
  <div>Blog Name: {blog.name}</div>
  </div>);
}

interface Blog {
  id: number;
  name: String;
  content: String;
}
