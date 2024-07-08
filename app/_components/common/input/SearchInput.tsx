import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import SearchSVG from '@assets/svg/search-gray.svg';
import palette from '../../../_styles/palette';

interface SearchInputBlockProps {
  disabled?: boolean;
}

const SearchInputBlock = styled.div<SearchInputBlockProps>`
  position: relative;
  .search-input-icon-wrapper {
    position: absolute;
    top: 6px;
    right: 12px;
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    padding: 0;
    border: none;
    background: none;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
  }
  .search-input {
    width: 100%;
    height: 35px;
    border: 1px solid ${palette.gray_400};
    box-sizing: border-box;
    border-radius: 5px;
    font-size: 14px;
    line-height: 21px;
    padding: 0 12px;
    ::placeholder {
      color: ${palette.gray_500};
      font-size: 14px;
      line-height: 21px;
    }
  }
`;

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ ...props }) => {
  const { className, onSearch } = props;
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };
  return (
    <SearchInputBlock className={className}>
      <input {...props} className="search-input" onKeyPress={handleKeyPress} />
      <button
        className="search-input-icon-wrapper"
        type="button"
        onClick={onSearch}
      >
        <SearchSVG />
      </button>
    </SearchInputBlock>
  );
};

export default SearchInput;
