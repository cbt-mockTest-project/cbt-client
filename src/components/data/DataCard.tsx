import React from 'react';
import styled from 'styled-components';
import { Card, Input } from 'antd';
import Image from 'next/image';
import palette from '@styles/palette';
import AttachMoneyIcon from '@assets/svg/won_sign.svg';

const { Meta } = Card;

const DataCardBlock = styled(Card)`
  .ant-card-body {
    display: flex;
    flex-direction: row;
    padding: 12px !important;
  }
  .data-card-content {
    margin-left: 12px;
    display: flex;
    flex-direction: column;
  }
  .data-card-content-title {
    font-size: 15px;
    font-weight: bold;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* 여기의 숫자를 원하는 줄 수로 조정하세요 */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .data-card-content-description {
    margin-top: 10px;
    color: ${palette.gray_900};
    display: -webkit-box;
    -webkit-line-clamp: 3; /* 여기의 숫자를 원하는 줄 수로 조정하세요 */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .data-card-content-option-list {
    display: flex;
    align-items: center;
    margin-top: auto;
  }
  .data-card-content-option {
    font-size: 12px;
    color: ${palette.gray_700};
  }
  .data-card-price-icon {
    svg {
      width: 14px;
      height: 14px;
      font-size: 2rem;
    }
  }
  .data-card-divider {
    height: 10px;
    margin: 0 5px;
    position: relative;
    border-left: 1.5px solid ${palette.gray_700};
  }
`;

interface DataCardProps {
  className?: string;
}

const DataCard: React.FC<DataCardProps> = ({ className }) => {
  return (
    <DataCardBlock hoverable className={className || ''}>
      <Image
        alt="image"
        width={100}
        height={141.4}
        src="https://dxw2azlbq2ays.cloudfront.net/1676544448895áá³áá³ááµá«áá£áº 2023-02-16 áá©áá® 7.47.13.png"
      />
      <div className="data-card-content">
        <p className="data-card-content-title">
          산업안전기사 실기 필답형-린현자료산업안전기사 실기
          필답형-린현자료산업안전기사 실기 필답형-린현자료산업안전기사 실기
          필답형-린현자료산업안전기사 실기 필답형-린현자료
        </p>
        <p className="data-card-content-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quam
          excepturi explicabo iure totam? Nobis accusantium sunt cum voluptate
          similique quaerat deserunt itaque voluptatem! Ut recusandae voluptas
          nisi cupiditate voluptates.Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Libero quam excepturi explicabo iure totam? Nobis
          accusantium sunt cum voluptate similique quaerat deserunt itaque
          voluptatem! Ut recusandae voluptas nisi cupiditate voluptates.
        </p>
        <div className="data-card-content-option-list">
          <div className="data-card-content-option"> 23.05.09</div>
          <div className="data-card-divider" />
          <div className="data-card-content-option"> 40페이지</div>
          <div className="data-card-divider" />
          <div className="data-card-content-option">5000원</div>
        </div>
      </div>
    </DataCardBlock>
  );
};

export default DataCard;
