import KakaoIconSVG from '@assets/svg/kakao.svg';
import KakaoOpenChatModal from '@components/common/modal/KakaoOpenChatModal';
import NoticeModal from '@components/common/modal/NoticeModal';
import Portal from '@components/common/portal/Portal';
import {
  OPEN_CHAT_MODAL_STATE,
  selectedCategoryHistory,
  selectedTitleHistory,
  tempAnswerKey,
} from '@lib/constants';
import { ReadAllMockExamCategoriesQuery } from '@lib/graphql/user/query/examQuery.generated';
import useToggle from '@lib/hooks/useToggle';
import { LocalStorage } from '@lib/utils/localStorage';
import palette from '@styles/palette';
import { Button, Radio, RadioChangeEvent } from 'antd';
import Select, { DefaultOptionType } from 'antd/lib/select';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ExamTitleAndId } from 'types';
import MainViewCount from './MainViewCount';
import { EXAM_TYPE } from './Main.type';
import MyExamSelector from './MyExamSelector';

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
  const [kakaoChatModalState, setKakaoChatModalState] = useState(false);
  const [isMyExam, setIsMyExam] = useState<boolean>(false);

  const [selectedModucbtCategory, setSelectedModucbtCategory] =
    useState<DefaultOptionType | null>(null);
  const [selectedModucbtTitle, setSelectedModucbtTitle] =
    useState<DefaultOptionType | null>(null);

  const [selectedMyCategory, setSelectedMyCategory] =
    useState<DefaultOptionType | null>(null);
  const [selectedMyTitle, setSelectedMyTitle] =
    useState<DefaultOptionType | null>(null);

  const storage = new LocalStorage();
  const categories = categoriesQuery.readAllMockExamCategories.categories.map(
    (el) => ({ value: el.name, label: el.name, authorRole: el.user.role })
  );
  useEffect(() => {
    const savedCategory = storage.get(selectedCategoryHistory);
    const savedTitle = storage.get(selectedTitleHistory);
    if (!storage.get(OPEN_CHAT_MODAL_STATE)) {
      onToggleNoticeModal();
    }
    (async () => {
      if (savedCategory) {
        const currentTitles: DefaultOptionType[] = await onCategoryChange(
          savedCategory
        );
        if (savedTitle && currentTitles) {
          onTitleChange(savedTitle);
        }
      }
    })();
  }, []);

  const onToggleKakaoChatModalState = () =>
    setKakaoChatModalState(!kakaoChatModalState);

  const onCategoryChange = async (category: DefaultOptionType) => {
    setSelectedModucbtCategory(category);
    setSelectedModucbtTitle(null);
    const filteredTitles = titlesAndCategories.filter(
      (el) => el.category === category.value
    );

    const titles: DefaultOptionType[] =
      filteredTitles.length >= 1
        ? filteredTitles[0].titles.map((title) => ({
            value: title.id,
            label: title.slug || title.title,
          }))
        : [];
    storage.set(selectedCategoryHistory, category);
    setTitles(titles);
    return titles;
  };

  const onTitleChange = async (title: DefaultOptionType) => {
    setSelectedModucbtTitle(title);
    storage.set(selectedTitleHistory, title);
  };

  const gotoExamPage = () => {
    if (isMyExam && selectedMyTitle && selectedMyCategory) {
      router.push({
        pathname: '/exam',
        query: {
          e: selectedMyTitle?.value,
          q: '1',
          r: false,
          t: selectedMyTitle?.label as string,
          c: selectedMyCategory?.label as string,
        },
      });
      return;
    }
    const currentExamTitles = titlesAndCategories.filter(
      (data) => data.category === selectedModucbtCategory?.label
    );
    if (currentExamTitles.length === 1) {
      const currentExamTitle = currentExamTitles[0].titles.filter(
        (title) => title.id === selectedModucbtTitle?.value
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
        e: selectedModucbtTitle?.value,
        q: '1',
        r: false,
        t: selectedModucbtTitle?.label as string,
        c: selectedModucbtCategory?.label as string,
      },
    });
  };
  const gotoSolutionPage = () => {
    setGotoSolutionPageLoading(true);
    router.push({
      pathname: `/exam/solution/${
        isMyExam ? selectedMyTitle?.value : selectedModucbtTitle?.value
      }`,
    });
  };
  const gotoRandomSelectPage = () => {
    router.push(`${router.pathname}/exam/randomselect`);
  };
  const onCloseNoticeModal = () => {
    onToggleNoticeModal();
  };
  const onChangeExamType = (e: RadioChangeEvent) => {
    if (e.target.value === EXAM_TYPE.MODUCBT_EXAM) {
      setIsMyExam(false);
    } else {
      setIsMyExam(true);
    }
  };
  return (
    <MainComponentContainer>
      <div className="home-wrapper">
        <div className="home-content-center-wrapper">
          <div className="home-content-top-wrapper">
            <Radio.Group
              onChange={onChangeExamType}
              defaultValue={EXAM_TYPE.MODUCBT_EXAM}
            >
              <Radio.Button value={EXAM_TYPE.MODUCBT_EXAM}>
                모두CBT
              </Radio.Button>
              <Radio.Button value={EXAM_TYPE.MY_EXAM}>내 시험지</Radio.Button>
            </Radio.Group>
            {isMyExam && (
              <Link href="/exam/write">
                <Button type="primary">시험지 만들기</Button>
              </Link>
            )}
            {isMyExam ? (
              <MyExamSelector
                selectedMyCategory={selectedMyCategory}
                setSelectedMyCategory={setSelectedMyCategory}
                selectedMyTitle={selectedMyTitle}
                setSelectedMyTitle={setSelectedMyTitle}
              />
            ) : (
              <>
                <Select
                  value={selectedModucbtCategory}
                  size="large"
                  onChange={(value, option) =>
                    onCategoryChange(option as DefaultOptionType)
                  }
                  data-cy="category-selector"
                  placeholder="카테고리를 선택해주세요"
                  options={categories}
                />
                <Select
                  options={titles}
                  size="large"
                  value={selectedModucbtTitle}
                  placeholder="시험을 선택해주세요."
                  onChange={(value, option) =>
                    onTitleChange(option as DefaultOptionType)
                  }
                  data-cy="exam-selector"
                />
              </>
            )}
            <div className="home-button-mode-wrapper">
              <Button
                type="primary"
                onClick={gotoExamPage}
                disabled={
                  !!(isMyExam && !selectedMyTitle) ||
                  !!(!isMyExam && !selectedModucbtTitle)
                }
                loading={gotoExamPageLoading}
                className="home-content-question-button"
              >
                풀이모드
              </Button>
              <Button
                type="primary"
                loading={gotoSolutionPageLoading}
                onClick={gotoSolutionPage}
                disabled={
                  !!(isMyExam && !selectedMyTitle) ||
                  !!(!isMyExam && !selectedModucbtTitle)
                }
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

          <a
            href="https://pinto-buffalo-54c.notion.site/CBT-760c3f095a8e4e29b17807835a8455bc"
            target="_blank"
            rel="noreferrer"
            style={{ width: '100%' }}
          >
            <Button>모두CBT 활용팁</Button>
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
