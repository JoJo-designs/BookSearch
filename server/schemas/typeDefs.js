const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        savedBooks: [Book]!
    }

    type Book {
        _id: ID
        authors: String
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type Auth {
        token: ID!
        user: User
      }

    type Query {
        users: [User]!
    }

    type Mutations {
        addUser(userName: String!, email: String!, password: String!): User
        loginUser(userName: String!, email: String!, password: String!): User
    }
`;

module.exports = typeDefs