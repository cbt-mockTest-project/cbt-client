import KakaoIconSVG from '@assets/svg/kakao.svg';
import palette from '@styles/palette';
import { Button } from 'antd';
import { Option } from 'antd/lib/mentions';
import Select, { DefaultOptionType } from 'antd/lib/select';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { UserRole } from 'types';
import MainViewCount from './MainViewCount';

const MainCenterContentBlock = styled.div``;

interface MainCenterContentProps {
  category: string;
  onCategoryChange: (value: string) => Promise<DefaultOptionType[]>;
  onTitleChange: (value: number, titles: DefaultOptionType[]) => Promise<void>;
  categories: {
    value: string;
    label: string;
    authorRole: UserRole;
  }[];
  titles: DefaultOptionType[];
  title: string;
  selectedExamId: number;
  gotoExamPageLoading: boolean;
  gotoExamPage: () => void;
  gotoSolutionPageLoading: boolean;
  gotoSolutionPage: () => void;
  gotoRandomSelectPage: () => void;
  onToggleKakaoChatModalState: () => void;
}

const MainCenterContent: React.FC<MainCenterContentProps> = ({
  category,
  onCategoryChange,
  categories,
  titles,
  title,
  gotoExamPage,
  onTitleChange,
  selectedExamId,
  gotoExamPageLoading,
  gotoSolutionPageLoading,
  gotoSolutionPage,
  gotoRandomSelectPage,
  onToggleKakaoChatModalState,
}) => {
  return (
    <MainCenterContentBlock>
      <div className="home-content-top-wrapper">
        <div className="home-content-exam-category-wrapper">
          <p className="home-content-title">시험선택</p>
          <div className="home-content-exam-category-info">
            <div className="home-content-category-color-box admin" />
            <label className="home-content-exam-category-info-label">
              개발자 제작
            </label>
            <div className="home-content-category-color-box user" />
            <label className="home-content-exam-category-info-label">
              유저 제작
            </label>
          </div>
        </div>
        <Select
          value={category}
          onChange={onCategoryChange}
          data-cy="category-selector"
        >
          {categories.map((category) => (
            <Option
              key={category.value}
              value={category.value}
              style={{
                color:
                  category.authorRole === UserRole.Admin
                    ? 'black'
                    : palette.blue_600,
              }}
              data-cy="category-selector-option"
            >
              {category.label}
            </Option>
          ))}
        </Select>
        <p className="home-content-title">회차선택</p>
        <Select
          options={titles}
          value={title}
          onChange={(value) => onTitleChange(Number(value), titles)}
          data-cy="exam-selector"
        />
        <div className="home-button-mode-wrapper">
          <Button
            type="primary"
            onClick={gotoExamPage}
            disabled={!Boolean(selectedExamId)}
            loading={gotoExamPageLoading}
            className="home-content-question-button"
          >
            풀이모드
          </Button>
          <Button
            type="primary"
            loading={gotoSolutionPageLoading}
            onClick={gotoSolutionPage}
            disabled={!Boolean(selectedExamId)}
          >
            해설모드
          </Button>
        </div>
      </div>

      <Button onClick={gotoRandomSelectPage} type="ghost">
        랜덤모의고사
      </Button>
      <div className="home-content-devide-line" />

      <Link href="/pricing/basic" style={{ width: '100%' }}>
        <Button type="primary">프리미엄 스토어</Button>
      </Link>

      <Link
        href="https://www.buymeacoffee.com/moducbts"
        className="home-random-select-link"
      >
        <Button className="">{`>> 후원하기 <<`}</Button>{' '}
      </Link>
      <a
        href="https://pinto-buffalo-54c.notion.site/CBT-760c3f095a8e4e29b17807835a8455bc"
        target="_blank"
        rel="noreferrer"
        style={{ width: '100%' }}
      >
        <Button type="primary">모두CBT 활용팁!</Button>
      </a>
      <button
        type="button"
        className="home-kakao-open-chat-button-wrapper"
        onClick={onToggleKakaoChatModalState}
      >
        <KakaoIconSVG />
        카카오톡 오픈채팅
      </button>
      <div className="home-bottom-wrapper">
        <MainViewCount />
      </div>
    </MainCenterContentBlock>
  );
};

export default MainCenterContent;
