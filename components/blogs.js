import Image from "next/image";
// import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from "./container";
import { useRouter } from 'next/router';




const Blogs  = () => {
  const [blogs, setBlogs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://gorest.co.in/public/v2/posts');
        setBlogs(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchBlogs();
  }, []);

  const handleDetailClick = (blogId) => {
    router.push(`/blog/${blogId}`);
  };
  
  return (
    <Container>
    <div className="flex flex-col gap-10">
      {blogs &&
        blogs.map((blog, index) => (
          <div className="lg:col-span-2 xl:col-auto" key={index}>
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 dark:bg-trueGray-800">
            <p className="text-3xl leading-normal text-red-500 text-start group-hover:text-white">{blog.title}</p>
            <br />
            <p className="text-base">{blog.body}</p>
            <br />
            <div className="text-left">
            <button
                    className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full inline-block text-[17px]"
                    onClick={() => handleDetailClick(blog.id)}
                  >
                    Detail
                  </button>
            </div>
          </div>
        </div>
    
        ))}
    </div>
  </Container>
  );
}


export default Blogs;