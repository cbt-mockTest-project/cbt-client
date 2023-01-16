import { useRouter } from 'next/router';
import React from 'react';
import CommunityView from './CommunityView';

interface CommunityContainerProps {}

const CommunityContainer: React.FC<CommunityContainerProps> = () => {
  const router = useRouter();
  const checkCategoryMatching = (query: string) => query === router.query.c;
  const communityProps = {
    checkCategoryMatching,
  };
  return <CommunityView {...communityProps} />;
};

export default CommunityContainer;
