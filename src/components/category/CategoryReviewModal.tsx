import useCategoryEvaluation from '@lib/hooks/useCategoryEvaluation';
import { Delete, Edit, StarRounded } from '@mui/icons-material';
import palette from '@styles/palette';
import { Button, Modal, ModalProps, Rate, Table } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const CategoryReviewModalBlock = styled(Modal)`
  .ant-modal-content {
    overflow: hidden;
  }
  .category-review-modal-inner {
    .ant-table-wrapper {
      word-break: break-all;
      .ant-table-content {
        font-size: 13px;
        svg {
          font-size: 20px;
        }
      }
    }
    .category-review-modal-evaluation-register-wrapper {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 20px;
      .category-review-modal-evaluation-register-feedback-wrapper {
        display: flex;
        gap: 10px;
        align-items: flex-end;
      }
    }
    .category-review-modal-my-evaluation-wrapper {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-bottom: 20px;
      .category-review-modal-my-evaluation-label {
        font-size: 14px;
        font-weight: 600;

        color: ${palette.colorSubText};
      }
      .category-review-modal-my-evaluation-top-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .category-review-modal-my-evaluation-top-button-wrapper {
          display: flex;
          gap: 10px;
          svg {
            cursor: pointer;
            transition: color 0.2s linear;
            :hover {
              color: ${palette.antd_blue_02};
            }
          }
        }
      }
      .category-review-modal-my-evaluation-feedback-wrapper {
        display: flex;
        gap: 10px;
        align-items: flex-end;
        .category-review-modal-my-evaluation-feedback {
          word-break: break-all;
          white-space: pre-wrap;
        }
      }
    }
  }
`;

interface DataType {
  key: number;
  nickname: string;
  score: number;
  review: string;
}

interface CategoryReviewModalProps extends Omit<ModalProps, 'children'> {
  categoryId: number;
}

const CategoryReviewModal: React.FC<CategoryReviewModalProps> = (props) => {
  const { categoryId, ...modalProps } = props;
  const {
    categoryEvaluations,
    myEvaluation,
    handleCreateCategoryEvaluation,
    handleUpdateCategoryEvaluation,
    handleDeleteCategoryEvaluation,
  } = useCategoryEvaluation(categoryId);
  const [score, setScore] = useState(5);
  const [isEdit, setIsEdit] = useState(false);
  const evaluationDatas = [...categoryEvaluations]
    .sort((a, b) => {
      if (!b.feedback) return -1;
      if (!a.feedback) return 1;
      return b.id - a.id;
    })

    .map((categoryEvaluation) => {
      return {
        key: categoryEvaluation.id,
        nickname: (
          <div
            style={{
              fontSize: '12px',
            }}
          >
            {categoryEvaluation.user.nickname.slice(0, 1) +
              '*' +
              categoryEvaluation.user.nickname.at(-1)}
          </div>
        ),
        score: (
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              position: 'relative',
              top: '6px',
            }}
          >
            <StarRounded
              color="primary"
              style={{ color: palette.yellow_500 }}
            />
            <span>x{categoryEvaluation.score}</span>
          </div>
        ),
        review: categoryEvaluation.feedback,
      };
    });
  const columns = [
    {
      title: '닉네임',
      dataIndex: 'nickname',
      key: 'nickname',
      width: 170,
    },
    {
      title: '평점',
      dataIndex: 'score',
      key: 'score',
      width: 95,
    },
    {
      title: '리뷰',
      dataIndex: 'review',
      key: 'review',
      width: 600,
    },
  ];

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
    Modal.confirm({
      title: '리뷰를 삭제하시겠습니까?',
      okText: '삭제',
      cancelText: '취소',
      onOk: () => {
        handleDeleteCategoryEvaluation();
      },
    });
  };
  return (
    <CategoryReviewModalBlock {...modalProps} footer={false}>
      <form className="category-review-modal-inner" onSubmit={handleSubmit}>
        {!myEvaluation && (
          <div className="category-review-modal-evaluation-register-wrapper">
            <Rate value={score} onChange={(value) => setScore(value)} />
            <div className="category-review-modal-evaluation-register-feedback-wrapper">
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
          <div className="category-review-modal-my-evaluation-wrapper">
            <div className="category-review-modal-my-evaluation-label">
              내 리뷰
            </div>
            <div className="category-review-modal-my-evaluation-top-wrapper">
              <Rate
                value={score}
                onChange={(value) => value && setScore(value)}
                disabled={myEvaluation && !isEdit}
              />
              <div className="category-review-modal-my-evaluation-top-button-wrapper">
                <Edit
                  role="button"
                  onClick={() => setIsEdit((prev) => !prev)}
                />
                <Delete role="button" onClick={onClickDelete} />
              </div>
            </div>

            {!isEdit && (
              <div className="category-review-modal-my-evaluation-feedback">
                {myEvaluation.feedback}
              </div>
            )}
            {isEdit && (
              <div className="category-review-modal-my-evaluation-feedback-wrapper">
                <TextArea
                  rows={2}
                  name="feedback"
                  defaultValue={myEvaluation.feedback}
                  placeholder="후기를 남겨주세요 😄"
                />
                <Button type="primary" htmlType="submit">
                  수정
                </Button>
              </div>
            )}
          </div>
        )}
        <Table columns={columns} dataSource={evaluationDatas} />
      </form>
    </CategoryReviewModalBlock>
  );
};

export default CategoryReviewModal;
