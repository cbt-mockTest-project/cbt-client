import { useDeleteExam, useSaveExam } from '@lib/graphql/hook/useExam';
import { convertServerTimeToKST, handleError } from '@lib/utils/utils';
import { examCreateActions } from '@modules/redux/slices/examCreate';
import {
  useAppDispatch,
  useAppSelector,
} from '@modules/redux/store/configureStore';
import { Modal, message } from 'antd';
import { CreateExamForm } from 'customTypes';
import { format } from 'date-fns';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';

const useSaveExamHandler = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [deleteExam] = useDeleteExam();
  const savedTime = useAppSelector((state) => state.examCreate.savedTime);
  const [saveExam, { loading: saveExamLoading }] = useSaveExam();
  const categoryId = router.query.categoryId;
  const examId = router.query.examId;
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
            ...(categoryId ? { categoryId: Number(categoryId) } : {}),
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
            ...router.query,
            examId: res.data.saveExam.examId,
          },
        });
      }
      if (hasSuccessMessage) message.success('시험지가 저장되었습니다.');
      dispatch(
        examCreateActions.setSavedTime(format(new Date(), 'yy-MM-dd hh:mm:ss'))
      );
    } catch (e) {
      handleError(e);
    }
  };

  const handleDeleteExam = async (examId: number) => {
    Modal.confirm({
      title: '시험지를 삭제하시겠습니까?',
      content: '시험지를 삭제하면 복구할 수 없습니다.',
      onOk: async () => {
        try {
          const res = await deleteExam({
            variables: {
              input: {
                id: examId,
              },
            },
          });
          if (res.data.deleteMockExam.error) {
            message.error(res.data.deleteMockExam.error);
            return;
          }
          message.success('시험지가 삭제되었습니다.');
          router.back();
        } catch (e) {
          handleError(e);
          message.error('시험지 삭제에 실패했습니다.');
        }
      },
    });
  };

  const debouncedSaveExam = debounce(handleSaveExam, 1000);
  return {
    debouncedSaveExam,
    handleSaveExam,
    handleDeleteExam,
    savedTime,
    saveExamLoading,
  };
};

export default useSaveExamHandler;
