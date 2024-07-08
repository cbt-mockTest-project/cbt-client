import React, { useEffect } from 'react';
import useAuth from '../../_lib/hooks/useAuth';
import { Button, Space, App } from 'antd';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { useRouter } from 'next/router';
import useNotification from 'antd/es/notification/useNotification';

interface HomeNotiProps {}

const HomeNoti: React.FC<HomeNotiProps> = () => {
  const [notification, context] = useNotification();
  const { user } = useAuth();
  const router = useRouter();
  const openNotification = (placement: NotificationPlacement) => {
    if (!user) return;
    const key = `open${Date.now()}`;
    notification.open({
      duration: 60,
      message: `빠른이동`,
      description: `"${user.recentlyStudiedCategory}" 바로가기`,
      placement,
      key,
      btn: (
        <Space>
          <Button onClick={() => notification.destroy(key)}>닫기</Button>
          <Button
            type="primary"
            onClick={() => {
              router.push(`/category/${user.recentlyStudiedCategory}`);
            }}
          >
            이동
          </Button>
        </Space>
      ),
    });
  };
  useEffect(() => {
    if (user && user.recentlyStudiedCategory) {
      notification.destroy();
      openNotification('bottom');
    }
  }, [user]);

  return <>{context}</>;
};

export default HomeNoti;
