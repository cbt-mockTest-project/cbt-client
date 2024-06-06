import { revalidatePath } from '@lib/apis/revalidate';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Custom500() {
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
    <div className="flex items-center justify-center h-screen flex-col gap-4">
      <div className="text-2xl font-bold">에러가 발생했습니다.</div>
      <Button type="primary" size="large" loading={isLoading} onClick={onClick}>
        새로고침
      </Button>
    </div>
  );
}
