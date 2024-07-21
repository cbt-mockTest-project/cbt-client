import React, { useDeferredValue, useMemo } from 'react';

function useDeferredRederingForPaginationItemList<T>(
  items: T[],
  page: number,
  limit: number,
  renderItem: (item: T, index: number) => React.ReactNode
) {
  const deferredPage = useDeferredValue(page);

  const itemList = useMemo(
    () =>
      items
        .slice((deferredPage - 1) * limit, deferredPage * limit)
        .map((item, index) =>
          renderItem(item, index + (deferredPage - 1) * limit)
        ),
    [deferredPage, items, limit, renderItem]
  );

  const AsyncItemList = React.lazy(() =>
    Promise.resolve({ default: () => <>{itemList}</> })
  );

  return AsyncItemList;
}

export default useDeferredRederingForPaginationItemList;
