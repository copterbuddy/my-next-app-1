"use client";

import { useState, useEffect, ChangeEvent } from "react";

async function getBlog(slug: string) {
  const response = await fetch(
    `https://65b0d8e5d16d31d11bdd62cc.mockapi.io/api/data/Blogs/${slug}`
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const blogData: Blog = await response.json();
  return blogData;
}

export default function Page({ params }: { params: { slug: string } }) {
  const [blogState, setBlogState] = useState<Blog | undefined>();

  const initBlog = async () => {
    console.log("initBlog");
    try {
      const result: Blog = await getBlog(params.slug);
      setBlogState(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initBlog();
    console.log("useEffect");
  }, []);

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setBlogState((prevState: Blog | undefined) => ({
      ...prevState!,
      [name]: value ?? null,
    }));
  }

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) =>  {
    event.preventDefault();
    console.log(`Form Submitted id ${params.slug}`, blogState);
    try {
         const response = await fetch(`https://65b0d8e5d16d31d11bdd62cc.mockapi.io/api/data/Blogs/${params.slug}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(blogState)
         })

         if (!response.ok) {
            throw new Error(response.statusText);
         }

         const responseData: Blog = await response.json();
         console.log('Form Submitted', responseData)
    } catch (error) {
        console.error('there was a ploblem with the fetch operation, Error:', error)
    }
  }

  return (
    <div>
      ID: {params.slug}
      <div>Blog Name: {blogState?.name}</div>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          className="bg-success"
          value={blogState?.name ?? ""}
          onChange={handleChange}
        />
        <div>Blog Content: {blogState?.content}</div>
        <button>Update</button>
      </form>
    </div>
  );
}
