import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';
import CommentModal from '@components/common/modal/CommentModal';
import { useRouter } from 'next/router';

type CommentPageProps = {};

const CommentPage: NextPage<CommentPageProps> = () => {
  const router = useRouter();
  const questionId = Number(router.query.questionId);
  const title = String(router.query.title);
  return (
    <CommentPageBlock>
      <CommentModal
        open={true}
        questionId={questionId}
        title={title}
        type="newPage"
        onClose={() => {}}
      />
    </CommentPageBlock>
  );
};

export default CommentPage;

const CommentPageBlock = styled.div``;
