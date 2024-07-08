import React, { useState } from 'react';
import styled from 'styled-components';

interface useToggleProps {}

const useToggle = (initialState?: boolean) => {
  const [value, setValue] = useState(initialState || false);
  const onToggle = () => setValue(!value);
  return { value, setValue, onToggle };
};

export default useToggle;
