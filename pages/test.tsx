import React, { useEffect } from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import QuestionShareModal from '@components/common/modal/QuestionShareModal';
import useToggle from '@lib/hooks/useToggle';
import { useRouter } from 'next/router';
const Bootpay = (await import('@bootpay/client-js')).default;
const Test: NextPage = () => {
  const router = useRouter();

  return <div></div>;
};

export default Test;
