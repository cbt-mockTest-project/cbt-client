import * as Types from '../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetKeywordSearchCountQueryVariables = Types.Exact<{
  input: Types.GetKeywordSearchCountInput;
}>;


export type GetKeywordSearchCountQuery = { __typename?: 'Query', getKeywordSearchCount: { __typename?: 'GetKeywordSearchCountOutput', error?: string | null, ok: boolean, keywordList?: Array<{ __typename?: 'NaverKeywordSearchCount', monthlyMobileQcCnt: number, monthlyPcQcCnt: number, relKeyword: string }> | null } };

export type GetBlogCategoryListQueryVariables = Types.Exact<{
  input: Types.GetBlogCategoryListInput;
}>;


export type GetBlogCategoryListQuery = { __typename?: 'Query', getBlogCategoryList: { __typename?: 'GetBlogCategoryListOutput', error?: string | null, ok: boolean, postCnt?: number | null, categories?: Array<{ __typename?: 'BlogCategory', categoryName: string, postCnt: number }> | null } };

export type GetSearchAvailabilityQueryVariables = Types.Exact<{
  input: Types.GetSearchAvailabilityInput;
}>;


export type GetSearchAvailabilityQuery = { __typename?: 'Query', getSearchAvailability: { __typename?: 'GetSearchAvailabilityOutput', error?: string | null, ok: boolean, posts?: Array<{ __typename?: 'NaverPostInfo', isSearchAvailability: boolean, commentCnt: number, link: string, logNo: number, sympathyCnt: number, titleWithInspectMessage: string, thumbnailCount: number }> | null } };

export type GetSearchRankQueryVariables = Types.Exact<{
  input: Types.GetSearchRankInput;
}>;


export type GetSearchRankQuery = { __typename?: 'Query', getSearchRank: { __typename?: 'GetSearchRankOutput', daumBlogSearchRank?: number | null, naverBlogSearchRank?: number | null, ok: boolean, error?: string | null, postLink?: string | null } };

export type GetBlogInfoQueryVariables = Types.Exact<{
  input: Types.GetBlogInfoInput;
}>;


export type GetBlogInfoQuery = { __typename?: 'Query', getBlogInfo: { __typename?: 'GetBlogInfoOutput', ok: boolean, error?: string | null, blogInfo?: { __typename?: 'BlogInfo', blogName: string, subscriberCount: number, blogDirectoryName: string, totalVisitorCount: number, influencerUrl: string, blogVisitor?: Array<{ __typename?: 'BlogVisitor', visitor: string, date: string }> | null } | null } };


export const GetKeywordSearchCountDocument = gql`
    query GetKeywordSearchCount($input: GetKeywordSearchCountInput!) {
  getKeywordSearchCount(input: $input) {
    error
    ok
    keywordList {
      monthlyMobileQcCnt
      monthlyPcQcCnt
      relKeyword
    }
  }
}
    `;

export function useGetKeywordSearchCountQuery(options: Omit<Urql.UseQueryArgs<GetKeywordSearchCountQueryVariables>, 'query'>) {
  return Urql.useQuery<GetKeywordSearchCountQuery, GetKeywordSearchCountQueryVariables>({ query: GetKeywordSearchCountDocument, ...options });
};
export const GetBlogCategoryListDocument = gql`
    query GetBlogCategoryList($input: GetBlogCategoryListInput!) {
  getBlogCategoryList(input: $input) {
    categories {
      categoryName
      postCnt
    }
    error
    ok
    postCnt
  }
}
    `;

export function useGetBlogCategoryListQuery(options: Omit<Urql.UseQueryArgs<GetBlogCategoryListQueryVariables>, 'query'>) {
  return Urql.useQuery<GetBlogCategoryListQuery, GetBlogCategoryListQueryVariables>({ query: GetBlogCategoryListDocument, ...options });
};
export const GetSearchAvailabilityDocument = gql`
    query GetSearchAvailability($input: GetSearchAvailabilityInput!) {
  getSearchAvailability(input: $input) {
    error
    ok
    posts {
      isSearchAvailability
      commentCnt
      link
      logNo
      sympathyCnt
      titleWithInspectMessage
      thumbnailCount
    }
  }
}
    `;

export function useGetSearchAvailabilityQuery(options: Omit<Urql.UseQueryArgs<GetSearchAvailabilityQueryVariables>, 'query'>) {
  return Urql.useQuery<GetSearchAvailabilityQuery, GetSearchAvailabilityQueryVariables>({ query: GetSearchAvailabilityDocument, ...options });
};
export const GetSearchRankDocument = gql`
    query GetSearchRank($input: GetSearchRankInput!) {
  getSearchRank(input: $input) {
    daumBlogSearchRank
    naverBlogSearchRank
    ok
    error
    postLink
  }
}
    `;

export function useGetSearchRankQuery(options: Omit<Urql.UseQueryArgs<GetSearchRankQueryVariables>, 'query'>) {
  return Urql.useQuery<GetSearchRankQuery, GetSearchRankQueryVariables>({ query: GetSearchRankDocument, ...options });
};
export const GetBlogInfoDocument = gql`
    query GetBlogInfo($input: GetBlogInfoInput!) {
  getBlogInfo(input: $input) {
    ok
    error
    blogInfo {
      blogName
      subscriberCount
      blogDirectoryName
      totalVisitorCount
      blogVisitor {
        visitor
        date
      }
      influencerUrl
    }
  }
}
    `;

export function useGetBlogInfoQuery(options: Omit<Urql.UseQueryArgs<GetBlogInfoQueryVariables>, 'query'>) {
  return Urql.useQuery<GetBlogInfoQuery, GetBlogInfoQueryVariables>({ query: GetBlogInfoDocument, ...options });
};