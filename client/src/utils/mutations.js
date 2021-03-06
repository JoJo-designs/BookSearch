import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
    _id
    username
  }
  } 
}
`;

export const LOGIN_USER = gql`
mutation loginUser($email: String!, $password: String!) {
  loginUser(email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;

export const ADD_BOOK = gql`
  mutation addBook($bookInfo: BookInterface!) {
    addBook(bookInfo: $bookInfo) {
      _id
      username
      email
      savedBooks {
        authors
        image
        description
        title
        link
      }
    }
  }
`;