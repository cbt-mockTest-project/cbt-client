import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useAppSelector } from '@modules/redux/store/configureStore';
import { App, Button, Pagination } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const ObjectiveStudyTestModeFooterMobileBlock = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.color('colorBorder')};
  background-color: ${({ theme }) => theme.color('colorFillAlter')};
  gap: 20px;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 20px;
  .objective-study-footer-pagination {
    align-items: center !important;
    justify-content: center !important;
    width: 100%;
    .ant-pagination-next,
    .ant-pagination-prev {
      height: 100% !important;
    }

    .ant-pagination-next {
      margin-left: auto !important;
    }

    .ant-pagination-prev {
      margin-right: auto !important;
    }
  }
`;

interface ObjectiveStudyTestModeFooterMobileProps {}

const ObjectiveStudyTestModeFooterMobile: React.FC<
  ObjectiveStudyTestModeFooterMobileProps
> = () => {
  const { modal } = App.useApp();
  const totalQuestions = useAppSelector(
    (state) => state.mockExam.questions?.length
  );
  const isExistNotSolvedQuestion = useAppSelector(
    (state) =>
      !!state.mockExam.questions.find((question) => !question.myObjectiveAnswer)
  );

  const router = useRouter();
  const page = router.query.p || 1;

  return (
    <ObjectiveStudyTestModeFooterMobileBlock>
      <Pagination
        className="objective-study-footer-pagination"
        simple
        total={totalQuestions}
        pageSize={1}
        nextIcon={
          <Button icon={<RightOutlined />} shape="circle" size="large"></Button>
        }
        prevIcon={
          <Button icon={<LeftOutlined />} shape="circle" size="large"></Button>
        }
        onChange={(page) => {
          router.push({
            pathname: router.pathname,
            query: { ...router.query, p: page },
          });
        }}
        current={Number(page)}
      />
    </ObjectiveStudyTestModeFooterMobileBlock>
  );
};

export default ObjectiveStudyTestModeFooterMobile;
