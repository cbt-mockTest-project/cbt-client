import { useSaveExam } from '@lib/graphql/hook/useExam';
import { convertToKST, handleError } from '@lib/utils/utils';
import { examCreateActions } from '@modules/redux/slices/examCreate';
import {
  useAppDispatch,
  useAppSelector,
} from '@modules/redux/store/configureStore';
import { message } from 'antd';
import { CreateExamForm } from 'customTypes';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';

const useSaveExamHandler = () => {
  const dispatch = useAppDispatch();
  const savedTime = useAppSelector((state) => state.examCreate.savedTime);
  const [saveExam] = useSaveExam();
  const router = useRouter();
  const handleSaveExam = async (
    data: CreateExamForm,
    hasSuccessMessage: boolean = false
  ) => {
    try {
      if (!data.title) {
        return message.error('시험지 제목을 입력해주세요.');
      }
      const questionOrderIds = data.questions.map((v) => v.orderId);
      const res = await saveExam({
        variables: {
          input: {
            title: data.title,
            uuid: data.uuid,
            questionOrderIds,
            questions: data.questions,
          },
        },
      });
      if (res.data.saveExam.error) {
        return message.error(res.data.saveExam.error);
      }
      if (!router.query.examId) {
        router.replace({
          pathname: router.pathname,
          query: {
            examId: res.data.saveExam.examId,
          },
        });
      }
      if (hasSuccessMessage) message.success('시험지가 저장되었습니다.');
      dispatch(
        examCreateActions.setSavedTime(
          convertToKST(new Date().toISOString(), 'yy-MM-dd hh:mm:ss')
        )
      );
    } catch (e) {
      handleError(e);
    }
  };

  const debouncedSaveExam = debounce(handleSaveExam, 1000);
  return {
    debouncedSaveExam,
    handleSaveExam,
    savedTime,
  };
};

export default useSaveExamHandler;
