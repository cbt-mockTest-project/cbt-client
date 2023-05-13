import KakaoIconSVG from '@assets/svg/kakao.svg';
import DataShareModal from '@components/common/modal/DataShareModal';
import KakaoOpenChatModal from '@components/common/modal/KakaoOpenChatModal';
import MakeExamModal from '@components/common/modal/MakeExamModal';
import NoticeModal from '@components/common/modal/NoticeModal';
import PreventAdBlockModal from '@components/common/modal/PreventAdBlockModal';
import RemoveAdModal from '@components/common/modal/RemoveAdModal';
import Portal from '@components/common/portal/Portal';
import {
  selectExamCategoryHistory,
  selectExamHistory,
  tempAnswerKey,
} from '@lib/constants';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import { ReadAllMockExamCategoriesQuery } from '@lib/graphql/user/query/examQuery.generated';
import useToggle from '@lib/hooks/useToggle';
import { LocalStorage } from '@lib/utils/localStorage';
import { checkAdblock } from '@lib/utils/utils';
import palette from '@styles/palette';
import { Button } from 'antd';
import { Option } from 'antd/lib/mentions';
import Select, { DefaultOptionType } from 'antd/lib/select';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ExamTitleAndId, UserRole } from 'types';
import MainViewCount from './MainViewCount';
import RecentNoticeSkeleton from './RecentNoticeSkeleton';
import { getCookie, setCookie } from 'cookies-next';

const RecentNotice = dynamic(() => import('./RecentNotice'), {
  ssr: false,
  loading: () => <RecentNoticeSkeleton />,
});
export interface TitlesAndCategories {
  category: string;
  titles: ExamTitleAndId[];
}

interface MainComponentProps {
  categoriesQuery: ReadAllMockExamCategoriesQuery;
  titlesAndCategories: TitlesAndCategories[];
  examLinks: ExamTitleAndId[];
}

