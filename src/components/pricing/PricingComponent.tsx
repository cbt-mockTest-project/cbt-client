import { responsive } from '@lib/utils/responsive';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PricingCard, { PricingCardProps } from './PricingCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { useCreateFreeTrial, useMeQuery } from '@lib/graphql/user/hook/useUser';
import { message } from 'antd';
import { checkRole } from '@lib/utils/utils';
import palette from '@styles/palette';
import { useAppDispatch } from '@modules/redux/store/configureStore';
import { coreActions } from '@modules/redux/slices/core';
import { loginModal } from '@lib/constants';
import useToggle from '@lib/hooks/useToggle';
import PricingSelectModal from './PricingSelectModal';
import usePayment from './usePayment';

const PricingComponentBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  max-width: 100vw;
  .pricing-title {
    text-align: center;
    font-size: 2rem;
  }
  .pricing-intro {
    text-align: center;
    margin-top: 15px;
  }
  .pricing-card-wrapper {
    display: flex;
    gap: 20px;
    margin-top: 30px;
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
    text-align: center;
    margin-top: 30px;
    color: ${palette.antd_blue_01};
    pre {
      overflow: hidden;
    }
  }
  .pricing-refund-policy-anchor {
    text-align: center;
    margin-top: 20px;
    color: ${palette.gray_700};
    font-size: 14px;
    text-decoration: underline;
  }
  @media (max-width: ${responsive.medium}) {
    padding: 20px;
    .pricing-title {
      font-size: 1.5rem;
    }
  }
  @media (max-width: 650px) {
    width: 300px;
  }
`;

interface PricingComponentProps {}

const PricingComponent: React.FC<PricingComponentProps> = ({}) => {
  const dispatch = useAppDispatch();
  const openLoginModal = () => dispatch(coreActions.openModal(loginModal));
  const [createFreeTrial] = useCreateFreeTrial();
  const { handlePayment } = usePayment();
  const [price, setPrice] = useState(0);
  const { data: meQuery, refetch: refetchMeQuery } = useMeQuery();
  const { value: selectModalState, onToggle: toggleSelectModal } =
    useToggle(false);

  const handleFreeTrial = async () => {
    if (!meQuery?.me.user) {
      openLoginModal();
      return;
    }
    const res = await createFreeTrial();
    if (res.data?.createFreeTrialRole.ok) {
      message.success('무료체험이 시작되었습니다.');
      refetchMeQuery();
      return;
    }
    message.error(res.data?.createFreeTrialRole.error);
  };

  const handleBasicPlanPayment = () =>
    handlePayment({
      orderName: '모두CBT 베이직 플랜',
      price: 5900,
      roleId: 1,
      checkRoleIds: [1, 2],
    });

  const openEhsMasterPayModal = () => {
    setPrice(0);
    toggleSelectModal();
  };

  const pricingCardData: PricingCardProps[] = [
    {
      title: '무료 체험 - 1일',
      intro: '모두CBT 베이직 플랜을 체험해보세요!',
      price: 0,
      endDate: '이용기간: 1일',
      benefits: ['광고제거', '랜덤모의고사 무제한 제공'],
      onConfirm: handleFreeTrial,
      confirmLabel: '무료체험 시작하기',
      disabledLabel: '무료체험 이용완료',
      confirmDisabled: meQuery?.me.user
        ? meQuery.me.user.usedFreeTrial ||
          checkRole({
            roleIds: [1, 2, 3],
            meQuery,
          })
        : false,
      roleIds: [3],
    },
    {
      title: '베이직 플랜',
      intro: '무제한 베이직 플랜으로\n학습효율을 높여보세요!',
      price: 5900,
      endDate: '이용기간: 무제한',
      // beforeDiscountPrice: 7900,
      // discountDate: '10.07',
      benefits: ['광고제거', '랜덤모의고사 무제한 제공'],
      confirmDisabled: meQuery?.me.user
        ? checkRole({ roleIds: [1, 2], meQuery })
        : false,
      onConfirm: handleBasicPlanPayment,
      roleIds: [1],
    },
    {
      title: '직8딴 플랜',
      endDate: '이용기간: ~ 2023-12-11 까지',
      intro:
        '- 기출 중복 문제 소거\n- 답안 글자 수 최소화\n- 키워드별 문제 구성 ',
      price: 15000,
      priceAltText: '10,000 ~ ',
      benefits: [
        '직8딴 풀이모드 및 해설모드 제공',
        '직8딴 랜덤모의고사 제공',
        '구매자 전용 오픈톡방을 통한 12기사 저자의 즉각 질문답변 대응',
        '광고제거',
      ],
      confirmDisabled: false,
      onConfirm: openEhsMasterPayModal,
      roleIds: [4, 5, 6, 7],
    },
  ];

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
