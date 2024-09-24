import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useAppSelector } from '@modules/redux/store/configureStore';
import { App, Button, Pagination } from 'antd';
import { ObjectiveExamMode } from 'customTypes';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const ObjectiveStudyTestModeFooterPcBlock = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.color('colorBorder')};
  background-color: ${({ theme }) => theme.color('colorFillAlter')};
  gap: 20px;
  .objective-study-footer-pagination {
    align-items: center !important;
    justify-content: center !important;
    width: 100%;
    .ant-pagination-next,
    .ant-pagination-prev {
      height: 100% !important;
    }
  }
`;

interface ObjectiveStudyTestModeFooterPcProps {}

const ObjectiveStudyTestModeFooterPc: React.FC<
  ObjectiveStudyTestModeFooterPcProps
> = () => {
  const totalQuestions = useAppSelector(
    (state) => state.mockExam.questions?.length
  );
  const router = useRouter();
  const page = router.query.p || 1;

  return (
    <ObjectiveStudyTestModeFooterPcBlock>
      <Pagination
        className="objective-study-footer-pagination"
        simple
        total={totalQuestions}
        nextIcon={<Button icon={<RightOutlined />} size="large"></Button>}
        prevIcon={<Button icon={<LeftOutlined />} size="large"></Button>}
        pageSize={2}
        onChange={(page) => {
          router.push({
            pathname: router.pathname,
            query: { ...router.query, p: page },
          });
        }}
        current={Number(page)}
      />
    </ObjectiveStudyTestModeFooterPcBlock>
  );
};

export default ObjectiveStudyTestModeFooterPc;
