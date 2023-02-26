import React, { useEffect, useState } from 'react';
import { useReadExamTitles } from '@lib/graphql/user/hook/useExam';
import { Button, message, Select } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';
import styled from 'styled-components';
import { addApolloState, initializeApollo } from '@modules/apollo';
import {
  READ_EXAM_CATEGORIES_QUERY,
  READ_EXAM_TITLES_QUERY,
} from '@lib/graphql/user/query/examQuery';
import { useRouter } from 'next/router';
import Layout from '@components/common/layout/Layout';
import KakaoIconSVG from '@assets/svg/kakao.svg';
import { GetStaticProps, NextPage } from 'next';
import {
  convertExamTurn,
  convertWithErrorHandlingFunc,
} from '@lib/utils/utils';
import {
  selectExamCategoryHistory,
  selectExamHistory,
  tempAnswerKey,
} from '@lib/constants';
import { LocalStorage } from '@lib/utils/localStorage';
import Link from 'next/link';
import WithHead from '@components/common/head/WithHead';
import {
  ReadAllMockExamCategoriesQuery,
  ReadMockExamTitlesByCateoryQuery,
} from '@lib/graphql/user/query/examQuery.generated';
import { useReadVisitCount } from '@lib/graphql/user/hook/useVisit';
import palette from '@styles/palette';
import KakaoOpenChatModal from '@components/common/modal/KakaoOpenChatModal';
import { ExamTitleAndId } from 'types';

interface TitlesAndCategories {
  category: string;
  titles: ExamTitleAndId[];
}
interface HomeProps {
  categoriesQuery: ReadAllMockExamCategoriesQuery;
  titlesAndCategories: TitlesAndCategories[];
}

const Home: NextPage<HomeProps> = ({
  categoriesQuery,
  titlesAndCategories,
}) => {
  const router = useRouter();
  const [gotoExamPageLoading, setGotoExamPageLoading] = useState(false);
  const [gotoSolutionPageLoading, setGotoSolutionPageLoading] = useState(false);
  const [titles, setTitles] = useState<DefaultOptionType[]>([]);
  const [selectedExamId, setSelectedExamId] = useState<number>(0);
  const [kakaoChatModalState, setKakaoChatModalState] = useState(false);
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const { data: readVisitCountQuery } = useReadVisitCount();
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
    <>
      <WithHead
        title="모두CBT | 국가고시 실기시험 부시기!"
        pageHeadingTitle="모두CBT 서비스 메인페이지"
      />
      <Layout mainBanner={true}>
        <HomeContainer>
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
                {readVisitCountQuery?.readVisitCount.ok && (
                  <div className="home-visit-count-box">{`오늘 ${readVisitCountQuery?.readVisitCount.count}`}</div>
                )}
              </div>
            </div>
          </div>
        </HomeContainer>
        <>
          <KakaoOpenChatModal
            open={kakaoChatModalState}
            onClose={onToggleKakaoChatModalState}
          />
        </>
      </Layout>
    </>
  );
};
export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const apolloClient = initializeApollo({}, '');
  const requestReadCategories = async () =>
    await apolloClient.query<ReadAllMockExamCategoriesQuery>({
      query: READ_EXAM_CATEGORIES_QUERY,
    });

  const requestReadExamTitles = async (category: string) =>
    await apolloClient.query<ReadMockExamTitlesByCateoryQuery>({
      query: READ_EXAM_TITLES_QUERY,
      variables: {
        input: {
          name: category,
        },
      },
    });
  const titlesAndCategories: TitlesAndCategories[] = [];

  const tryReadCategories = convertWithErrorHandlingFunc({
    callback: requestReadCategories,
  });

  const categoriesRes = await tryReadCategories();

  const categoriesQuery = categoriesRes?.data;
  if (categoriesQuery)
    await Promise.all(
      categoriesQuery?.readAllMockExamCategories.categories.map(
        async (category) => {
          const res = await requestReadExamTitles(category.name);
          titlesAndCategories.push({
            category: category.name,
            titles: res.data.readMockExamTitlesByCateory.titles,
          });
        }
      )
    );
  return addApolloState(apolloClient, {
    props: { categoriesQuery, titlesAndCategories },
    revalidate: 86400,
  });
};

const HomeContainer = styled.div`
  .home-wrapper {
    margin: 10px auto 40px auto;
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
  .home-visit-count-box {
    padding: 5px;
    margin-left: auto;
    text-align: right;
    font-size: 0.8rem;
    color: ${palette.gray_700};
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
`;
