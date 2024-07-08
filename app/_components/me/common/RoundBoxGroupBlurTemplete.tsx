import RoundCheckboxGroup, {
  RoundCheckboxGroupProps,
} from '../../common/checkbox/RoundCheckboxGroup';
import RoundSelectboxGrop from '../../common/checkbox/RoundSelectboxGroup';
import { responsive } from '../../../_lib/utils/responsive';
import React from 'react';
import styled from 'styled-components';

interface RoundBoxGroupBlurTempleteProps extends RoundCheckboxGroupProps {
  type: 'checkbox' | 'selectbox';
}

const RoundBoxGroupBlurTemplete: React.FC<RoundBoxGroupBlurTempleteProps> = ({
  options,
  onChange,
  type,
}) => {
  return (
    <RoundBoxGroupBlurTempleteBlock>
      {type === 'checkbox' && (
        <RoundCheckboxGroup options={options} onChange={onChange} />
      )}
      {type === 'selectbox' && (
        <RoundSelectboxGrop options={options} onChange={onChange} />
      )}
      <div className="blur" />
    </RoundBoxGroupBlurTempleteBlock>
  );
};

export default RoundBoxGroupBlurTemplete;
const RoundBoxGroupBlurTempleteBlock = styled.div`
  white-space: nowrap;
  overflow-x: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  .blur {
    background-color: white;
    position: absolute;
    width: 30px;
    height: 50px;
    right: 0;
    top: 143px;
    filter: blur(4px);
  }
  @media (max-width: ${responsive.medium}) {
    .blur {
      top: 118px;
    }
    margin-top: 20px;
  }
`;
