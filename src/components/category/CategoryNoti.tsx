import useAuth from '@lib/hooks/useAuth';
import { Button, Space, notification } from 'antd';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { MockExamCategory } from 'types';

interface CategoryNotiProps {
  category: MockExamCategory;
}

const CategoryNoti: React.FC<CategoryNotiProps> = ({ category }) => {
  const [api, contextHolder] = notification.useNotification();
  const { user } = useAuth();
  const router = useRouter();
  const openNotification = (placement: NotificationPlacement) => {
    if (!user) return;
    if (!user.recentlyStudiedExams.length) return;
    const key = `open${Date.now()}`;

    const recentlyStudiedExams = user.recentlyStudiedExams.filter(
      (data) => data.categoryId === category.id
    );
    if (!recentlyStudiedExams.length) return;
    const exam = category.mockExam.find(
      (el) => recentlyStudiedExams[0].examIds[0] === el.id
    );
    if (!exam) return;
    api.open({
      duration: 60,
      message: `이어서 학습하기`,
      description: `"${exam.title}-${recentlyStudiedExams[0].questionIndex}번 문제" 바로가기`,
      placement,
      key,
      btn: (
        <Space>
          <Button onClick={() => api.destroy(key)}>닫기</Button>
          <Button
            type="primary"
            onClick={() => {
              router.push({
                pathname: '/study',
                query: {
                  mode: 'typing',
                  examId: recentlyStudiedExams[0].examIds[0],
                  activeIndex: recentlyStudiedExams[0].questionIndex,
                  categoryId: category.id,
                },
              });
            }}
          >
            이동
          </Button>
        </Space>
      ),
    });
  };
  useEffect(() => {
    if (user && user.recentlyStudiedExams) {
      openNotification('bottom');
    }
  }, [user]);

  return <>{contextHolder}</>;
};

export default CategoryNoti;
