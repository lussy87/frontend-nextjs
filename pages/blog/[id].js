import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Container from '../../components/container';
import Navbar from '../../components/navbar';


const BlogDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`https://gorest.co.in/public/v2/posts/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`https://gorest.co.in/public/v2/comments?post_id=${id}`);
        setComments(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://gorest.co.in/public/v2/users');
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlog();
    fetchComments();
    fetchUsers();
  }, [id]);

  
  const getUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : '';
  };

  return (
    <>
    <Navbar />

    <Container>
      <div className="flex flex-col gap-10">
     
      <div className="flex items-center mb-4">
      <a href="/">
          <a className="flex items-center text-gray-500 dark:text-gray-300 hover:text-indigo-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <h1 className="text-3xl font-bold">Detail Blog</h1>
          </a>
        </a>
      </div>
        {blog && users.length > 0 ? (
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 dark:bg-trueGray-800">
            <h2><strong>Title:</strong> {blog.title}</h2>
            <p><strong>Body:</strong> {blog.body}</p>

            <h3><strong>Comments:</strong></h3>
            {comments.map((comment) => (
              <div key={comment.id}>
                <p>{comment.body}</p>
                <p>{getUserName(comment.user_id)}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Container>
    </>
  );
};

export default BlogDetail;
