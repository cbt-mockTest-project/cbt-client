import {
  selectExamCategoryHistory,
  selectExamHistory,
  tempAnswerKey,
} from '@lib/constants';
import { ReadAllMockExamCategoriesQuery } from '@lib/graphql/user/query/examQuery.generated';
import { LocalStorage } from '@lib/utils/localStorage';
import { Button } from 'antd';
import Select, { DefaultOptionType } from 'antd/lib/select';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import KakaoIconSVG from '@assets/svg/kakao.svg';
import { ExamTitleAndId } from 'types';
import { convertExamTurn } from '@lib/utils/utils';
import palette from '@styles/palette';
import Link from 'next/link';
import Portal from '@components/common/portal/Portal';
import KakaoOpenChatModal from '@components/common/modal/KakaoOpenChatModal';
import dynamic from 'next/dynamic';
import MainViewCountSkeleton from './MainViewCountSkeleton';
import MainViewCount from './MainViewCount';

interface TitlesAndCategories {
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
  const [gotoExamPageLoading, setGotoExamPageLoading] = useState(false);
  const [gotoSolutionPageLoading, setGotoSolutionPageLoading] = useState(false);
  const [titles, setTitles] = useState<DefaultOptionType[]>([]);
  const [selectedExamId, setSelectedExamId] = useState<number>(0);
  const [kakaoChatModalState, setKakaoChatModalState] = useState(false);
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');

  const storage = new LocalStorage();

  const categories = categoriesQuery.readAllMockExamCategories.categories.map(
    (el) => ({ value: el.name, label: el.name })
  );
  useEffect(() => {
    const savedCategory = localStorage.getItem(selectExamCategoryHistory);
    const savedTitle = localStorage.getItem(selectExamHistory);
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

    const titles: DefaultOptionType[] = filteredTitles[0].titles.map(
      (title) => ({
        value: title.id,
        label: convertExamTurn(title.title),
      })
    );
    localStorage.setItem(selectExamCategoryHistory, value);
    setTitles(titles);
    return titles;
    // }
  };

  const onTitleChange = async (value: number, titles: DefaultOptionType[]) => {
    const currentTitle = titles.filter((title) => title.value === value);
    setSelectedExamId(value);
    if (currentTitle[0]) {
      setTitle(String(currentTitle[0].label));
      localStorage.setItem(selectExamHistory, String(value));
    }
  };

  const gotoExamPage = () => {
    if (!selectedExamId) return;
    storage.remove(tempAnswerKey);
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
  return (
    <MainComponentContainer>
      <div className="home-wrapper">
        <div className="home-content-wrapper">
          <p className="home-content-title">시험선택</p>
          <Select
            options={categories}
            onChange={onCategoryChange}
            value={category}
          />
          <p className="home-content-title">회차선택</p>
          <Select
            options={titles}
            // options={[{ value: 'value', label: 'label' }]}
            value={title}
            onChange={(value) => onTitleChange(Number(value), titles)}
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
          <button
            type="button"
            className="home-kakao-open-chat-button-wrapper"
            onClick={onToggleKakaoChatModalState}
          >
            <KakaoIconSVG />
            카카오톡 오픈채팅
          </button>
          <div className="home-bottom-wrapper">
            <a href="https://www.buymeacoffee.com/moducbts">
              <img
                src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=moducbts&button_colour=FFDD00&font_colour=000000&font_family=Comic&outline_colour=000000&coffee_colour=ffffff"
                alt="buy me a coffee"
              />
            </a>
            <MainViewCount />
          </div>
        </div>
      </div>
      <div className="home-exam-link-list">
        <h2 className="home-exam-link-title">전체 시험지 리스트</h2>
        {examLinks.map((link) => (
          <li key={link.id} className="home-exam-link-item">
            <Link href={`/exam/solution/${link.id}`}>{link.title}</Link>
          </li>
        ))}
      </div>
      <Portal>
        <KakaoOpenChatModal
          open={kakaoChatModalState}
          onClose={onToggleKakaoChatModalState}
        />
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

  .home-content-wrapper {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 250px;
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
  .home-exam-link-list {
    width: max-content;
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
    .home-exam-link-title {
      text-align: center;
      position: sticky;
      top: 0px;
      background-color: white;
      font-size: 0.9rem;
      padding: 10px 20px;
      box-shadow: rgb(0 0 0 / 10%) 0px 1px 5px 1px;
    }
    .home-exam-link-item {
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