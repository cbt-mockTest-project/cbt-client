import BasicBox from '@components/common/box/BasicBox';
import EditorStyle from '@styles/editorStyle';
import { Image } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { MockExamQuestion } from 'types';
import parse from 'html-react-parser';
import palette from '@styles/palette';
import { EditFilled, LinkOutlined } from '@ant-design/icons';
import Bookmark from '@components/common/bookmark/Bookmark';
import Link from 'next/link';
import LinkedQuestionIdsBox from '@components/question/LinkedQuestionIdsBox copy';

const SearchQuestionListItemBlock = styled.div`
  .search-question {
    white-space: pre-line;
    ${EditorStyle}
  }
  .search-question-image {
    width: 100%;
    max-height: 400px;
    object-fit: contain;
    margin-top: 10px;
    border-radius: 5px;
  }
  .search-solution-box,
  .search-question-box {
    padding: 10px 20px;
  }

  .search-question-box {
    background-color: ${palette.gray_100};
    .search-question-box-exam-title {
      font-weight: bold;
      font-size: 12px;
      color: ${({ theme }) => theme.color('colorTextSecondary')};
    }
    .search-question-box-wrapper {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      .search-question-tool-box {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        position: relative;
        bottom: 20px;
        .search-question-tool-edit-icon {
          position: relative;
          cursor: pointer;
        }
      }
    }
  }
`;

interface SearchQuestionListItemProps {
  question: MockExamQuestion;
  hasEditButton: boolean;
  onClickBookmark?: () => void;
}

const SearchQuestionListItem: React.FC<SearchQuestionListItemProps> = ({
  question,
  hasEditButton,
  onClickBookmark,
}) => {
  return (
    <SearchQuestionListItemBlock>
      <BasicBox className="search-question-box" maxHeight={1000}>
        <LinkedQuestionIdsBox currentQuestionId={question.id} />
        <div className="search-question-box-exam-title">
          {question.mockExam?.title}
        </div>
        <div className="search-question-box-wrapper">
          <div>
            <pre className="search-question">{parse(question.question)}</pre>
            {question.question_img &&
              question.question_img?.length > 0 &&
              question.question_img[0].url && (
                <Image
                  className="search-question-image"
                  src={question.question_img[0].url}
                  alt="문제이미지"
                />
              )}
          </div>
          <div className="search-question-tool-box">
            {
              <Link href={`/question/${question.id}`}>
                <LinkOutlined />
              </Link>
            }
            {hasEditButton && (
              <Link
                href={`/question/${question.id}/edit`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <EditFilled className="search-question-tool-edit-icon" />
              </Link>
            )}
            {onClickBookmark && (
              <Bookmark
                active={question.isBookmarked}
                onClick={onClickBookmark}
              />
            )}
          </div>
        </div>
      </BasicBox>
      <BasicBox className="search-solution-box">
        <pre className="search-question">{parse(question.solution)}</pre>
        {question.solution_img &&
          question.solution_img?.length > 0 &&
          question.solution_img[0].url && (
            <Image
              className="search-question-image"
              src={question.solution_img[0].url}
              alt="정답이미지"
            />
          )}
      </BasicBox>
    </SearchQuestionListItemBlock>
  );
};

export default SearchQuestionListItem;
