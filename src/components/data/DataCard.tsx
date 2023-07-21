import React from 'react';
import styled from 'styled-components';
import { Card } from 'antd';
import palette from '@styles/palette';

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
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .data-card-content-description {
    margin-top: 10px;
    color: ${palette.gray_900};
    display: -webkit-box;
    -webkit-line-clamp: 3;
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
  title: string;
  content: string | JSX.Element | JSX.Element[];
  date: string;
  page: number;
  price: number;
}

const DataCard: React.FC<DataCardProps> = ({
  className,
  title,
  content,
  date,
  page,
  price,
}) => {
  return (
    <DataCardBlock hoverable className={className || ''}>
      <div className="data-card-content">
        <p className="data-card-content-title">{title}</p>
        <p className="data-card-content-description">{content}</p>
        <div className="data-card-content-option-list">
          <div className="data-card-content-option"> {date}</div>
          <div className="data-card-divider" />
          <div className="data-card-content-option"> {`${page}페이지`}</div>
          <div className="data-card-divider" />
          <div className="data-card-content-option">
            {price ? `${price}원` : '무료'}
          </div>
        </div>
      </div>
    </DataCardBlock>
  );
};

export default DataCard;
