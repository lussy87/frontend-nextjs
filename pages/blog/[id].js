import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Container from '../../components/container';

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
    <Container>
      <div className="flex flex-col gap-10">
        <h1 className="text-3xl font-bold">Detail Blog</h1>
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
  );
};

export default BlogDetail;