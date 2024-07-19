import { questionCardListActions } from '@modules/redux/slices/questionCardList';
import { useAppDispatch } from '@modules/redux/store/configureStore';

const useSolutionModeCardItemList = () => {
  const dispatch = useAppDispatch();
  const setPage = (page: number) => {
    dispatch(questionCardListActions.setPage(page));
  };
  return { setPage };
};

export default useSolutionModeCardItemList;
