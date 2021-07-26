const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

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
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        loginUser: async (parent, { email, password }) => {
            console.log("logging in mutation")
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address')
            }

            const correctPassword = await user.isCorrectPassword(password)

            if (!correctPassword) {
                throw new AuthenticationError('Incorrect credentials. Please try again')
            }
            const token = signToken(user);

            return { token, user };
        },
        addBook: async (parent, { bookToSave }, context) => {
            if (context.user) {
                console.log(context.user)
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                        $push: { bookToSave: bookToSave },
                    }, 
                    {
                    new: true,
                    }
                );
            }
            throw new AuthenticationError('Please Log in')
        }
        
    },
};


module.exports = resolvers;