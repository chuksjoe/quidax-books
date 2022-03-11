import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { cartItemsVar } from './caches/cart';


const client = new ApolloClient({
  uri: 'https://quidax-feec-graphql.herokuapp.com/graphql',
  cache: new InMemoryCache({
    typePolicies: { // Type policy map
      books: {
        fields: { // Field policy map for the Product type
          new_count: { // Field policy for the new_count field
            read(_, { variables }) { // The read function for the new_count field
              return localStorage.getItem('CART').includes(
                variables.productId
              );
            }
          }
        }
      },
      book: {
        fields: { // Field policy map for the Product type
          new_count: { // Field policy for the new_count field
            read(_, { variables }) { // The read function for the new_count field
              return localStorage.getItem('CART').includes(
                variables.productId
              );
            }
          }
        }
      },
      Query: {
        fields: {
          cartItems: {
            read() {
              return cartItemsVar();
            }
          }
        }
      }
    }
  })
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
