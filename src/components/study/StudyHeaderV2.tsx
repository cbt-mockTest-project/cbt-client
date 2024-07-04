import { LAST_VISITED_CATEGORY } from '@lib/constants/localStorage';
import { LocalStorage } from '@lib/utils/localStorage';
import { CloseOutlined } from '@mui/icons-material';
import palette from '@styles/palette';
import { Modal, Radio, Switch } from 'antd';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import styled from 'styled-components';

const StudyHeaderV2Block = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .study-header-close-button {
    font-size: 28px;
    color: ${({ theme }) => theme.color('colorText')};
    cursor: pointer;
  }
`;

interface StudyHeaderV2Props {}

const StudyHeaderV2: React.FC<StudyHeaderV2Props> = () => {
  const router = useRouter();
  const localStorage = new LocalStorage();
  const currentMode = useMemo(() => {
    if (router.query.mode === 'card') return 'card';
    if (router.query.mode === 'typing') return 'typing';
    return 'solution';
  }, [router.query.mode]);
  const handleChangeMode = (mode: 'card' | 'typing') => {
    if (mode === 'card') {
      router.replace({ query: { ...router.query, mode: 'card' } });
    } else {
      router.replace({ query: { ...router.query, mode: 'typing' } });
    }
  };
  const prevVisitedCategoryOrHomePath =
    localStorage.get(LAST_VISITED_CATEGORY) || '/';
  const onClickCloseButton = () => {
    router.push(prevVisitedCategoryOrHomePath);
    // Modal.confirm({
    //   title: '학습을 중단하시겠습니까?',
    //   onOk: () => {
    //     router.push(prevVisitedCategoryOrHomePath);
    //   },
    // });
  };
  return (
    <StudyHeaderV2Block>
      <CloseOutlined
        className="study-header-close-button"
        role="button"
        onClick={onClickCloseButton}
      />
      {currentMode !== 'solution' && (
        <Radio.Group value={router.query.mode}>
          <Radio.Button
            value="typing"
            onClick={() => handleChangeMode('typing')}
          >
            타이핑
          </Radio.Button>
          <Radio.Button value="card" onClick={() => handleChangeMode('card')}>
            카드
          </Radio.Button>
        </Radio.Group>
      )}
    </StudyHeaderV2Block>
  );
};

export default React.memo(StudyHeaderV2);
