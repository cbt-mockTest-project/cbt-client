import React, { useEffect, useState } from 'react';
import {
  useReadExamCategories,
  useReadExamTitles,
} from '@lib/graphql/user/hook/useExam';
import palette from '@styles/palette';
import { Button, message, Select } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';
import styled from 'styled-components';
import { addApolloState, initializeApollo } from '@modules/apollo';
import { READ_EXAM_CATEGORIES_QUERY } from '@lib/graphql/user/query/examQuery';
import { useRouter } from 'next/router';
import Layout from '@components/common/layout/Layout';
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
import { responsive } from '@lib/utils/responsive';
import { ReadAllMockExamCategoriesQuery } from '@lib/graphql/user/query/examQuery.generated';

interface HomeProps {
  categoriesQuery: ReadAllMockExamCategoriesQuery;
}

const Home: NextPage<HomeProps> = ({ categoriesQuery }) => {
  const router = useRouter();
  const [readExamTitles] = useReadExamTitles();
  const [titles, setTitles] = useState<DefaultOptionType[]>([]);
  const [selectedExamId, setSelectedExamId] = useState<number>(0);
  const [isRandom, setIsRandom] = useState(false);
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

  const onCategoryChange = async (value: string) => {
    setSelectedExamId(0);
    setCategory(value);
    const { data } = await readExamTitles({
      variables: { input: { name: value } },
    });
    if (data) {
      const { readMockExamTitlesByCateory } = data;
      if (readMockExamTitlesByCateory.error) {
        return message.success(readMockExamTitlesByCateory.error);
      }
      const titles: DefaultOptionType[] =
        readMockExamTitlesByCateory.titles.map((title) => ({
          value: title.id,
          label: convertExamTurn(title.title),
        }));
      localStorage.setItem(selectExamCategoryHistory, value);
      setTitles(titles);
      return titles;
    }
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
    router.push({
      pathname: '/exam',
      query: {
        e: selectedExamId,
        q: '1',
        r: isRandom,
      },
    });
  };

  return (
    <>
      <WithHead
        title="모두CBT | 국가고시 실기시험 부시기!"
        pageHeadingTitle="모두CBT 서비스 메인페이지"
      />
      <Layout mainBanner={true} sideBanner={true}>
        <HomeContainer>
          <div className="home-wrapper">
            <div className="home-content-wrapper">
              <div>시험선택</div>
              <Select
                options={categories}
                onChange={onCategoryChange}
                value={category}
              />
              <div>회차선택</div>
              <Select
                options={titles}
                value={title}
                onChange={(value) => onTitleChange(Number(value), titles)}
              />
              <div className="home-checkbox-wrapper">
                {/* <Checkbox
                  onChange={() => setIsRandom(!isRandom)}
                  checked={isRandom}
                />
                <div>문제순서 랜덤</div> */}
              </div>
              <Button
                type="primary"
                onClick={gotoExamPage}
                disabled={!Boolean(selectedExamId)}
              >
                문제풀기
              </Button>
              <Button type="primary" disabled={!Boolean(selectedExamId)}>
                <Link href={`/exam/solution/${selectedExamId}`}>
                  문제/해답 보기
                </Link>
              </Button>
            </div>
          </div>
        </HomeContainer>
      </Layout>
    </>
  );
};
export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const apolloClient = initializeApollo({}, '');
  const request = async () =>
    await apolloClient.query<ReadAllMockExamCategoriesQuery>({
      query: READ_EXAM_CATEGORIES_QUERY,
    });

  const tryRequest = convertWithErrorHandlingFunc({
    callback: request,
  });

  const res = await tryRequest();
  const categoriesQuery = res?.data;
  return addApolloState(apolloClient, {
    props: { categoriesQuery },
    revalidate: 86400,
  });
};

const HomeContainer = styled.div`
  .home-sub-banner-wrapper {
    display: flex;
    flex-direction: column;
    gap: 30px;
    flex: 1;
  }
  .home-sub-banner {
    width: 250px;
    height: 180px;
    background-color: ${palette.gray_200};
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .home-wrapper {
    margin-top: 40px;
    display: flex;
    gap: 30px;
  }

  .home-content-wrapper {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 10px;
    .ant-select {
      width: 50%;
    }
    button {
      width: 50%;
      height: 45px;
    }
  }
  .home-checkbox-wrapper {
    display: flex;
    gap: 10px;
    align-items: center;
    margin: 20px 0;
  }
  @media (max-width: ${responsive.medium}) {
    .home-wrapper {
      margin-top: 0px;
    }
  }
`;
