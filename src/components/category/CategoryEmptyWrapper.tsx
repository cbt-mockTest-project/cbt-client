import React from 'react';
import CategoryEmpty from './CategoryEmpty';
import { useAppSelector } from '@modules/redux/store/configureStore';
import { useMeQuery } from '@lib/graphql/hook/useUser';

interface CategoryEmptyWrapperProps {
  handleButtonClick: () => void;
}

const CategoryEmptyWrapper: React.FC<CategoryEmptyWrapperProps> = ({
  handleButtonClick,
}) => {
  const { data: meQuery } = useMeQuery();
  const isMyCategory = useAppSelector(
    (state) => state.examCategory.category.user.id === meQuery?.me.user?.id
  );
  return (
    <CategoryEmpty
      hasButton={isMyCategory}
      handleButtonClick={handleButtonClick}
    />
  );
};

export default CategoryEmptyWrapper;
