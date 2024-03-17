import WithHead from '@components/common/head/WithHead';
import SearchComponent from '@components/search/SearchComponent';
import { SEARCH_PAGE } from '@lib/constants/displayName';
import { NextPage } from 'next';

const SearchPage: NextPage = () => {
  return (
    <>
      <WithHead
        title="문제 검색기 | 모두CBT"
        pageHeadingTitle="모두CBT 문제 검색기"
      />
      <SearchComponent />
    </>
  );
};
SearchPage.displayName = SEARCH_PAGE;

export default SearchPage;
