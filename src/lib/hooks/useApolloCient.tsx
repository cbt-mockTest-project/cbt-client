import {
  DataProxy,
  NormalizedCacheObject,
  OperationVariables,
} from '@apollo/client';
import { initializeApollo } from '@modules/apollo';
import { useMemo } from 'react';

const useApolloClient = (
  initialState: NormalizedCacheObject = {},
  token: string = ''
) => {
  const client = useMemo(
    () => initializeApollo(initialState, token),
    [initialState, token]
  );

  const updateCache = <T,>(
    query: DataProxy.Query<OperationVariables, T>,
    updateFunction: (previousData: T) => T
  ): void => {
    const currentData = client.readQuery<T>(query);
    if (!currentData) return;

    const newData = updateFunction(currentData);
    client.writeQuery<T>({
      query: query.query,
      variables: query.variables,
      data: newData,
    });
  };

  return { client, updateCache };
};

export default useApolloClient;
