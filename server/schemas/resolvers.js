const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find()
        },
        user: async (parent, args, context) => {
            if (context.user) {
            return User.findOne({ _id: context.user._id });
        }
        throw new AuthenticationError('You need to be logged in!');
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
        addBook: async (parent, { bookInfo }, context) => {
            if (context.user) {
                console.log(context.user)
                // this looks good too
                const updatedBookStore = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: bookInfo } }, 
                    { new: true }
                );
                return updatedBookStore
            }
            throw new AuthenticationError('Please Log in')
        }
        
    },
};


module.exports = resolvers;