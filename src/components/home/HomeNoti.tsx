import React, { useEffect } from 'react';
import styled from 'styled-components';
import useAuth from '@lib/hooks/useAuth';
import { Button, Space, notification } from 'antd';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { useRouter } from 'next/router';

const HomeNotiBlock = styled.div``;

interface HomeNotiProps {}

const HomeNoti: React.FC<HomeNotiProps> = () => {
  const [api, contextHolder] = notification.useNotification();
  const { user } = useAuth();
  const router = useRouter();
  const openNotification = (placement: NotificationPlacement) => {
    if (!user) return;
    const key = `open${Date.now()}`;
    api.open({
      duration: 60,
      message: `빠른이동`,
      description: `"${user.recentlyStudiedCategory}" 바로가기`,
      placement,
      key,
      btn: (
        <Space>
          <Button onClick={() => api.destroy(key)}>닫기</Button>
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
      openNotification('bottom');
    }
  }, [user]);
  return <>{contextHolder}</>;
};

export default HomeNoti;
