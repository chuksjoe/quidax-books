import { gql } from '@apollo/client';

export const GET_BOOKS = (limit = 30) => gql`
  query getBooks {
    books (limit: ${limit}, start: 1) {
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
      new_count @client
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
      new_count @client
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

