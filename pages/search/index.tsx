import WithHead from '../../app/_components/common/head/WithHead';
import SearchComponent from '../../app/_components/search/SearchComponent';
import { SEARCH_PAGE } from '../../app/_lib/constants/displayName';
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
