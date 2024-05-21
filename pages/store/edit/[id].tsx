import StoreCreateComponent from '@components/store/create/StoreCreateComponent';
import { GET_ITEM_REVISION_QUERY } from '@lib/graphql/query/itemQuery';
import {
  GetItemRevisionQuery,
  GetItemRevisionQueryVariables,
} from '@lib/graphql/query/itemQuery.generated';
import { handleError } from '@lib/utils/utils';
import { apolloClient } from '@modules/apollo';
import { message } from 'antd';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ItemRevision } from 'types';

const StoreCreatePage: NextPage = () => {
  const router = useRouter();
  const [defaultValues, setDefaultValues] = useState<ItemRevision | null>(null);
  useEffect(() => {
    if (typeof router.query.id !== 'string') return;
    apolloClient
      .query<GetItemRevisionQuery, GetItemRevisionQueryVariables>({
        query: GET_ITEM_REVISION_QUERY,
        variables: { input: { id: Number(router.query.id) } },
      })
      .then(({ data }) => {
        if (data.getItemRevision.ok) {
          setDefaultValues(data.getItemRevision.itemRevision as ItemRevision);
        } else {
          message.error(data.getItemRevision.error);
        }
      })
      .catch((error) => {
        handleError(error);
      });
  }, [router.query.id]);

  return (
    <>
      {defaultValues && <StoreCreateComponent defaultValues={defaultValues} />}
    </>
  );
};

export default StoreCreatePage;
