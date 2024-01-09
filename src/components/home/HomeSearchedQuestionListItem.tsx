import BasicCard from '@components/common/card/BasicCard';
import StudyQuestionBox from '@components/study/StudyQuestionBox';
import palette from '@styles/palette';
import React from 'react';
import parse from 'html-react-parser';
import styled from 'styled-components';
import { MockExamQuestion } from 'types';
import { Image as AntImage } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
const HomeSearchedQuestionListItemBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  .home-searched-question-list-item-user-info-wrapper {
    display: flex;
    align-items: center;
    width: fit-content;
    gap: 5px;
    .home-searched-question-list-item-user-info-image-wrapper {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${palette.colorContainerBgGrey};
    }
    .home-searched-question-list-item-user-info-nickname {
      font-size: 14px;
      font-weight: 600;
    }
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
  .home-searched-question-list-item-question-box {
    background-color: ${palette.colorContainerBgGrey};
  }
  .home-searched-question-list-item-solution-box-image {
    width: 100%;
    max-height: 400px;
    object-fit: contain;
    margin-top: 10px;
    border-radius: 5px;
  }
`;

interface HomeSearchedQuestionListItemProps {
  question: MockExamQuestion;
  handleSaveBookmark: (question: MockExamQuestion) => Promise<void>;
}

const HomeSearchedQuestionListItem: React.FC<
  HomeSearchedQuestionListItemProps
> = ({ question, handleSaveBookmark }) => {
  return (
    <HomeSearchedQuestionListItemBlock>
      <Link href={`/user/${question.user.id}`}>
        <div className="home-searched-question-list-item-user-info-wrapper">
          <div className="home-searched-question-list-item-user-info-image-wrapper">
            <Image
              src={
                question.user.profileImg || '/png/profile/profile_default.png'
              }
              alt="user-profile-image"
              width={25}
              height={25}
            />
          </div>
          <div className="home-searched-question-list-item-user-info-nickname">
            {question.user.nickname}
          </div>
        </div>
      </Link>
      <BasicCard
        type="primary"
        className="home-searched-question-list-item-question-box"
      >
        <StudyQuestionBox
          saveBookmark={handleSaveBookmark}
          question={question}
          title={question.mockExam.title}
        />
      </BasicCard>
      <BasicCard>
        <div>{parse(question.solution) || ''}</div>
        {question.solution_img && question.solution_img?.length > 0 && (
          <AntImage
            className="home-searched-question-list-item-solution-box-image"
            src={question.solution_img[0].url}
            alt="문제이미지"
          />
        )}
      </BasicCard>
    </HomeSearchedQuestionListItemBlock>
  );
};

export default HomeSearchedQuestionListItem;
