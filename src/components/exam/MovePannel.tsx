import palette from '@styles/palette';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface MovePannelProps {
  questionCount: number;
  questionIndex: number;
}

const MovePannel: React.FC<MovePannelProps> = ({
  questionCount,
  questionIndex,
}) => {
  const router = useRouter();
  const lists = Array.from({ length: questionCount }, (v, i) => i + 1);
  const movePannelRef = useRef<HTMLOListElement>(null);
  const movePannelItemRef = useRef<HTMLLIElement>(null);
  useEffect(() => {
    const offsetTop = movePannelItemRef.current?.offsetTop;
    movePannelRef.current?.scrollTo({ top: offsetTop, behavior: 'smooth' });
  }, [questionIndex, movePannelRef, movePannelItemRef]);
  return (
    <MovePannelContainer ref={movePannelRef}>
      {lists.map((item) => (
        <Link
          key={item}
          shallow={true}
          href={{
            pathname: router.pathname,
            query: { ...router.query, q: item },
          }}
        >
          <li
            ref={questionIndex === item ? movePannelItemRef : null}
            className={`${questionIndex === item && 'active'}`}
          >
            {item}
          </li>
        </Link>
      ))}
    </MovePannelContainer>
  );
};

export default MovePannel;

const MovePannelContainer = styled.ol`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
  height: 100px;
  overflow-y: scroll;
  position: relative;
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 40px;
    border: 1px solid ${palette.gray_100};
    gap: 5px;
  }
  li.active {
    border-color: ${palette.antd_blue_01};
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  }
`;
