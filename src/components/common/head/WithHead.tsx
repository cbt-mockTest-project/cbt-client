import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import isFuture from 'date-fns/isFuture';

interface IProps {
  title: string;
  pageHeadingTitle: string;
  description?: string;
  image?: string;
  keywords?: string;
}

const WithHead: React.FC<IProps> = ({
  title,
  description = '실기CBT는 국가고시 실기시험 준비를 도와주는 서비스 입니다',
  image = '/png/ogimg01.png',
  keywords = '실기CBT,모두CBT,산업안전기사실기, 산업안전기사, 정보처리기사, 정보처리기사실기',
  pageHeadingTitle,
}) => {
  const { asPath } = useRouter();
  const CURRENT_URL = `${process.env.NEXT_PUBLIC_CLIENT_URL}${asPath}`;
  console.log(CURRENT_URL);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} key="description" />
        <meta property="og:title" content={title} key="og:title" />
        <meta
          property="og:description"
          content={description}
          key="og:description"
        />
        <meta property="og:image" content={image} key="og:image" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="800" />
        <meta property="og:image:alt" content="실기CBT" />
        <meta property="og:url" content={CURRENT_URL} />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="실기CBT" />
        {keywords && (
          <meta property="keywords" content={keywords} key="keywords" />
        )}
      </Head>
      <h1 className="hidden-title">실기CBT | 국가고시 실기시험 부시기!</h1>
      <h2 className="hidden-title">{pageHeadingTitle}</h2>
    </>
  );
};

export default React.memo(WithHead);
