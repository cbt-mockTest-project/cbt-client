import PlyrPlayer from '../../player/PlyrPlayer';
import palette from '../../../_styles/palette';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface VideoTutorialComponentProps {}

const VideoTutorialComponent: React.FC<VideoTutorialComponentProps> = () => {
  const [seconds, setSeconds] = useState(60 * 60);
  const videoSource = [
    {
      size: 480,
      src: 'https://moducbt-seoul.s3.ap-northeast-2.amazonaws.com/safe_video/elevator_480.mp4',
    },
    {
      size: 720,
      src: 'https://moducbt-seoul.s3.ap-northeast-2.amazonaws.com/safe_video/elevator_720.mp4',
    },
    {
      size: 1080,
      src: 'https://moducbt-seoul.s3.ap-northeast-2.amazonaws.com/safe_video/elevator_1080.mp4',
    },
  ];
  useEffect(() => {
    if (seconds > 0) {
      const intervalId = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);

      return () => {
        clearInterval(intervalId); // 컴포넌트가 언마운트 되거나 업데이트 되기 전에 인터벌을 정리합니다.
      };
    }
  }, [seconds]);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return (
    <VideoTutorialComponentBlock>
      <div className="video-tutorial-pc">
        <div className="video-tutorial-top">
          <div className="video-tutorial-logo">모두CBT</div>
          <div className="video-tutorial-info">
            <div className="video-tutorial-info-category">
              종목 : 산업안전기사
            </div>
            <div className="video-tutorial-info-right">
              <div className="video-tutorial-info-date">
                시험일 : 2023-06-23
              </div>
              <div className="video-tutorial-info-code">비번호 : A001</div>
              <div className="video-tutorial-info-code">PC번호 : 1</div>
            </div>
          </div>
          <div className="video-tutorial-time">{`남은시간 : ${minutes
            .toString()
            .padStart(2, '0')}분 ${remainingSeconds
            .toString()
            .padStart(2, '0')}초`}</div>
        </div>
        <div className="video-tutorial-body">
          <div className="video-tutorial-body-left">
            <div className="video-tutorial-body-left-top">
              <pre className="video-tutorial-body-left-top-question-number">
                {`문제\n1번`}
              </pre>
              <pre className="video-tutorial-body-left-top-question-score">
                {`배점\n30점`}
              </pre>
            </div>
            <div className="video-tutorial-body-left-content">
              다음 영상을 보고 건설용 리프트 방호장치 3가지를 쓰시오.
            </div>
          </div>
          <div className="video-tutorial-body-right">
            <div className="video-tutorial-body-right-top">
              <PlyrPlayer sources={videoSource} />
            </div>
            <div className="video-tutorial-body-right-bottom">
              <div className="video-tutorial-body-right-bottom-question-number-list">
                <div className="video-tutorial-body-right-bottom-question-number active">
                  1번
                </div>
                <div className="video-tutorial-body-right-bottom-question-number">
                  2번
                </div>
              </div>
              <div className="video-tutorial-body-right-bottom-move-button-wrapper">
                <button className="video-tutorial-body-right-bottom-move-button prev disabled">
                  <span className="video-tutorial-body-right-bottom-move-button-icon prev disabled">
                    ◀
                  </span>
                  {'  '}
                  이전
                </button>
                <button className="video-tutorial-body-right-bottom-move-button next">
                  다음{'  '}
                  <span className="video-tutorial-body-right-bottom-move-button-icon next">
                    ▶
                  </span>
                </button>
              </div>
              <div className="video-tutorial-body-right-bottom-finish-button-wrapper">
                <button>모의테스트 종료</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="video-tutorial-mobile">
        <pre className="video-tutorial-mobile-desc">{`실제 시험과 동일한 환경을 위해\n창크기를 1024px 이상으로\n유지해주세요.`}</pre>
      </div>
    </VideoTutorialComponentBlock>
  );
};

