import React from 'react';
import { useAppSelector } from '@modules/redux/store/configureStore';
import CategoryUtilButtonBox from '@components/category/CategoryUtilButtonBox';

interface AllExamsUtilButtonWrapperProps {}

const AllExamsUtilButtonWrapper: React.FC<
  AllExamsUtilButtonWrapperProps
> = () => {
  const exams = useAppSelector((state) => state.myAllExams.myExams);
  const name = '내 전체 시험지';
  return <CategoryUtilButtonBox exams={exams} categoryName={name} />;
};

export default AllExamsUtilButtonWrapper;
