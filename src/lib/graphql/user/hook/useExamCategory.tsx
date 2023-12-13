import { MockExamCategory, ReadMockExamCategoryByCategoryIdInput } from 'types';
import { useLazyReadCategoryById } from './useExam';
import {
  useAppDispatch,
  useAppSelector,
} from '@modules/redux/store/configureStore';
import { handleError } from '@lib/utils/utils';
import { examCategoryActions } from '@modules/redux/slices/examCategory';

const useExamCategory = () => {
  const [readCategory] = useLazyReadCategoryById();
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.examCategory.category);
  const originalCategory = useAppSelector(
    (state) => state.examCategory.originalCategory
  );

  const fetchCategory = async (
    input: ReadMockExamCategoryByCategoryIdInput
  ) => {
    try {
      const res = await readCategory({
        variables: {
          input,
        },
      });
      if (res.data?.readMockExamCategoryByCategoryId.category) {
        setExamCategory(
          res.data.readMockExamCategoryByCategoryId.category as MockExamCategory
        );
      }
    } catch (e) {
      handleError(e);
    }
  };

  const setExamCategory = (
    category: MockExamCategory,
    shouldUpdateOriginal: boolean = true
  ) => {
    dispatch(
      examCategoryActions.setCategory({ category, shouldUpdateOriginal })
    );
  };

  return { fetchCategory, setExamCategory, category, originalCategory };
};

export default useExamCategory;
