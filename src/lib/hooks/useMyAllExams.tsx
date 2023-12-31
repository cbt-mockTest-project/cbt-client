import { useLazyGetMyExams } from '@lib/graphql/hook/useExam';
import { useToggleExamBookmark } from '@lib/graphql/hook/useExamBookmark';
import { handleError } from '@lib/utils/utils';
import { myAllExamsActions } from '@modules/redux/slices/myAllExams';
import {
  useAppDispatch,
  useAppSelector,
} from '@modules/redux/store/configureStore';
import { message } from 'antd';
import { cloneDeep } from 'lodash';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { MockExam } from 'types';

const useMyAllExams = () => {
  const router = useRouter();
  const [getMyExams] = useLazyGetMyExams();
  const dispatch = useAppDispatch();
  const [toggleExamBookmark] = useToggleExamBookmark();
  const myExams = useAppSelector((state) => state.myAllExams.myExams);
  const originalMyExams = useAppSelector(
    (state) => state.myAllExams.originalMyExams
  );
  const bookmarkedExams = useAppSelector(
    (state) => state.myAllExams.myBookmarkedExams
  );
  const originalBookmarkedExams = useAppSelector(
    (state) => state.myAllExams.originalMyBookmarkedExams
  );

  const isBookmarked = useMemo(() => {
    return router.query.bookmarked === 'true';
  }, [router.query.bookmarked]);

  const exams = useMemo(() => {
    return isBookmarked ? bookmarkedExams : myExams;
  }, [isBookmarked, myExams, bookmarkedExams]);

  const originalExams = useMemo(() => {
    return isBookmarked ? originalBookmarkedExams : originalMyExams;
  }, [isBookmarked, originalMyExams, originalBookmarkedExams]);

  const fetchMyExams = async () => {
    try {
      if (isBookmarked && bookmarkedExams.length > 0) return;
      if (!isBookmarked && myExams.length > 0) return;
      const res = await getMyExams({
        variables: {
          input: {
            isBookmarked,
          },
        },
      });
      if (res.data?.getMyExams.ok) {
        setExams(res.data.getMyExams.exams as MockExam[]);
      }
    } catch (e) {
      handleError(e);
    }
  };

  const handleFilterExams = (keyword: string) => {
    const filteredExams = originalExams.filter((exam) =>
      exam.title.includes(keyword)
    );
    setExams(filteredExams, false);
  };

  const setMyExams = (
    myExams: MockExam[],
    shouldUpdateOriginal: boolean = true
  ) =>
    dispatch(myAllExamsActions.setMyExams({ myExams, shouldUpdateOriginal }));

  const setMyBookmarkedExams = (
    myExams: MockExam[],
    shouldUpdateOriginal: boolean = true
  ) =>
    dispatch(
      myAllExamsActions.setMyBookmarkedExams({
        myExams,
        shouldUpdateOriginal,
      })
    );

  const setExams = isBookmarked ? setMyBookmarkedExams : setMyExams;

  const handleToggleExamBookmark = async (examId: number) => {
    try {
      const res = await toggleExamBookmark({
        variables: {
          input: {
            examId,
          },
        },
      });
      if (res.data?.toggleExamBookmark.ok) {
        let newBookmarkedExams = cloneDeep(bookmarkedExams);
        if (newBookmarkedExams.length === 0) return;
        newBookmarkedExams = newBookmarkedExams.map((exam) => {
          if (exam.id === examId) {
            exam.isBookmarked = !exam.isBookmarked;
          }
          return exam;
        });
        setMyBookmarkedExams(newBookmarkedExams);

        if (res.data.toggleExamBookmark.isBookmarked)
          return message.success('북마크 되었습니다.');
        else return message.success('북마크가 해제되었습니다.');
      }
      message.error(res.data?.toggleExamBookmark.error);
    } catch (e) {
      handleError(e);
    }
  };

  return {
    fetchMyExams,
    handleToggleExamBookmark,
    exams,
    handleFilterExams,
    originalExams,
  };
};

export default useMyAllExams;
