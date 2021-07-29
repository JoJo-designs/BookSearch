import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
query getBooks {
    user {
      _id
      savedBooks {
        _id
        title
        link
        description
        image
      }
    }
  }
`;