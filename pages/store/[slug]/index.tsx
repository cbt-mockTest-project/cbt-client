import ItemDetailComponent from '@components/store/detail/ItemDetailComponent';
import {
  GET_APPROVED_ITEM_IDS_AND_SLUGS_QUERY,
  GET_ITEM_QUERY,
} from '@lib/graphql/query/itemQuery';
import {
  GetApprovedItemIdsAndsSlugsQuery,
  GetItemQuery,
  GetItemQueryVariables,
} from '@lib/graphql/query/itemQuery.generated';
import { apolloClient } from '@modules/apollo';
import { storeItemActions } from '@modules/redux/slices/storeItem';
import wrapper from '@modules/redux/store/configureStore';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Item } from 'types';

const StoreItemDetailPage: NextPage = () => {
  return <ItemDetailComponent />;
};

export default StoreItemDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: { params: { slug: string } }[] = [];
  try {
    const res = await apolloClient.query<GetApprovedItemIdsAndsSlugsQuery>({
      query: GET_APPROVED_ITEM_IDS_AND_SLUGS_QUERY,
    });
    if (res.data.getApprovedItemIdsAndsSlugs.ok) {
      paths = res.data.getApprovedItemIdsAndsSlugs.slugs.map((slug) => ({
        params: { slug },
      }));
    }
    return { paths, fallback: 'blocking' };
  } catch (err) {
    return {
      paths,
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {
    try {
      const slug = context.params?.slug as string;
      if (typeof slug !== 'string') {
        return {
          notFound: true,
          revalidate: 1,
        };
      }
      const res = await apolloClient.query<GetItemQuery, GetItemQueryVariables>(
        {
          query: GET_ITEM_QUERY,
          variables: {
            input: {
              urlSlug: slug,
            },
          },
        }
      );
      if (!res.data.getItem.ok) {
        return {
          notFound: true,
          revalidate: 1,
        };
      }
      store.dispatch(storeItemActions.setItem(res.data.getItem.item as Item));
    } catch (e) {
      console.log(e);
      return {
        notFound: true,
        revalidate: 1,
      };
    }
  }
);
