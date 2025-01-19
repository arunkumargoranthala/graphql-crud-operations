import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER, GET_USERS } from '../graphql/queries';

const UserForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [createUser] = useMutation(CREATE_USER, {
        refetchQueries: [{ query: GET_USERS }],
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createUser({ variables: { name, email } });
        setName('');
        setEmail('');
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-8 space-y-4"
        >
            <h2 className="text-xl font-bold text-gray-800">Add New User</h2>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
            >
                Add User
            </button>
        </form>
    );
};

export default UserForm;
