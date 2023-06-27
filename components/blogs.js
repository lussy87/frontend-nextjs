import Image from "next/image";
// import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from "./container";

import userOneImg from "../public/img/user1.jpg";
import userTwoImg from "../public/img/user2.jpg";
import userThreeImg from "../public/img/user3.jpg";

const Blogs  = () => {
  const [blogs, setBlogs] = useState([]);

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
              <button>Detail</button>
            </div>
          </div>
        ))}
    </div>
  </Container>
  );
}

// function Avatar(props) {
//   return (
//     <div className="flex items-center mt-8 space-x-3">
//       <div className="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
//         <Image
//           src={props.image}
//           width="40"
//           height="40"
//           alt="Avatar"
//           placeholder="blur"
//         />
//       </div>
//       <div>
//         <div className="text-lg font-medium">{props.name}</div>
//         <div className="text-gray-600 dark:text-gray-400">{props.title}</div>
//       </div>
//     </div>
//   );
// }

// function Mark(props) {
//   return (
//     <>
//       {" "}
//       <mark className="text-indigo-800 bg-indigo-100 rounded-md ring-indigo-100 ring-4 dark:ring-indigo-900 dark:bg-indigo-900 dark:text-indigo-200">
//         {props.children}
//       </mark>{" "}
//     </>
//   );
// }

export default Blogs;