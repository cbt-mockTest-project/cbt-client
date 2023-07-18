import KakaoIconSVG from '@assets/svg/kakao.svg';
import KakaoOpenChatModal from '@components/common/modal/KakaoOpenChatModal';
import NoticeModal from '@components/common/modal/NoticeModal';
import Portal from '@components/common/portal/Portal';
import {
  OPEN_CHAT_MODAL_STATE,
  selectExamCategoryHistory,
  selectExamHistory,
  tempAnswerKey,
} from '@lib/constants';
import { ReadAllMockExamCategoriesQuery } from '@lib/graphql/user/query/examQuery.generated';
import useToggle from '@lib/hooks/useToggle';
import { LocalStorage } from '@lib/utils/localStorage';
import palette from '@styles/palette';
import { Button } from 'antd';
import { Option } from 'antd/lib/mentions';
import Select, { DefaultOptionType } from 'antd/lib/select';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { ExamTitleAndId, User, UserRole } from 'types';
import MainViewCount from './MainViewCount';

export interface TitlesAndCategories {
  category: string;
  titles: ExamTitleAndId[];
}
interface MainComponentProps {
  categoriesQuery: ReadAllMockExamCategoriesQuery;
  titlesAndCategories: TitlesAndCategories[];
}

const MainComponent: React.FC<MainComponentProps> = ({
  categoriesQuery,
  titlesAndCategories,
}) => {
  const router = useRouter();
  const [gotoExamPageLoading, setGotoExamPageLoading] = useState(false);
  const [gotoSolutionPageLoading, setGotoSolutionPageLoading] = useState(false);
  const { value: noticeModalState, onToggle: onToggleNoticeModal } =
    useToggle(false);
  const [titles, setTitles] = useState<DefaultOptionType[]>([]);
  const [selectedExamId, setSelectedExamId] = useState<number>(0);
  const [kakaoChatModalState, setKakaoChatModalState] = useState(false);
  const [category, setCategory] = useState<string>();
  const [title, setTitle] = useState<string>();
  const storage = new LocalStorage();
  const categories = categoriesQuery.readAllMockExamCategories.categories.map(
    (el) => ({ value: el.name, label: el.name, authorRole: el.user.role })
  );
  useEffect(() => {
    const savedCategory = localStorage.getItem(selectExamCategoryHistory);
    const savedTitle = localStorage.getItem(selectExamHistory);
    if (!storage.get(OPEN_CHAT_MODAL_STATE)) {
      onToggleNoticeModal();
    }
    (async () => {
      if (savedCategory) {
        const currentTitles: DefaultOptionType[] = await onCategoryChange(
          savedCategory
        );
        if (savedTitle && currentTitles) {
          onTitleChange(Number(savedTitle), currentTitles);
        }
      }
    })();
  }, []);

  const onToggleKakaoChatModalState = () =>
    setKakaoChatModalState(!kakaoChatModalState);
  const onCategoryChange = async (value: string) => {
    setSelectedExamId(0);
    setCategory(value);
    setTitle('');
    const filteredTitles = titlesAndCategories.filter(
      (el) => el.category === value
    );

    const titles: DefaultOptionType[] =
      filteredTitles.length >= 1
        ? filteredTitles[0].titles.map((title) => ({
            value: title.id,
            label: title.slug || title.title,
          }))
        : [];
    localStorage.setItem(selectExamCategoryHistory, value);
    setTitles(titles);
    return titles;
  };

  const onTitleChange = async (value: number, titles: DefaultOptionType[]) => {
    const currentTitle = titles.filter((title) => title.value === value);
    if (currentTitle[0]) {
      setSelectedExamId(value);
      setTitle(String(currentTitle[0].label));
      localStorage.setItem(selectExamHistory, String(value));
    }
  };

  const gotoExamPage = () => {
    if (!selectedExamId) return;
    const currentExamTitles = titlesAndCategories.filter(
      (data) => data.category === category
    );
    if (currentExamTitles.length === 1) {
      const currentExamTitle = currentExamTitles[0].titles.filter(
        (title) => title.id === selectedExamId
      )[0].title;
      const answerRecords = storage.get(tempAnswerKey);
      const selectedAnswerRecord = answerRecords[currentExamTitle];
      if (selectedAnswerRecord) {
        const confirmed = confirm(
          '이전 작성 답안이 남아있습니다.\n삭제를 원하시면 확인을 눌러주세요.\n유지를 원하시면 취소를 눌러주세요.'
        );
        if (confirmed) {
          delete answerRecords[currentExamTitle];
          storage.set(tempAnswerKey, answerRecords);
        }
      }
    }
    setGotoExamPageLoading(true);
    router.push({
      pathname: '/exam',
      query: {
        e: selectedExamId,
        q: '1',
        r: false,
        t: title,
        c: category,
      },
    });
  };
  const gotoSolutionPage = () => {
    setGotoSolutionPageLoading(true);
    router.push({
      pathname: `/exam/solution/${selectedExamId}`,
    });
  };
  const gotoRandomSelectPage = () => {
    router.push(`${router.pathname}/exam/randomselect`);
  };
  const onCloseNoticeModal = () => {
    onToggleNoticeModal();
  };
  return (
    <MainComponentContainer>
      <div className="home-wrapper">
        <div className="home-content-center-wrapper">
          <div className="home-content-top-wrapper">
            <Select
              value={category}
              size="large"
              onChange={onCategoryChange}
              data-cy="category-selector"
              placeholder="카테고리를 선택해주세요"
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
            <Select
              options={titles}
              size="large"
              value={title}
              placeholder="시험을 선택해주세요."
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
          <Button onClick={gotoRandomSelectPage}>랜덤모의고사</Button>
          <div className="home-content-devide-line" />

          <Link href="/pricing" style={{ width: '100%' }}>
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
        </div>
      </div>
      <Portal>
        <KakaoOpenChatModal
          open={kakaoChatModalState}
          onClose={onToggleKakaoChatModalState}
        />
        <NoticeModal open={noticeModalState} onClose={onCloseNoticeModal} />
      </Portal>
    </MainComponentContainer>
  );
};

export default MainComponent;

const MainComponentContainer = styled.div`
  margin-top: 15px;
  .home-wrapper {
    margin: 10px auto 0 auto;
    display: flex;
    gap: 30px;
  }
  .home-content-top-wrapper {
    width: 100%;
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .home-random-select-link {
    width: 100%;
  }
  .home-content-devide-line {
    content: '';
    width: 100%;
    height: 2px;
    border: 1px dashed ${palette.gray_300};
  }
  .home-content-center-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 0 20px;
    max-width: 350px;
    margin: 0 auto;
    .ant-select {
      width: 100%;
    }
    button {
      width: 100%;
      height: 45px;
    }
  }

  .home-bottom-wrapper {
    margin: 0 auto;
  }

  .home-button-mode-wrapper {
    margin-top: 10px;
    display: flex;
    width: 100%;
    gap: 10px;
  }

  .home-kakao-open-chat-button-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${palette.yellow_kakao};
    font-size: 0.9rem;
    gap: 10px;
    transition: all 0.3s;
    border-radius: 6px;
    :hover {
      opacity: 0.7;
    }
    svg {
      height: 25px;
    }
  }
`;
