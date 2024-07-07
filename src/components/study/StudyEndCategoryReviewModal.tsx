import useCategoryEvaluation from '@lib/hooks/useCategoryEvaluation';
import { Delete, Edit } from '@mui/icons-material';
import { App, Button, Modal, ModalProps, Rate } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StudyEndCategoryReviewModalBlock = styled(Modal)`
  .ant-modal-content {
    overflow: hidden;
  }
  .study-end-category-review-modal-header {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 20px;
    .study-end-category-review-modal-title {
      font-size: 18px;
      font-weight: bold;
    }
    .study-end-category-review-modal-desc {
      font-size: 14px;
      color: ${({ theme }) => theme.color('colorTextSecondary')};
    }
  }
  .study-end-category-review-modal-inner {
    .ant-table-wrapper {
      word-break: break-all;
      .ant-table-content {
        font-size: 13px;
        svg {
          font-size: 20px;
        }
      }
    }
    .study-end-category-review-modal-evaluation-register-wrapper {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 20px;
      .study-end-category-review-modal-evaluation-register-feedback-wrapper {
        display: flex;
        gap: 10px;
        align-items: flex-end;
      }
    }
    .study-end-category-review-modal-my-evaluation-wrapper {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-bottom: 20px;
      .study-end-category-review-modal-my-evaluation-label {
        font-size: 14px;
        font-weight: 600;

        color: ${({ theme }) => theme.color('colorTextSecondary')};
      }
      .study-end-category-review-modal-my-evaluation-top-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .study-end-category-review-modal-my-evaluation-top-button-wrapper {
          display: flex;
          gap: 10px;
          svg {
            cursor: pointer;
            transition: color 0.2s linear;
            :hover {
              color: ${({ theme }) => theme.color('colorPrimary')};
            }
          }
        }
      }
      .study-end-category-review-modal-my-evaluation-feedback-wrapper {
        display: flex;
        gap: 10px;
        align-items: flex-end;
        .study-end-category-review-modal-my-evaluation-feedback {
          word-break: break-all;
          white-space: pre-wrap;
        }
      }
    }
  }
`;

interface StudyEndCategoryReviewModalProps
  extends Omit<ModalProps, 'children'> {
  categoryId: number;
}

const StudyEndCategoryReviewModal: React.FC<
  StudyEndCategoryReviewModalProps
> = (props) => {
  const { modal } = App.useApp();
  const { categoryId, ...modalProps } = props;
  const {
    myEvaluation,
    handleCreateCategoryEvaluation,
    handleUpdateCategoryEvaluation,
    handleDeleteCategoryEvaluation,
  } = useCategoryEvaluation(categoryId);
  const [score, setScore] = useState(5);
  const [isEdit, setIsEdit] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      feedback: { value: string };
    };
    const feedback = target.feedback.value;
    const method = myEvaluation
      ? handleUpdateCategoryEvaluation
      : handleCreateCategoryEvaluation;
    method(score, feedback);
    setIsEdit(false);
  };

  useEffect(() => {
    if (myEvaluation) {
      setScore(myEvaluation.score);
    }
  }, [myEvaluation]);

  const onClickDelete = () => {
    modal.confirm({
      title: '리뷰를 삭제하시겠습니까?',
      okText: '삭제',
      cancelText: '취소',
      onOk: () => {
        handleDeleteCategoryEvaluation();
      },
    });
  };
  return (
    <StudyEndCategoryReviewModalBlock {...modalProps} footer={false}>
      <div className="study-end-category-review-modal-header">
        <div className="study-end-category-review-modal-title">
          암기장에 대한 리뷰를 남겨주세요 😄
        </div>
        <div className="study-end-category-review-modal-desc">
          다른 학습자들에게 큰 도움이 됩니다.
        </div>
      </div>
      <form
        className="study-end-category-review-modal-inner"
        onSubmit={handleSubmit}
      >
        {!myEvaluation && (
          <div className="study-end-category-review-modal-evaluation-register-wrapper">
            <Rate value={score} onChange={(value) => setScore(value)} />
            <div className="study-end-category-review-modal-evaluation-register-feedback-wrapper">
              <TextArea
                rows={2}
                name="feedback"
                placeholder="후기를 남겨주세요 😄"
              />
              <Button type="primary" htmlType="submit">
                등록
              </Button>
            </div>
          </div>
        )}
        {myEvaluation && (
          <div className="study-end-category-review-modal-my-evaluation-wrapper">
            <div className="study-end-category-review-modal-my-evaluation-label">
              내 리뷰
            </div>
            <div className="study-end-category-review-modal-my-evaluation-top-wrapper">
              <Rate
                value={score}
                onChange={(value) => value && setScore(value)}
                disabled={myEvaluation && !isEdit}
              />
              <div className="study-end-category-review-modal-my-evaluation-top-button-wrapper">
                <Edit
                  role="button"
                  onClick={() => setIsEdit((prev) => !prev)}
                />
                <Delete role="button" onClick={onClickDelete} />
              </div>
            </div>

            {!isEdit && (
              <div className="study-end-category-review-modal-my-evaluation-feedback">
                {myEvaluation.feedback}
              </div>
            )}
            {isEdit && (
              <div className="study-end-category-review-modal-my-evaluation-feedback-wrapper">
                <TextArea
                  rows={2}
                  name="feedback"
                  defaultValue={myEvaluation.feedback}
                  placeholder="리뷰를 남겨주세요 😄"
                />
                <Button type="primary" htmlType="submit">
                  수정
                </Button>
              </div>
            )}
          </div>
        )}
      </form>
    </StudyEndCategoryReviewModalBlock>
  );
};

export default StudyEndCategoryReviewModal;
