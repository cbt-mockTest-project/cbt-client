import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

interface IProps {
  title: string;
  pageHeadingTitle: string;
  description?: string;
  image?: string;
  keywords?: string;
  noIndex?: boolean;
}

const WithHead: React.FC<IProps> = ({
  title,
  description = `모두CBT는 암기장공유 서비스입니다.\n 직업상담사2급 실기,직업상담사2급,국가고시실기시험,실기cbt,산업안전기사 실기,산업안전기사실기cbt,산업안전산업기사 실기,건설안전기사 실기, 정보처리기사 실기, 전기기사 실기, 모두시비티,모두씨비티,암기고래,암기짱,단어장,영단어어플,나눔시비티,씨비티,`,
  image = '/png/logo01.png',
  keywords = '산업안전기사,산업안전기사실기,건설안전기사,건선안전기사실기,실기cbt,실기씨비티,위험물산업기사,대기환경기사,모두씨비티,나눔시비티,나눔씨비티,comcbt,엔지니오,모두시비티,산업안전기사필답형,건설안전기사필답형,산업안전기사실기CBT,전기기사,전기기사실기,전기기사실기CBT,전기기사실기단답형,전자문제집,모두CBT,정보처리기사,정보처리기사실기,정보처리기사실기CBT,암기장,모두의 암기장,암기고래,암기짱',
  pageHeadingTitle,
  noIndex = false,
}) => {
  const { asPath } = useRouter();
  const CURRENT_URL = `${process.env.NEXT_PUBLIC_CLIENT_URL}${asPath}`;
  return (
    <>
      <Head>
        <title>{title}</title>
        {noIndex && <meta name="robots" content="noindex" />}
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
        <meta property="og:image:alt" content="모두CBT" />
        <meta property="og:url" content={CURRENT_URL} />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="모두CBT" />
        <meta property="keywords" content={keywords} key="keywords" />
      </Head>
      <h1 className="hidden-title">모두CBT | 국가고시 실기시험 부시기!</h1>
      <h2 className="hidden-title">{pageHeadingTitle}</h2>
    </>
  );
};

export default React.memo(WithHead);
