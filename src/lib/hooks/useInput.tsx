import { ChangeEvent, useState } from 'react';

const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  return { value, onChange };
};

export default useInput;
