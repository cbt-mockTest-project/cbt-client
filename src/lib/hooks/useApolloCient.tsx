import { NormalizedCacheObject } from '@apollo/client';
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
    query: any,
    updateFunction: (previousData: T) => T
  ): void => {
    const currentData = client.readQuery<T>({ query });
    if (!currentData) return;

    const newData = updateFunction(currentData);

    client.writeQuery<T>({
      query,
      data: newData,
    });
  };

  return { client, updateCache };
};

export default useApolloClient;
