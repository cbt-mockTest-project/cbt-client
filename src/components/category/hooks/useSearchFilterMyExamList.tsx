import { useLazyGetMyExams } from '@lib/graphql/hook/useExam';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { handleError } from '@lib/utils/utils';
import { examCategoryActions } from '@modules/redux/slices/examCategory';
import { useAppDispatch } from '@modules/redux/store/configureStore';
import { debounce } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { MockExam } from 'types';

interface useCategoryExamListProps {
  meData: MockExam[];
  bookmarkedData: MockExam[];
}

const useSearchFilterMyExamList = ({
  meData,
  bookmarkedData,
}: useCategoryExamListProps) => {
  const { data: meQuery } = useMeQuery();
  const [getMyExams] = useLazyGetMyExams();
  const dispatch = useAppDispatch();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [type, setType] = useState<'me' | 'bookmarked'>('me');
  const data = type === 'me' ? meData : bookmarkedData;

  const fetchMyExams = async ({
    isBookmarked = false,
  }: {
    isBookmarked?: boolean;
  }) => {
    try {
      const res = await getMyExams({
        variables: {
          input: {
            isBookmarked,
          },
        },
      });
      if (res.data?.getMyExams.ok) {
        if (isBookmarked)
          setMyBookmarkedExams(res.data.getMyExams.exams as MockExam[]);
        else setMyExams(res.data.getMyExams.exams as MockExam[]);
      }
    } catch (e) {
      handleError(e);
    }
  };

  const filteredData = useMemo(() => {
    if (!data || searchKeyword.trim() === '') return data;
    return data.filter((item) =>
      String(item.title).toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [data, searchKeyword]);
  const handleSearch = debounce((keyword: string) => {
    setSearchKeyword(keyword);
  }, 300);
  const handleSelectType = (type: 'me' | 'bookmarked') => {
    setSearchKeyword('');
    setType(type);
  };

  const setMyExams = (
    myExams: MockExam[],
    shouldUpdateOriginal: boolean = true
  ) =>
    dispatch(examCategoryActions.setMyExams({ myExams, shouldUpdateOriginal }));

  const setMyBookmarkedExams = (
    myBookmarkedExams: MockExam[],
    shouldUpdateOriginal: boolean = true
  ) =>
    dispatch(
      examCategoryActions.setMyBookmarkedExams({
        myBookmarkedExams,
        shouldUpdateOriginal,
      })
    );

  useEffect(() => {
    if (!meQuery?.me.user) return;
    fetchMyExams({
      isBookmarked: type === 'bookmarked',
    });
  }, [meQuery, type]);

  return { filteredData, handleSearch, handleSelectType };
};

export default useSearchFilterMyExamList;
