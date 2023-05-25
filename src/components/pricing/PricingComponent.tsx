import { responsive } from '@lib/utils/responsive';
import React, { useRef } from 'react';
import styled from 'styled-components';
import PricingCard, { PricingCardProps } from './PricingCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import useBootpay from '@lib/hooks/useBootpay';
import {
  useCheckUserRole,
  useCreateFreeTrial,
  useCreateUserRole,
  useDeleteUserRole,
  useMeQuery,
} from '@lib/graphql/user/hook/useUser';
import { message } from 'antd';
import { User, UserRole } from 'types';
import { useCreatePayment } from '@lib/graphql/user/hook/usePayment';
import { checkRole } from '@lib/utils/utils';
import shortid from 'shortid';
import palette from '@styles/palette';
import { useAppDispatch } from '@modules/redux/store/configureStore';
import { coreActions } from '@modules/redux/slices/core';
import { loginModal } from '@lib/constants';

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

interface PricingComponentProps {
  hasPremium?: boolean;
}

const PricingComponent: React.FC<PricingComponentProps> = ({
  hasPremium = true,
}) => {
  const dispatch = useAppDispatch();
  const openLoginModal = () => dispatch(coreActions.openModal(loginModal));
  const [createFreeTrial] = useCreateFreeTrial();
  const createdRoleId = useRef(0);
  const { handleBootPay } = useBootpay();
  const { data: meQuery, refetch: refetchMeQuery } = useMeQuery();
  const [checkUserRoleRequest] = useCheckUserRole();
  const [createPayment] = useCreatePayment();
  const [createUserRole] = useCreateUserRole();
  const [deleteUserRole] = useDeleteUserRole();

  interface handlePaymentParams {
    price: number;
    orderName: string;
    roleId: number;
    checkRoleIds: number[];
  }

  const handlePayment = ({
    orderName,
    price,
    roleId,
    checkRoleIds,
  }: handlePaymentParams) => {
    const orderId = `${meQuery?.me.user?.id}_${shortid.generate()}`;
    if (!meQuery?.me.user) {
      openLoginModal();
      return;
    }
    if (checkRole({ roleIds: checkRoleIds, meQuery })) {
      message.error('이미 해당 서비스를 이용중입니다.');
      return;
    }
    const user = meQuery?.me.user;
    handleBootPay({
      doneAction: refetchMeQuery,
      executeBeforPayment: async () => {
        const res = await checkUserRoleRequest({
          variables: {
            input: {
              roleIds: checkRoleIds,
            },
          },
        });
        // 1. 해당서비스를 이용중이 아니다.
        if (res.data?.checkUserRole.confirmed === false) {
          // 2. 유저의 role을 변경한다.
          if (!meQuery.me.user) return false;
          const res = await createUserRole({
            variables: {
              input: {
                roleId,
                userId: meQuery.me.user.id,
              },
            },
          });
          if (res.data?.createUserRole.ok) {
            createdRoleId.current = res.data.createUserRole.roleId as number;
            return true;
          }
          return false;
        }
        if (res.data?.checkUserRole.confirmed === true) {
          message.error(
            '이미 해당 서비스를 이용중입니다.\n결제가 취소되었습니다.'
          );
          return false;
        }
        message.error(res.data?.checkUserRole.error);
        return false;
      },
      executeAfterPayment: async ({ receiptId }) => {
        const res = await createPayment({
          variables: {
            input: {
              orderId,
              productName: orderName,
              price,
              receiptId,
            },
          },
        });
        if (res.data?.createPayment.ok) {
          return true;
        }
        return false;
      },
      executeRollback: async () => {
        if (!createdRoleId.current) return;
        await deleteUserRole({
          variables: {
            input: {
              id: createdRoleId.current,
            },
          },
        });
      },
      order_id: orderId,
      order_name: orderName,
      user: {
        id: String(user.id),
        username: user.nickname,
        email: user.email,
      },
      price,
      items: [
        {
          id: orderName,
          name: orderName,
          qty: 1,
          price,
        },
      ],
    });
  };

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
      price: 5000,
      roleId: 1,
      checkRoleIds: [1, 2],
    });

  const handleSafePremiumPlanPayment = () =>
    handlePayment({
      orderName: '모두CBT 산안기 프리패스',
      price: 30000,
      roleId: 2,
      checkRoleIds: [2],
    });

  const pricingCardData: PricingCardProps[] = [
    {
      title: '무료 체험 - 1일',
      intro: '모두CBT 베이직 플랜을 체험해보세요!',
      price: 0,
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
      roleId: 3,
    },
    {
      title: '베이직 플랜',
      intro: '커피 한 잔 값으로, 학습효율을 높여보세요!',
      price: 5000,
      beforeDiscountPrice: 9900,
      benefits: [
        '광고제거',
        '랜덤모의고사 무제한 제공',
        '해설모드 출력 기능 제공',
      ],
      hasBeforePaymentModal: !hasPremium,
      confirmDisabled: meQuery?.me.user
        ? checkRole({ roleIds: [1, 2], meQuery })
        : false,
      onConfirm: handleBasicPlanPayment,
      roleId: 1,
    },
  ];
  if (hasPremium) {
    pricingCardData.push({
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
      onConfirm: handleSafePremiumPlanPayment,
    });
  } else {
    // pricingCardData.push({
    //   title: '산안기 프리패스',
    //   intro: '실기시험 1달전 강력추천 !!',
    //   price: 30000,
    //   benefits: [
    //     '광고제거',
    //     '랜덤모의고사 무제한 제공',
    //     '신무당쌤의 쪽집게 인강제공',
    //     '필답형 최다빈출 전자책 제공',
    //     '필답형 최다빈출 학습서비스 제공',
    //   ],
    //   onConfirm: handleSafePremiumPlanPayment,
    //   isTempText: 'Coming Soon...',
    // });
  }
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
    </PricingComponentBlock>
  );
};

export default PricingComponent;
