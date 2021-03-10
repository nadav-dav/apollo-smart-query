import { gql, useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { useSmartQuery } from './smartQuery';

export function Display() {
  const { data } = useSmartQuery(gql`
    query GetCount {
      counter @client
    }
  `);
  return (
    <div
      style={{
        height: 100,
        width: 100,
        display: 'flex',
        background: 'beige',
        textAlign: 'center',
        alignItems: 'center',
      }}
    >
      The count is {data?.counter}
    </div>
  );
}

export function AddOne() {
  const [addOne] = useMutation(gql`
    mutation AddOne {
      addOne @client
    }
  `);
  return (
    <span>
      <button
        style={{ padding: '20px' }}
        onClick={() => {
          addOne();
        }}
      >
        Add one!
      </button>
    </span>
  );
}
