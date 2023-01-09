import { checkboxOption } from 'customTypes';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import RoundCheckbox from './RoundCheckbox';

export type RoundCheckboxGroupOnChangeValueType =
  | checkboxOption['value'][]
  | checkboxOption['value'];
export interface RoundCheckboxGroupProps {
  options: checkboxOption[];
  gap?: number;
  onChange: (value: RoundCheckboxGroupOnChangeValueType) => void;
}

interface RoundCheckboxGroupCssProps
  extends Pick<RoundCheckboxGroupProps, 'gap'> {}

const RoundCheckboxGroup: React.FC<RoundCheckboxGroupProps> = ({
  options,
  onChange,
  gap = 10,
}) => {
  const [checkedValues, setCheckedValues] = useState<string[]>([]);
  const onCheckboxChange = (checked: boolean, value: string) => {
    if (checked) {
      return setCheckedValues([...checkedValues, value]);
    }
    const newCheckedValues = checkedValues.filter(
      (checkedValue) => checkedValue !== value
    );
    return setCheckedValues(newCheckedValues);
  };

  useEffect(() => {
    onChange(checkedValues);
  }, [checkedValues]);
  return (
    <StyledSwiper
      slidesPerView={'auto'}
      threshold={10}
      spaceBetween={15}
      modules={[Navigation]}
      className="round-check-box-group-swiper"
    >
      <RoundCheckboxGroupContainer gap={gap}>
        {options.map((option, index) => (
          <SwiperSlide key={index}>
            <RoundCheckbox option={option} onChange={onCheckboxChange} />
          </SwiperSlide>
        ))}
      </RoundCheckboxGroupContainer>
    </StyledSwiper>
  );
};

export default RoundCheckboxGroup;

const RoundCheckboxGroupContainer = styled.ul<RoundCheckboxGroupCssProps>`
  display: inline-block;
`;
const StyledSwiper = styled(Swiper)`
  .swiper-slide {
    width: unset;
  }
`;
