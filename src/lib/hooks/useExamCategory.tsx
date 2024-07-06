import { MockExam } from 'types';
import { useLazyGetMyExams } from '../graphql/hook/useExam';
import { useAppDispatch } from '@modules/redux/store/configureStore';
import { handleError } from '@lib/utils/utils';
import { examCategoryActions } from '@modules/redux/slices/examCategory';
import { App } from 'antd';
import { useToggleExamBookmark } from '@lib/graphql/hook/useExamBookmark';

const useExamCategory = () => {
  const { message } = App.useApp();

  const [toggleExamBookmark] = useToggleExamBookmark();
  const dispatch = useAppDispatch();

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
        dispatch(examCategoryActions.toggleExamBookmark(examId));
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
    handleToggleExamBookmark,
  };
};

export default useExamCategory;
