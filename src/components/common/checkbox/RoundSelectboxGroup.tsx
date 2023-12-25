import { checkboxOption } from 'customTypes';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { RoundCheckboxGroupOnChangeValueType } from './RoundCheckboxGroup';
import RoundSelectbox from './RoundSelectbox';
import { Navigation } from 'swiper/modules';

export interface RoundSelectboxGropProps {
  options: checkboxOption[];
  gap?: number;
  onChange: (value: RoundCheckboxGroupOnChangeValueType) => void;
}

const RoundSelectboxGrop: React.FC<RoundSelectboxGropProps> = ({
  options,
  onChange,
  gap = 10,
}) => {
  const [checkedValue, setCheckedValue] = useState<number>(0);
  useEffect(() => {
    onChange(checkedValue);
  }, [checkedValue]);

  const onSelect = (value: checkboxOption['value']) =>
    setCheckedValue(Number(value));
  return (
    <StyledSwiper
      slidesPerView={'auto'}
      threshold={10}
      spaceBetween={15}
      modules={[Navigation]}
      className="round-check-box-group-swiper"
    >
      <RoundSelectboxGropContainer gap={gap}>
        <div>
          {options.map((option, index) => (
            <SwiperSlide key={index}>
              <RoundSelectbox
                option={option}
                checked={checkedValue === option.value}
                onClick={() => onSelect(option.value)}
              />
            </SwiperSlide>
          ))}
        </div>
      </RoundSelectboxGropContainer>
    </StyledSwiper>
  );
};

export default RoundSelectboxGrop;

interface RoundSelectboxGropCssProps
  extends Pick<RoundSelectboxGropProps, 'gap'> {}

const RoundSelectboxGropContainer = styled.ul<RoundSelectboxGropCssProps>`
  display: inline-block;
`;
const StyledSwiper = styled(Swiper)`
  .swiper-slide {
    width: unset;
  }
`;
