const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (user) => jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

const authResolvers = {
    Mutation: {
        signup: async (_, { name, email, password }) => {
            const user = new User({ name, email, password });
            await user.save();
            const token = generateToken(user);
            return { token, user };
        },
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) throw new Error('User not found');
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw new Error('Invalid credentials');
            const token = generateToken(user);
            return { token, user };
        },
    },
};

module.exports = authResolvers;