export default VideoTutorialComponent;

const VideoTutorialComponentBlock = styled.div`
  width: 100%;
  .video-tutorial-logo {
    font-size: 20px;
    font-weight: bold;
    color: ${palette.antd_blue_01};
  }
  .video-tutorial-top {
    display: flex;
    align-items: center;
    width: 100%;
    background-color: white;
    padding: 10px 20px;
    border-radius: 5px;
  }
  .video-tutorial-info {
    display: flex;
    background-color: #dfe8eb;
    margin-left: 50px;
    padding: 5px 35px;
    border-radius: 15px;
    font-weight: bold;
  }
  .video-tutorial-info-right {
    display: flex;
    gap: 15px;
    margin-left: 70px;
  }
  .video-tutorial-time {
    background-color: #db9e96;
    color: white;
    padding: 5px 15px;
    border-radius: 15px;
    margin-left: auto;
  }
  .video-tutorial-body {
    margin: 20px 0;
    width: 100%;
    display: flex;
    gap: 20px;
    height: calc(100vh - 300px);
  }
  .video-tutorial-body-left {
    background-color: white;
    height: 100%;
    flex: 7;
    padding: 20px;
  }
  .video-tutorial-body-left-top-question-number {
    background-color: #ff9e00;
    line-height: 1;
    text-align: center;
    padding: 10px 15px;
  }
  .video-tutorial-body-left-top-question-score {
    background-color: #66adc5;
    color: white;
    line-height: 1;
    text-align: center;
    padding: 10px 15px;
  }
  .video-tutorial-body-left-content {
    height: 100%;
    display: flex;
    justify-content: center;
    padding: 100px 40px;
  }
  .video-tutorial-body-left-top {
    display: flex;
    justify-content: space-between;
  }
  .video-tutorial-body-right {
    flex: 3;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .video-tutorial-body-right-bottom {
    background-color: #dfe8eb;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .video-tutorial-body-right-bottom-question-number-list {
    margin-top: 10px;
    display: flex;
    gap: 2px;
  }
  .video-tutorial-body-right-bottom-question-number {
    padding: 2px 20px;
    background-color: white;
    border-radius: 5px;
    cursor: pointer;
  }
  .video-tutorial-body-right-bottom-question-number.active {
    background-color: #ff9e02;
  }
  .video-tutorial-body-right-bottom-move-button-wrapper {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-top: 200px;
  }
  .video-tutorial-body-right-bottom-move-button {
    width: 100%;
    background-color: #58818e;
    color: white;
    padding: 5px 0;
  }
  .video-tutorial-body-right-bottom-move-button.prev {
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
  }
  .video-tutorial-body-right-bottom-move-button.next {
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
  }
  .video-tutorial-body-right-bottom-finish-button-wrapper {
    background-color: black;
    color: white;
    text-align: center;
    width: 180px;
    padding: 5px 0;
    border-radius: 5px;
    margin: 0px auto 10px auto;
  }
  .video-tutorial-body-right-bottom-move-button-icon {
    font-size: 10px;
    position: relative;
    bottom: 3px;
  }
  .video-tutorial-body-right-bottom-move-button-icon.disabled,
  .video-tutorial-body-right-bottom-move-button.disabled {
    color: ${palette.gray_400};
    opacity: 0.5;
  }
  .video-tutorial-body-right-bottom-move-button-icon.prev {
    right: 10px;
  }
  .video-tutorial-body-right-bottom-move-button-icon.next {
    left: 10px;
  }
  .video-tutorial-mobile {
    display: none;
  }

  @media (max-width: 1023px) {
    .video-tutorial-pc {
      display: none;
    }
    .video-tutorial-mobile {
      display: flex;
      height: calc(100vh - 300px);
      justify-content: center;
      align-items: center;
    }
    .video-tutorial-mobile-desc {
      font-size: 20px;
      text-align: center;
      font-weight: bold;
    }
  }
`;
