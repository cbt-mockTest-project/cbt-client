import { responsive } from '@lib/utils/responsive';
import React from 'react';
import styled from 'styled-components';
import PricingCard, { PricingCardProps } from './PricingCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import useBootpay from '@lib/hooks/useBootpay';
import {
  useChangeClientRole,
  useCheckUserRole,
  useMeQuery,
} from '@lib/graphql/user/hook/useUser';
import { message } from 'antd';
import { UserRole } from 'types';

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

const PricingComponent: React.FC<PricingComponentProps> = () => {
  const { handleBootPay } = useBootpay();
  const { data: meQuery } = useMeQuery();
  const [checkUserRole] = useCheckUserRole();
  const [changeClientRole] = useChangeClientRole();
  const handleBasicPlanPayment = () => {
    const existingRolesWithAuthority = [
      UserRole.Admin,
      UserRole.ClientBasic,
      UserRole.ClientSafePremium,
      UserRole.Partner,
    ];
    if (!meQuery?.me.user) {
      message.error('로그인 후 이용해주세요.');
      return;
    }
    if (existingRolesWithAuthority.includes(meQuery?.me.user.role)) {
      message.error('이미 해당 서비스를 이용중입니다.');
      return;
    }
    const user = meQuery?.me.user;
    handleBootPay({
      executeAfterPayment: async () => {
        const res = await changeClientRole({
          variables: {
            input: {
              role: UserRole.ClientBasic,
            },
          },
        });
        if (res.data?.changeClientRole.ok) {
          return true;
        }
        return false;
      },
      isPaymentAvailable: async () => {
        const res = await checkUserRole({
          variables: {
            input: {
              role: existingRolesWithAuthority,
            },
          },
        });
        if (res.data?.checkUserRole.confirmed === true) {
          message.error(
            '이미 해당 서비스를 이용중입니다.\n결제가 취소되었습니다.'
          );
          return false;
        }
        if (res.data?.checkUserRole.confirmed === false) {
          return true;
        }
        message.error(res.data?.checkUserRole.error);
        return false;
      },
      order_name: '모두CBT 베이직 플랜',
      user: {
        id: String(user.id),
        username: user.nickname,
        email: user.email,
      },
      price: 1000,
      items: [
        {
          id: 'basic_plan',
          name: '모두CBT 베이직 플랜',
          qty: 1,
          price: 1000,
        },
      ],
    });
  };

  const handleSafePremiumPlanPayment = () => {
    const existingRolesWithAuthority = [
      UserRole.Admin,
      UserRole.ClientSafePremium,
      UserRole.Partner,
    ];
    if (!meQuery?.me.user) {
      message.error('로그인 후 이용해주세요.');
      return;
    }
    if (existingRolesWithAuthority.includes(meQuery?.me.user.role)) {
      message.error('이미 해당 서비스를 이용중입니다.');
      return;
    }
    const user = meQuery?.me.user;
    handleBootPay({
      executeAfterPayment: async () => {
        const res = await changeClientRole({
          variables: {
            input: {
              role: UserRole.ClientSafePremium,
            },
          },
        });
        if (res.data?.changeClientRole.ok) {
          return true;
        }
        return false;
      },
      isPaymentAvailable: async () => {
        // const res = await checkUserRole({
        //   variables: {
        //     input: {
        //       role: existingRolesWithAuthority,
        //     },
        //   },
        // });
        // if (res.data?.checkUserRole.confirmed === true) {
        //   message.error(
        //     '이미 해당 서비스를 이용중입니다.\n결제가 취소되었습니다.'
        //   );
        //   return false;
        // }
        // if (res.data?.checkUserRole.confirmed === false) {
        //   return true;
        // }
        // message.error(res.data?.checkUserRole.error);
        // return false;
        return true;
      },
      order_name: '모두CBT 산안기 프리패스',
      user: {
        id: String(user.id),
        username: user.nickname,
        email: user.email,
      },
      price: 1000,
      items: [
        {
          id: 'safe_premium_plan',
          name: '모두CBT 산안기 프리패스',
          qty: 1,
          price: 1000,
        },
      ],
    });
  };
  const pricingCardData: PricingCardProps[] = [
    {
      title: '베이직 플랜',
      intro: '커피 한 잔 값으로, 학습효율을 높여보세요!',
      price: 5000,
      benefits: ['광고제거', '랜덤모의고사 무제한 제공'],
      handlePayment: handleBasicPlanPayment,
    },
    {
      title: '산안기 프리패스',
      intro: '실기시험 1달전 강력추천 !!',
      price: 30000,
      benefits: [
        '광고제거',
        '랜덤모의고사 무제한 제공',
        '신무당쌤의 쪽집게 인강제공',
        '필답형 최다빈출 전자책 제공',
        '필답형 최다빈출 학습서비스 제공',
      ],
      handlePayment: handleSafePremiumPlanPayment,
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
    </PricingComponentBlock>
  );
};

export default PricingComponent;
