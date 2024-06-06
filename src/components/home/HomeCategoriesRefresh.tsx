import { revalidatePath } from '@lib/apis/revalidate';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';

interface HomeCategoriesRefreshProps {}

const HomeCategoriesRefresh: React.FC<HomeCategoriesRefreshProps> = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const onClick = async () => {
    try {
      setIsLoading(true);
      await revalidatePath(router.pathname);
      router.reload();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="mt-4">
      <div className="text-slate-500 font-bold">
        암기장을 불러오는데 실패했습니다.
      </div>
      <Button type="primary" size="large" loading={isLoading} onClick={onClick}>
        새로고침
      </Button>
    </div>
  );
};

export default HomeCategoriesRefresh;
