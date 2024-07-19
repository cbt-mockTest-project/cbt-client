import { useAppSelector } from '@modules/redux/store/configureStore';
import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import useSolutionModeCardItemList from './hooks/useSolutionModeCardItemList';
import SolutionModeCardItem from './SolutionModeCardItem';

interface SolutionModeCardItemListPieceProps {
  page: number;
  questionIds: number[];
  isAnswerAllHidden: boolean;
  isStaticPage: boolean;
  limit: number;
}

const SolutionModeCardItemListPiece: React.FC<
  SolutionModeCardItemListPieceProps
> = ({ page, questionIds, isAnswerAllHidden, isStaticPage, limit }) => {
  const { setPage } = useSolutionModeCardItemList();
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.5,
    rootMargin: '2000px 0px',
  });
  const isAccessiblePage = useAppSelector(
    (state) => state.questionCardList.page >= page
  );
  const array = questionIds.slice(page * limit, (page + 1) * limit);

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
      setPage(page + 1);
    }
  }, [inView]);

  if (!isAccessiblePage) {
    return null;
  }
  return (
    <div ref={ref} className="flex flex-col gap-[50px]">
      {isVisible || page === 0 ? (
        array.map((id, index) => (
          <SolutionModeCardItem
            key={id}
            isAnswerAllHidden={isAnswerAllHidden}
            index={index + page * limit}
            isStaticPage={isStaticPage}
          />
        ))
      ) : (
        <div className="h-[100px] w-full flex justify-center items-center">
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

export default SolutionModeCardItemListPiece;
