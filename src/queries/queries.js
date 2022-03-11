import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
  query getBooks {
    books (limit: 30, start: 1) {
      id
      title
      publisher
      release_date
      number_of_purchases
      likes
      rating
      price
      currency
      available_copies
      featured
      image_url
      published_at
      tags {
        name
      }
      genres {
        name
      }
      authors {
        name
      }
    }
  }
`;

export const GET_BOOK = (id) => gql`
  query getBook {
    book (id: ${id}) {
      id
      title
      subtitle
      publisher
      release_date
      number_of_purchases
      likes
      rating
      full_description
      price
      currency
      available_copies
      featured
      image_url
      published_at
      tags {
        name
      }
      genres {
        name
      }
      authors {
        name
      }
    }
  }
`;

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

