import React, { useEffect, useState } from 'react';
import {
  useReadExamCategories,
  useReadExamTitles,
} from '@lib/graphql/user/hook/useExam';
import palette from '@styles/palette';
import { Button, Checkbox, message, Select } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';
import styled from 'styled-components';
import { addApolloState, initializeApollo } from '@modules/apollo';
import { READ_EXAM_CATEGORIES_QUERY } from '@lib/graphql/user/query/examQuery';
import * as cookie from 'cookie';
import { useRouter } from 'next/router';
import Layout from '@components/common/layout/Layout';
import { GetServerSideProps } from 'next';

const Home = () => {
  const router = useRouter();
  const { data: categoriesQueryData } = useReadExamCategories();
  const [readExamTitles, { data: examTitlesQueryData }] = useReadExamTitles();
  const [categories, setCategories] = useState<DefaultOptionType[]>([]);
  const [titles, setTitles] = useState<DefaultOptionType[]>([]);
  const [selectedTitle, setSelectedTitle] = useState<string>('');

  useEffect(() => {
    if (categoriesQueryData) {
      const categoires =
        categoriesQueryData.readAllMockExamCategories.categories;
      setCategories(
        categoires.map((el) => ({ value: el.name, label: el.name }))
      );
    }
  }, [categoriesQueryData]);

  const onCategoryChange = async (value: string) => {
    setSelectedTitle('');
    const { data } = await readExamTitles({
      variables: { input: { name: value } },
    });
    if (data) {
      const { readMockExamTitlesByCateory } = data;
      if (readMockExamTitlesByCateory.error) {
        return message.success(readMockExamTitlesByCateory.error);
      }
      const titles = readMockExamTitlesByCateory.titles.map((title) => ({
        value: title.id,
        label: title.title,
      }));
      setTitles(titles);
    }
  };

  const onTitleChange = async (value: string) => {
    setSelectedTitle(value);
  };

  const gotoExamPage = () => {
    if (!selectedTitle) return;
    router.push({
      pathname: '/exam',
      query: {
        e: selectedTitle,
        q: '1',
        t: examTitlesQueryData?.readMockExamTitlesByCateory.titles[0].title,
      },
    });
  };

  return (
    <Layout mainBanner={true} sideBanner={true}>
      <HomeContainer>
        <div className="home-wrapper">
          <div className="home-content-wrapper">
            <div>시험선택</div>
            <Select options={categories} onChange={onCategoryChange} />
            <div>회차선택</div>
            <Select
              options={titles}
              value={selectedTitle}
              onChange={onTitleChange}
            />
            <div className="home-checkbox-wrapper">
              <Checkbox />
              <div>문제순서 랜덤</div>
            </div>
            <Button
              type="primary"
              onClick={gotoExamPage}
              disabled={!Boolean(selectedTitle)}
            >
              문제풀기
            </Button>
            <Button type="primary" disabled={!Boolean(selectedTitle)}>
              문제/해답 보기
            </Button>
          </div>
        </div>
      </HomeContainer>
    </Layout>
  );
};
export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const parsedCookies = cookie.parse(context.req.headers.cookie as string);
  const token = parsedCookies['jwt-token'];
  const apolloClient = initializeApollo({}, token);
  await apolloClient.query({
    query: READ_EXAM_CATEGORIES_QUERY,
  });
  return addApolloState(apolloClient, { props: {} });
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
`;
