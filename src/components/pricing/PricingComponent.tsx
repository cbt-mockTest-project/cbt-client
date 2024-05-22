import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { responsive } from '@lib/utils/responsive';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PricingCard, { PricingCardProps } from './PricingCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { checkRole } from '@lib/utils/utils';
import palette from '@styles/palette';
import useToggle from '@lib/hooks/useToggle';
import PricingSelectModal from './PricingSelectModal';
import usePayment from './usePayment';
import { Pagination } from 'swiper/modules';
import { useRouter } from 'next/router';
import BasicPaymentSelectModalModal from './BasicPaymentSelectModal';
import { Collapse } from 'antd';

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
  const [price, setPrice] = useState(0);
  const { value: isEhsSelectModalOpen, onToggle: toggleEhsSelectModalOpen } =
    useToggle(false);
  const { value: isBasicModalOpen, onToggle: toggleBasicModalOpen } =
    useToggle(false);

  const openEhsMasterPayModal = () => {
    setPrice(0);
    toggleEhsSelectModalOpen();
  };

  const pricingCardData: PricingCardProps[] = [
    {
      title: '베이직 플랜',
      intro: '베이직 플랜으로\n학습효율을 높여보세요!',
      price: 9900,
      beforeDiscountPrice: 12000,
      endDate: '이용기간: 선택',
      benefits: [
        '광고제거',
        '무제한 문제풀이',
        '무제한 모의고사',
        '무제한 출력',
      ],
      confirmDisabled: false,
      onConfirm: toggleBasicModalOpen,
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
    },
    {
      title: 'AI 문제봇 대여',
      endDate: '이용기간: 3개월',
      intro: 'AI 문제봇을 활용하여\n효율적인 학습을 경험해보세요!',
      price: 10000,
      benefits: [
        '산업안전기사, 건설안전기사 과목만 이용가능',
        '베이직플랜 이용자 5천원 할인',
      ],
      confirmDisabled: false,
      confirmLabel: '대여 메뉴얼 보기',
      onConfirm: () => {
        window.open(
          'https://spotless-possum-447.notion.site/3fb69d17bb024649945b77d1d50fa2e7',
          '_blank',
          'noopener'
        );
      },
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
      <h3 className="pricing-title">모두CBT 프리미엄 이용권</h3>
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
      <div className="mt-4 max">
        <Collapse>
          <Collapse.Panel header="자주하는 질문" key="1">
            <ul className="flex flex-col gap-4">
              <li>
                <strong>Q. 베이직 플랜은 어떤 암기장에 적용되나요?</strong>
                <p>
                  A. 베이직 플랜은 <strong>{`"직8딴 시리즈"`}</strong>를 제외한
                  모두CBT에서 제공하는 모든 암기장에 적용됩니다.
                </p>
              </li>
              <li>
                <strong>
                  Q. 직8딴 플랜을 구매하면 베이직플랜도 적용되나요?
                </strong>
                <p>
                  A. 적용되지 않습니다. 직8딴 플랜을 결제하실 경우 결제한 과목에
                  대해서만 이용이 가능합니다.
                </p>
              </li>
            </ul>
          </Collapse.Panel>
        </Collapse>
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
      {isEhsSelectModalOpen && (
        <PricingSelectModal
          open={isEhsSelectModalOpen}
          onClose={toggleEhsSelectModalOpen}
          price={price}
          setPrice={setPrice}
        />
      )}
      {isBasicModalOpen && (
        <BasicPaymentSelectModalModal
          title="모두CBT 베이직 플랜"
          open={isBasicModalOpen}
          onClose={toggleBasicModalOpen}
          price={price}
          setPrice={setPrice}
        />
      )}
    </PricingComponentBlock>
  );
};

export default PricingComponent;
