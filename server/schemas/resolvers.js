const { User } = require('../models');

const resolvers = {
    Query: {
        users: async () => {
            return User.find()
        },
        user: async (parent, { email }) => {
            return User.findOne({email: email})
        },
    },

    Mutation: {
        addUser: async (parent, { userName, email, password }) => {
            const user = await User.create({ userName, email, password });
        },
    },
};


module.exports = resolvers;