const MainComponent: React.FC<MainComponentProps> = ({
  categoriesQuery,
  titlesAndCategories,
  examLinks,
}) => {
  const router = useRouter();
  const { data: meQuery } = useMeQuery();
  const [gotoExamPageLoading, setGotoExamPageLoading] = useState(false);
  const {
    value: preventAdBlockModalState,
    onToggle: onTogglePreventAdBlockModal,
  } = useToggle(false);
  const [gotoSolutionPageLoading, setGotoSolutionPageLoading] = useState(false);
  const { value: noticeModalState, onToggle: onToggleNoticeModal } =
    useToggle(false);
  const { value: removeAdModalState, onToggle: onToggleRemoveAdModal } =
    useToggle(false);

  const { value: makeExamModalState, onToggle: onToggleMakeExamModal } =
    useToggle();
  const [titles, setTitles] = useState<DefaultOptionType[]>([]);
  const [selectedExamId, setSelectedExamId] = useState<number>(0);
  const [kakaoChatModalState, setKakaoChatModalState] = useState(false);
  const { value: dataShareModalState, onToggle: onToggleDataShareModal } =
    useToggle(false);
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const storage = new LocalStorage();
  const categories = categoriesQuery.readAllMockExamCategories.categories.map(
    (el) => ({ value: el.name, label: el.name, authorRole: el.user.role })
  );
  useEffect(() => {
    const savedCategory = localStorage.getItem(selectExamCategoryHistory);
    const savedTitle = localStorage.getItem(selectExamHistory);

    if (getCookie('noticeModal') !== '2') {
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
    if (checkAdblock() && !meQuery?.me.user?.isAllowAdblock) {
      onTogglePreventAdBlockModal();
      return;
    }
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
    if (checkAdblock() && !meQuery?.me.user?.isAllowAdblock) {
      onTogglePreventAdBlockModal();
      return;
    }
    setGotoSolutionPageLoading(true);
    router.push({
      pathname: `/exam/solution/${selectedExamId}`,
    });
  };
  const gotoRandomSelectPage = () => {
    if (checkAdblock() && !meQuery?.me.user?.isAllowAdblock) {
      onTogglePreventAdBlockModal();
      return;
    }
    router.push('/exam/randomselect');
  };
  const onCloseNoticeModal = () => {
    // const value = storage.get('firstNoticeModal');
    const value = getCookie('noticeModal');
    value
      ? setCookie('noticeModal', '2', {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
        })
      : setCookie('noticeModal', '1', {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
        });
    onToggleNoticeModal();
  };
  return (
    <MainComponentContainer>
      <div className="home-wrapper">
        <div className="home-content-wrapper">
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
          <Button onClick={onToggleRemoveAdModal} type="primary">
            광고제거안내
          </Button>
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
      {/* <RecentNotice /> */}
      <div className="home-exam-link-list">
        <h2 className="home-exam-link-title">전체 시험지 리스트</h2>
        {examLinks.map((link) => (
          <li key={link.id} className="home-exam-link-item">
            <Link href={`/exam/solution/${link.id}`}>{link.title}</Link>
          </li>
        ))}
      </div>

      <Portal>
        {preventAdBlockModalState && (
          <PreventAdBlockModal
            open={preventAdBlockModalState}
            onClose={onTogglePreventAdBlockModal}
          />
        )}

        {kakaoChatModalState && (
          <KakaoOpenChatModal
            open={kakaoChatModalState}
            onClose={onToggleKakaoChatModalState}
          />
        )}
        {makeExamModalState && (
          <MakeExamModal
            open={makeExamModalState}
            onClose={onToggleMakeExamModal}
          />
        )}
        {dataShareModalState && (
          <DataShareModal
            open={dataShareModalState}
            onClose={onToggleDataShareModal}
          />
        )}
        {noticeModalState && (
          <NoticeModal open={noticeModalState} onClose={onCloseNoticeModal} />
        )}
        {removeAdModalState && (
          <RemoveAdModal
            open={removeAdModalState}
            onClose={onToggleRemoveAdModal}
          />
        )}
      </Portal>
    </MainComponentContainer>
  );
};

export default MainComponent;

const MainComponentContainer = styled.div`
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
  .home-content-wrapper {
    flex: 2;
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
  .home-checkbox-wrapper {
    display: flex;
    gap: 10px;
    align-items: center;
    margin: 20px 0;
  }
  .home-bottom-wrapper {
    margin: 0 auto;
    margin-top: 10px;
  }

  .home-button-mode-wrapper {
    margin-top: 10px;
    display: flex;
    width: 100%;
    gap: 10px;
  }
  .home-content-title {
    margin-right: auto;
  }

  .home-kakao-open-chat-button-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${palette.yellow_kakao};
    font-size: 0.9rem;
    gap: 10px;
    transition: all 0.3s;
    :hover {
      opacity: 0.7;
    }
    svg {
      height: 25px;
    }
  }
  .home-content-exam-category-wrapper {
    width: 100%;
    display: flex;
  }
  .home-content-exam-category-info {
    display: flex;
    gap: 5px;
    align-items: center;
  }
  .home-content-category-color-box {
    width: 20px;
    height: 10px;
  }
  .home-content-category-color-box.admin {
    background-color: black;
  }
  .home-content-category-color-box.user {
    background-color: ${palette.blue_600};
  }
  .home-content-exam-category-info-label {
    font-size: 0.8rem;
    color: ${palette.gray_700};
  }

  .home-exam-link-list,
  .home-recent-notice-list {
    width: max-content;
    min-width: 285px;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    font-size: 0.8rem;
    gap: 5px;
    max-height: 300px;
    overflow-y: scroll;
    margin: 20px auto 40px auto;
    border: 1px solid ${palette.gray_200};
    position: relative;
    .home-exam-link-title,
    .home-recent-notice-title {
      text-align: center;
      position: sticky;
      top: 0px;
      background-color: white;
      font-size: 0.9rem;
      padding: 10px 20px;
      box-shadow: rgb(0 0 0 / 10%) 0px 1px 5px 1px;
    }
    .home-exam-link-item,
    .home-recent-notice-list-item {
      list-style: none;
      text-align: center;
      a {
        padding: 10px 20px;
        display: block;
      }
      :hover {
        background-color: ${palette.gray_100};
      }
    }
  }
`;
