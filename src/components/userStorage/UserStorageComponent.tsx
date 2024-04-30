import TextInput from '@components/common/input/TextInput';
import CategoryFolderList from '@components/moduStorage/CategoryFolderList';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import useStorage from '@lib/hooks/useStorage';
import { storageActions } from '@modules/redux/slices/storage';
import { useAppDispatch } from '@modules/redux/store/configureStore';
import { Empty, Pagination, Select } from 'antd';
import { StorageType } from 'customTypes';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ExamSource, MockExamCategory, UserRole } from 'types';

const UserStorageComponentBlock = styled.div`
  .category-filter-input {
    max-width: 500px;
    margin-bottom: 20px;
  }
  .user-storage-pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
`;

interface UserStorageComponentProps {}

const LIMIT = 10;

const UserStorageComponent: React.FC<UserStorageComponentProps> = ({}) => {
  const { data: meQuery } = useMeQuery();
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const {
    categories,
    handleFilterCategories,
    handleToggleCategoryBookmark,
    fetchCategories,
  } = useStorage(StorageType.USER);

  const onChangeOrder = (value: string) => {
    if (value === 'popular') {
      const sortedCategories = [...categories].sort(
        (a, b) => b.categoryEvaluations.length - a.categoryEvaluations.length
      );
      dispatch(
        storageActions.setUserStorageCategories({
          categories: sortedCategories,
        })
      );
    } else {
      const sortedCategories = [...categories].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      dispatch(
        storageActions.setUserStorageCategories({
          categories: sortedCategories,
        })
      );
    }
  };

  useEffect(() => {
    if (meQuery?.me.ok) {
      fetchCategories({ examSource: ExamSource.User });
    }
  }, [meQuery]);
  return (
    <UserStorageComponentBlock>
      <TextInput
        className="category-filter-input"
        placeholder="암기장 필터링"
        onChange={(e) => {
          handleFilterCategories(e.target.value);
        }}
      />
      <div className="mb-6">
        <Select
          style={{ width: '150px' }}
          defaultValue={'popular'}
          options={[
            {
              label: '인기순',
              value: 'popular',
            },
            {
              label: '최신순',
              value: 'latest',
            },
          ]}
          onChange={onChangeOrder}
        />
      </div>
      {categories.length > 0 && (
        <CategoryFolderList
          categories={categories?.slice((page - 1) * LIMIT, page * LIMIT) || []}
          handleToggleBookmark={handleToggleCategoryBookmark}
        />
      )}
      {categories.length <= 0 && (
        <Empty description="암기장이 존재하지 않습니다.." />
      )}
      <div className="flex items-center mt-5 justify-center">
        <Pagination
          current={page}
          total={categories?.length || 0}
          pageSize={LIMIT}
          onChange={(page) => setPage(page)}
        />
      </div>
    </UserStorageComponentBlock>
  );
};

export default UserStorageComponent;
