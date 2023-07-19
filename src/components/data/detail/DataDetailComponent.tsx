import React from 'react';
import styled from 'styled-components';
import DataDetailPdfPreview from './DataDetailPdfPreview';
import { Button, Card } from 'antd';
import palette from '@styles/palette';
import {
  ArrowUpOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
  DownCircleFilled,
  UpCircleFilled,
  UpSquareFilled,
} from '@ant-design/icons';

const DataDetailComponentBlock = styled.div`
  .data-detail-title {
    font-size: 20px;
    padding-bottom: 15px;
    border-bottom: 2px solid ${palette.gray_100};
  }
  .data-detail-description {
    margin-top: 25px;
  }
  .data-detail-info {
    color: ${palette.gray_700};
  }
  .data-detail-info-wrapper {
    display: flex;
    gap: 25px;
    margin-top: 15px;
    color: ${palette.gray_700};
    border-bottom: 2px solid ${palette.gray_100};
    padding-bottom: 15px;
  }
  .data-detail-info-left-side {
    display: flex;
    flex-direction: column;
  }
  .data-detail-info-right-side {
    justify-content: center;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .data-detail-vote-count {
    font-size: 20px;
    text-align: center;
  }
  .data-detail-vote-button {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 1px solid ${palette.gray_200};
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s;
    svg {
      width: 20px;
      height: 20px;
    }
    :hover {
      border-color: ${palette.antd_blue_01};
      svg {
        color: ${palette.antd_blue_01};
      }
    }
  }
  .data-detail-info-content-wrapper {
    display: flex;
  }
  .data-detail-info-content-key {
    width: 100px;
  }
  .data-detail-download-button {
    margin-top: 15px;
    width: 200px;
  }
`;

interface DataDetailComponentProps {}

const DataDetailComponent: React.FC<DataDetailComponentProps> = () => {
  return (
    <DataDetailComponentBlock>
      <Card>
        <h1 className="data-detail-title">
          산업안전기사 요약집!!산업안전기사 요약집!!산업안전기사
          요약집!!산업안전기사 요약집!!산업안전기사 요약집!!산업안전기사
          요약집!!
        </h1>
        <div className="data-detail-info-wrapper">
          <div className="data-detail-info-left-side">
            <div className="data-detail-info-content-wrapper">
              <p className="data-detail-info-content-key">제작자</p>
              <p className="data-detail-info-content-value">부우부</p>
            </div>
            <div className="data-detail-info-content-wrapper">
              <p className="data-detail-info-content-key">등록일</p>
              <p className="data-detail-info-content-value">2023.07.18</p>
            </div>
            <div className="data-detail-info-content-wrapper">
              <p className="data-detail-info-content-key">수정일</p>
              <p className="data-detail-info-content-value">2023.08.18</p>
            </div>
            <div className="data-detail-info-content-wrapper">
              <p className="data-detail-info-content-key">페이지</p>
              <p className="data-detail-info-content-value">123 페이지</p>
            </div>
            <div className="data-detail-info-content-wrapper">
              <p className="data-detail-info-content-key">가격</p>
              <p className="data-detail-info-content-value">무료</p>
            </div>
            <Button
              className="data-detail-download-button"
              type="primary"
              size="large"
            >
              다운로드
            </Button>
          </div>
          <div className="data-detail-info-right-side">
            <button className="data-detail-vote-button">
              <CaretUpOutlined />
            </button>
            <div className="data-detail-vote-count">204</div>
            <button className="data-detail-vote-button">
              <CaretDownOutlined />
            </button>
          </div>
        </div>
        <p className="data-detail-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis eum
          amet quasi doloremque cum suscipit asperiores minima animi
          reprehenderit adipisci molestiae ducimus nesciunt quam, ratione
          dolorum. Aliquid nemo dolore error. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Debitis eum amet quasi doloremque cum
          suscipit asperiores minima animi reprehenderit adipisci molestiae
          ducimus nesciunt quam, ratione dolorum. Aliquid nemo dolore error.
        </p>
      </Card>
    </DataDetailComponentBlock>
  );
};

export default DataDetailComponent;
