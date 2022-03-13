import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import './index.css';
import './assets/styles/general.scss';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { cartItemsVar, searchTextVar, showCartVar } from './caches/general';

const client = new ApolloClient({
  uri: 'https://quidax-feec-graphql.herokuapp.com/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Books: {
        fields: {
          newCount: {
            read(_, { readField }) {
              const cart = cartItemsVar();
              const exists = cart.filter((item) => item?.id === readField('id'));
              return readField('available_copies') - (exists?.[0]?.count || 0);
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
          },
          showCart: {
            read() {
              return showCartVar();
            }
          },
          searchText: {
            read() {
              return searchTextVar();
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
