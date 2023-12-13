import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CategoryFolderList from './CategoryFolderList';
import { ExamSource, MockExamCategory, UserRole } from 'types';
import { responsive } from '@lib/utils/responsive';
import { PlusOutlined } from '@ant-design/icons';
import palette from '@styles/palette';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import useModuCategories from '@lib/hooks/useStorage';
import SaveCategoryModal from './CreateCategoryModal';
import { useLazyGetExamCategories } from '@lib/graphql/user/hook/useExam';
import { useDispatch } from 'react-redux';
import { storageActions } from '@modules/redux/slices/storage';
import useStorage from '@lib/hooks/useStorage';
import { StorageType } from 'customTypes';

const ModuStorageComponentBlock = styled.div`
  padding: 20px 30px 30px 30px;
  .modu-storage-header {
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .modu-storage-desc {
    font-size: 16px;
    font-weight: 700;
  }
  .modu-storage-add-button {
    color: ${palette.gray_700};
    border: 1px dashed ${palette.gray_700};
    width: 30px;
    height: 30px;
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    padding: 2px;
    border-radius: 50%;
    transition: 0.2s all ease-in;
    &:hover {
      border-color: ${palette.antd_blue_02};
      color: ${palette.antd_blue_02};
    }
    svg {
      font-size: 16px;
      font-weight: bold;
    }
  }
  @media (max-width: ${responsive.medium}) {
    padding: 20px 16px;
  }
`;

interface ModuStorageComponentProps {}

const ModuStorageComponent: React.FC<ModuStorageComponentProps> = () => {
  const { data: meQuery } = useMeQuery();
  const dispatch = useDispatch();
  const [getExamCategories] = useLazyGetExamCategories();
  const [isSaveCategoryModalOpen, setIsSaveCategoryModalOpen] =
    useState<boolean>(false);
  const { categories } = useStorage(StorageType.MODU);

  useEffect(() => {
    if (meQuery?.me.user?.role === UserRole.Admin) {
      getExamCategories({
        variables: {
          input: {
            examSource: ExamSource.MoudCbt,
          },
        },
      }).then((res) => {
        dispatch(
          storageActions.setModuStorageCategories(
            res.data?.getExamCategories.categories as MockExamCategory[]
          )
        );
      });
    }
  }, [meQuery]);
  return (
    <ModuStorageComponentBlock>
      <div className="modu-storage-header">
        <div className="modu-storage-desc">모두CBT 공식 암기장</div>
        {meQuery?.me.user?.role === UserRole.Admin && (
          <div
            className="modu-storage-add-button"
            role="button"
            onClick={() => setIsSaveCategoryModalOpen(true)}
          >
            <PlusOutlined />
          </div>
        )}
      </div>
      <CategoryFolderList categories={categories} />
      <SaveCategoryModal
        open={isSaveCategoryModalOpen}
        onCancel={() => setIsSaveCategoryModalOpen(false)}
        onClose={() => setIsSaveCategoryModalOpen(false)}
      />
    </ModuStorageComponentBlock>
  );
};

export default ModuStorageComponent;
