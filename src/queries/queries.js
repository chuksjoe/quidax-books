import { gql } from '@apollo/client';

export const GET_BOOKS = ({ searchText = '' } = {}) => gql`
  query getBooks {
    books (where: {
      _or: [
        { title_contains: "${searchText}" },
        {authors: { name_contains: "${searchText}" }},
        {genres: { name_contains: "${searchText}" }},
        {tags: { name_contains: "${searchText}" }}
      ]}) {
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
      newCount @client
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

export const GET_FEATURED_BOOKS = ({ limit = 30, start = 1 } = {}) => gql`
  query getBooks {
    books (limit: ${limit}, start: ${start}, where: { featured: true }) {
      id
      title
      number_of_purchases
      likes
      rating
      available_copies
      image_url
      published_at
      newCount @client
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
      newCount @client
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

