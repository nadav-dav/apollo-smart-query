import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useSmartQuery } from './smartQuery';

export function Timer() {
  const { data } = useSmartQuery(gql`
    query GetTime {
      timer @client
    }
  `);
  return <>The time is {data?.timer}</>;
}
