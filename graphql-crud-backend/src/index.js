const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const connectDB = require('./db');

dotenv.config();

const app = express();
app.use(cors());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: err.message });
 });
 

const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });

    await connectDB();

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
    });
}

startServer();
