
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import { BrowserRouter } from 'react-router-dom';


const Users  = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  // const navigate = useNavigate();
  

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get('https://gorest.co.in/public/v2/users');
  //       setUsers(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  
  //   fetchUsers();
  // }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  // const fetchUsers = async () => {
  //   try {
  //     const response = await axios.get('https://gorest.co.in/public/v2/users', {
  //       headers: {
  //         Authorization: 'Bearer ACCESS-TOKEN' // Ganti dengan kunci API yang valid
  //       }
  //     });
  //     setUsers(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://gorest.co.in/public/v2/users');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  // const createUser = async (user) => {
  //   try {
  //     await axios.post('https://gorest.co.in/public/v2/users', user);
  //     fetchUsers();
  //     closeModal();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const createUser = async (user) => {
    try {
      const response = await axios.post('https://gorest.co.in/public/v2/users', user, {
        headers: {
          Authorization: 'Bearer ACCESS-TOKEN' // Ganti dengan kunci API yang valid
        }
      });
      fetchUsers(response.data);
      // fetchUsers();
      closeModal();
      // navigate('/users');
    } catch (error) {
      console.error(error);
    }
  };

  // const editUser = async (user) => {
  //   try {
  //     await axios.put(`https://gorest.co.in/public/v2/users/${user.id}`, user);
  //     fetchUsers();
  //     closeModal();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const editUser = async (user) => {
    try {
      const response = await axios.put(`https://gorest.co.in/public/v2/users/${user.id}`, user, {
        headers: {
          Authorization: 'Bearer ACCESS-TOKEN' // Ganti dengan kunci API yang valid
        }
      });
      fetchUsers(response.data);
      closeModal();
      // navigate('/users');
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`https://gorest.co.in/public/v2/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      deleteUser(userId);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const user = {
      name: form.name.value,
      email: form.email.value,
      gender: form.gender.value,
      status: form.status.value,
    };

    if (selectedUser) {
      user.id = selectedUser.id;
      editUser(user);
    } else {
      createUser(user);
    }
  };


 
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          className="flex items-center space-x-1 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={openModal}
        >
          <FaPlus />
          <span>Create</span>
        </button>
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Gender
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action  
            </th>
          </tr>
        </thead>
        <tbody>
          {users &&
        users.map((user) => (
            <tr
              key={user.id}
              className="bg-white border-b dark:bg-gray-600 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user.name}
              </td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.gender}</td>
              <td className="px-6 py-4">{user.status}</td>
              <td className="px-6 py-4 text-center">
                <div className="flex justify-center space-x-2">
                  <button
                    type="button"
                    className="flex items-center justify-center font-medium text-white bg-green-500 dark:bg-green-500 dark:text-white-500 px-2 py-1 rounded-md hover:bg-green-600 dark:hover:bg-green-600"
                    onClick={() => handleEdit(user)}
                  >
                    <FaEdit className="mr-1" />
                    Edit
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center font-medium text-white bg-red-500 dark:bg-red-500 dark:text-white-500 px-2 py-1 rounded-md hover:bg-red-600 dark:hover:bg-red-600"
                    onClick={() => handleDelete(user.id)}
                  >
                    <FaTrash className="mr-1" />
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-md">
            <h2 className="text-lg font-medium mb-4">
              {selectedUser ? 'Edit User' : 'Create User'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  defaultValue={selectedUser ? selectedUser.name : ''}
                  className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  defaultValue={selectedUser ? selectedUser.email : ''}
                  className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border rounded-md"
                />
              </div>
              <div className="mb-4">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  required
                  defaultValue={selectedUser ? selectedUser.gender : ''}
                  className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border rounded-md"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  required
                  defaultValue={selectedUser ? selectedUser.status : ''}
                  className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border rounded-md"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 mr-2 border rounded-md text-gray-600 hover:text-gray-800 focus:outline-none"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  {selectedUser ? 'Save' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
   
    </div>
  );
};


export default Users;