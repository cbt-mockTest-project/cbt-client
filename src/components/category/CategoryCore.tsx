import {
  useMeQuery,
  useUpdateRecentlyStudiedCategory,
} from '@lib/graphql/hook/useUser';
import useExamCategory from '@lib/hooks/useExamCategory';
import { message } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { ReadMockExamCategoryByCategoryIdInput, UserRole } from 'types';

interface CategoryCoreProps {
  categoryQueryInput: ReadMockExamCategoryByCategoryIdInput;
}

const CategoryCore: React.FC<CategoryCoreProps> = ({ categoryQueryInput }) => {
  const router = useRouter();
  const { fetchCategory } = useExamCategory();
  const { data: meQuery } = useMeQuery();
  const [updateRecentlyStudiedCategory] = useUpdateRecentlyStudiedCategory();
  useEffect(() => {
    if (!meQuery) return;
    if (meQuery.me.user) {
      updateRecentlyStudiedCategory({
        variables: {
          input: {
            categoryName: categoryQueryInput.name,
          },
        },
      });
      fetchCategory(categoryQueryInput, 'no-cache').then((res) => {
        if (!res?.hasAccess && meQuery.me.user.role !== UserRole.Admin) {
          message.error('접근 권한이 없습니다.');
          router.push('/');
        }
      });
    }
  }, [meQuery]);
  return <></>;
};

export default CategoryCore;
