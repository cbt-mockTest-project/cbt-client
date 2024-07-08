import { SearchOutlined } from '@ant-design/icons';
import { Input, InputRef, Modal, ModalProps } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const HomeCategorySearchModalBlock = styled(Modal)`
  .home-category-search-button {
    svg {
      font-size: 18px;
    }
  }
  .ant-modal-content {
    margin-top: 50px;
    background-color: unset !important;
    padding: 0 !important;
    .ant-modal-body {
      margin-top: 30px;
    }
  }
`;

interface HomeCategorySearchModalProps extends Omit<ModalProps, 'children'> {}

const HomeCategorySearchModal: React.FC<HomeCategorySearchModalProps> = (
  props
) => {
  const searchInputRef = React.useRef<InputRef>(null);
  const router = useRouter();
  const { ...modalProps } = props;
  const handleSearch = (value: string) => {
    router.push({
      query: {
        ...router.query,
        ...(value
          ? {
              f_keyword: value,
              type: 'folder',
            }
          : {}),
      },
    });
  };
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);
  return (
    <HomeCategorySearchModalBlock
      {...modalProps}
      footer={false}
      closeIcon={false}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(searchInputRef.current.input.value);
        }}
      >
        <Input
          ref={searchInputRef}
          size="large"
          placeholder="암기장을 검색해보세요."
          onKeyDown={(e) => {
            if (e.key === 'Enter')
              handleSearch(searchInputRef.current.input.value);
          }}
          suffix={
            <button className="home-category-search-button" type="submit">
              <SearchOutlined
                onClick={() => handleSearch(searchInputRef.current.input.value)}
              />
            </button>
          }
        />
      </form>
    </HomeCategorySearchModalBlock>
  );
};

export default HomeCategorySearchModal;
