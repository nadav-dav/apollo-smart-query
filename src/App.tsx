import React from 'react';
import './App.css';
import { client } from './apollo';
import { ApolloProvider } from '@apollo/client';
import { AddOne, Display } from './Display';

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <AddOne />
        <Display />
      </div>
    </ApolloProvider>
  );
}

export default App;
