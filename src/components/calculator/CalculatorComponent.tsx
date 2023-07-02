import React, { useState } from 'react';
import styled from 'styled-components';
import CalculatorToggleButton from './CalculatorToggleButton';
import dynamic from 'next/dynamic';

const CalculatorComponentBlock = styled.div``;
const Calculator = dynamic(() => import('./Calculator'), { ssr: false });

interface CalculatorComponentProps {}

const CalculatorComponent: React.FC<CalculatorComponentProps> = () => {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const toggleCalculator = () => {
    setIsCalculatorOpen(!isCalculatorOpen);
  };
  return (
    <CalculatorComponentBlock>
      <Calculator onClose={toggleCalculator} isVisible={isCalculatorOpen} />
      {!isCalculatorOpen && (
        <CalculatorToggleButton onClick={toggleCalculator} />
      )}
    </CalculatorComponentBlock>
  );
};

export default CalculatorComponent;
