import CategoryHeader from '@components/category/CategoryHeader';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { useAppSelector } from '@modules/redux/store/configureStore';
import React from 'react';
import { User } from 'types';

interface AllExamCategoryHeaderWrapperProps {}

const AllExamCategoryHeaderWrapper: React.FC<
  AllExamCategoryHeaderWrapperProps
> = () => {
  const { data: meQuery } = useMeQuery();
  const exams = useAppSelector((state) => state.myAllExams.myExams);
  return (
    <CategoryHeader
      user={meQuery.me.user as User}
      exams={exams}
      categoryName="내 전체 시험지"
      categoryDescription="내가 만든 시험지들을 모두 볼 수 있습니다."
    />
  );
};

export default AllExamCategoryHeaderWrapper;
