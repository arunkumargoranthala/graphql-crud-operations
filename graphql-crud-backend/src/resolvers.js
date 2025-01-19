const User = require('./models/User');
const userSchema = require('./validators/userValidator');

const resolvers = {
    Query: {
        users: async () => await User.find(),
        user: async (_, { id }) => await User.findById(id),
    },
    Mutation: {
        createUser: async (_, { name, email }) => {
            // Validate input
            const { error } = userSchema.validate({ name, email });
            if (error) throw new Error(error.details[0].message);

            // Create user
            const user = new User({ name, email });
            await user.save();
            return user;
        },
        updateUser: async (_, { id, name, email }) => {
            // Validate input
            const { error } = userSchema.validate({ name, email });
            if (error) throw new Error(error.details[0].message);

            // Update user
            return await User.findByIdAndUpdate(id, { name, email }, { new: true });
        },
        deleteUser: async (_, { id }) => {
            await User.findByIdAndDelete(id);
            return `User with ID ${id} deleted`;
        },
    },
};

module.exports = resolvers;
