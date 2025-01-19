import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS, DELETE_USER, UPDATE_USER } from '../graphql/queries';

const UserList = () => {
    const { loading, error, data } = useQuery(GET_USERS);
    const [deleteUser] = useMutation(DELETE_USER);
    const [updateUser] = useMutation(UPDATE_USER, {
        refetchQueries: [{ query: GET_USERS }],
    });

    const [editingUserId, setEditingUserId] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '' });

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

    const handleEdit = (user) => {
        setEditingUserId(user.id);
        setFormData({ name: user.name, email: user.email });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        await updateUser({
            variables: { id: editingUserId, name: formData.name, email: formData.email },
        });
        setEditingUserId(null);
        setFormData({ name: '', email: '' });
    };

    return (
        <div className="max-w-2xl mx-auto mt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">User List</h2>
            <ul className="bg-white shadow-md rounded-lg divide-y divide-gray-200">
                {data.users.map((user) => (
                    <li key={user.id} className="p-4 flex justify-between items-center gap-10">
                        {editingUserId === user.id ? (
                            <form onSubmit={handleUpdate} className="w-full flex gap-2">
                                <input
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    placeholder="Name"
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    placeholder="Email"
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditingUserId(null)}
                                    className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
                                >
                                    Cancel
                                </button>
                            </form>
                        ) : (
                            <>
                                <div>
                                    <p className="font-medium text-gray-800">{user.name}</p>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(user)}
                                        className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            deleteUser({
                                                variables: { id: user.id },
                                                refetchQueries: [{ query: GET_USERS }],
                                            })
                                        }
                                        className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
