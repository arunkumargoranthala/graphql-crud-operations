import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
});

const App = () => (
    <ApolloProvider client={client}>
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">GraphQL CRUD App</h1>
            <UserForm />
            <UserList />
        </div>
    </ApolloProvider>
);

export default App;
