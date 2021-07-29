const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String!
        email: String
        password: String
        savedBooks: [Book]
    }

    type Book {
        _id: ID!
        authors: [String]
        description: String
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
        user: User
    }

    input BookInterface {
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        loginUser(email: String!, password: String!): Auth
        addBook(bookInfo: BookInterface!): User
    }
`;

module.exports = typeDefs
