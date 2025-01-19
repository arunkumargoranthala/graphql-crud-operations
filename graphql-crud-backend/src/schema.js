const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
    }

    type Query {
        users: [User]
        user(id: ID!): User
    }

    type Mutation {
        createUser(name: String!, email: String!): User
        updateUser(id: ID!, name: String, email: String): User
        deleteUser(id: ID!): String
    }

    type AuthPayload {
    token: String!
    user: User!
    }

    extend type Mutation {
        signup(name: String!, email: String!, password: String!): AuthPayload
        login(email: String!, password: String!): AuthPayload
    }
`;

module.exports = typeDefs;
