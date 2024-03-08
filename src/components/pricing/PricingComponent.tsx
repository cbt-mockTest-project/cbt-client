import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { responsive } from '@lib/utils/responsive';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PricingCard, { PricingCardProps } from './PricingCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useCreateFreeTrial, useMeQuery } from '@lib/graphql/hook/useUser';
import { message } from 'antd';
import { checkRole } from '@lib/utils/utils';
import palette from '@styles/palette';
import { useAppDispatch } from '@modules/redux/store/configureStore';
import { coreActions } from '@modules/redux/slices/core';
import { loginModal } from '@lib/constants';
import useToggle from '@lib/hooks/useToggle';
import PricingSelectModal from './PricingSelectModal';
import usePayment from './usePayment';
import { Pagination } from 'swiper/modules';
import { useRouter } from 'next/router';

const PricingComponentBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 100vw;
  height: 100vh;
  padding: 20px 30px 30px 30px;
  font-size: 14px;
  .pricing-title {
    font-size: 16px;
    font-weight: 700;
  }
  .pricing-intro {
    margin-top: 15px;
  }
  .pricing-card-wrapper {
    display: flex;
    gap: 20px;
    margin-top: 30px;
    justify-content: center;
  }
  .pricing-card-swiper {
    overflow: unset;
    width: 100%;
    .swiper-pagination {
      top: 0;
      height: 20px;
      text-align: right;
      .swiper-pagination-bullet:last-child {
        margin-right: 25px;
      }
    }
  }
  .pricing-card-swiper-slide {
    width: 300px;
    height: 100%;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    padding: 20px;
  }
  .pricing-contact {
    margin-top: 30px;
    color: ${palette.antd_blue_01};
    pre {
      overflow: hidden;
    }
  }
  .pricing-refund-policy-anchor {
    margin-top: 20px;
    color: ${palette.gray_700};
    font-size: 14px;
    text-decoration: underline;
  }
  @media (max-width: ${responsive.medium}) {
    padding: 20px 16px;
    .pricing-card-wrapper {
      width: 100%;
    }
  }
  @media (max-width: 650px) {
    width: 300px;
  }
`;

interface PricingComponentProps {}

const PricingComponent: React.FC<PricingComponentProps> = ({}) => {
  const router = useRouter();
  const [swiper, setSwiper] = useState<any>(null);
  const { handlePayment } = usePayment();
  const [price, setPrice] = useState(0);
  const { data: meQuery } = useMeQuery();
  const { value: selectModalState, onToggle: toggleSelectModal } =
    useToggle(false);

  const handleBasicPlanPayment = () =>
    handlePayment({
      orderName: '모두CBT 베이직 플랜',
      price: 9900,
      roleId: 1,
      checkRoleIds: [1, 2],
    });

  const openEhsMasterPayModal = () => {
    setPrice(0);
    toggleSelectModal();
  };

  const pricingCardData: PricingCardProps[] = [
    {
      title: '베이직 플랜',
      intro: '베이직 플랜으로\n학습효율을 높여보세요!',
      price: 9900,
      endDate: '이용기간: 3개월',
      benefits: [
        '광고제거',
        '무제한 문제풀이',
        '무제한 모의고사',
        '무제한 출력',
      ],
      // benefits: ['광고제거', '랜덤모의고사 무제한 제공'],
      confirmDisabled: meQuery?.me.user
        ? checkRole({ roleIds: [1, 2], meQuery })
        : false,
      onConfirm: handleBasicPlanPayment,
      roleIds: [1],
    },
    {
      title: '직8딴 플랜',
      endDate: '이용기간: ~ 2024-12-25 까지',
      intro:
        '- 기출 중복 문제 소거\n- 답안 글자 수 최소화\n- 키워드별 문제 구성 ',
      price: 16000,
      priceAltText: '16,000 ~',
      benefits: [
        '직8딴 암기장 학습시스템 제공',
        '구매자 전용 오픈톡방을 통한 저자의 즉각 질문답변 대응',
        '광고제거',
      ],
      confirmDisabled: false,
      onConfirm: openEhsMasterPayModal,
      roleIds: [4, 5, 6, 7],
    },
  ];

  useEffect(() => {
    if (!swiper) return;
    if (router.query.tab === 'ehs_master') {
      swiper.slideTo(1, 0);
    }
  }, [router.query.tab, swiper]);

  return (
    <PricingComponentBlock>
      <h3 className="pricing-title">모두CBT 프리미엄 스토어</h3>
      <p className="pricing-intro">
        더욱 효율적인 학습을 원하신다면 프리미엄 서비스에 가입해 보세요.
      </p>
      <div className="pricing-card-wrapper">
        <Swiper
          slidesPerView={1}
          threshold={10}
          spaceBetween={20}
          onSwiper={(swiper) => {
            setSwiper(swiper);
          }}
          breakpoints={{
            650: {
              modules: [],
              slidesPerView: 'auto',
              pagination: false,
            },
          }}
          modules={[Pagination]}
          pagination={{ clickable: true }}
          className="pricing-card-swiper"
        >
          {pricingCardData.map((data) => (
            <SwiperSlide className="pricing-card-swiper-slide" key={data.title}>
              <PricingCard {...data} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <a
        className="pricing-contact"
        href="https://open.kakao.com/o/sZy6kxbf"
        target="_blank"
        rel="noreferrer"
      >
        <pre>{`[문의]\nhttps://open.kakao.com/o/sZy6kxbf`}</pre>
      </a>
      <a
        className="pricing-refund-policy-anchor"
        href="/refund/policy"
        target="_blank"
        rel="noreferrer"
      >
        환불안내
      </a>
      {selectModalState && (
        <PricingSelectModal
          open={selectModalState}
          onClose={toggleSelectModal}
          price={price}
          setPrice={setPrice}
        />
      )}
    </PricingComponentBlock>
  );
};

export default PricingComponent;
