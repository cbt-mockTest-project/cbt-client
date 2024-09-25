import useStorage from '@lib/hooks/useStorage';
import useCategoryMutation from '@lib/mutation/useCategoryMutation';
import { replaceSpaceSlashAndSpecialCharsToHyphen } from '@lib/utils/utils';
import { Input, Modal, ModalProps, Radio, App, Button } from 'antd';
import { StorageType } from 'customTypes';
import React from 'react';
import styled, { useTheme } from 'styled-components';
import { CreateMockExamCategoryInput, ExamType } from 'types';

const SaveCategoryModalBlock = styled(Modal)`
  .save-category-modal-content {
    .save-category-modal-title {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 5px;
    }

    .save-category-modal-radio-group-wrapper {
      display: flex;
      flex-direction: column;
    }

    .save-category-exam-type-description {
      color: ${({ theme }) => theme.color('colorTextTertiary')};
      margin-top: 5px;
      margin-bottom: 10px;
    }

    .save-category-access-radio-group {
      margin-bottom: 10px;
    }

    .save-category-modal-description {
      margin-top: 10px;
      min-height: 200px;
    }
  }

  .save-category-modal-exam-type-wrapper {
    display: flex;
    flex-direction: column;

    .save-category-modal-exam-type-title {
      font-size: 20px;
      font-weight: bold;
    }

    .save-category-modal-exam-type-description {
      color: ${({ theme }) => theme.color('colorTextTertiary')};
    }

    .save-category-modal-exam-type-radio-group-wrapper {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 10px;
    }
  }
`;

interface SaveCategoryModalProps extends Omit<ModalProps, 'children'> {
  defaultValues?: CreateMockExamCategoryInput;
  storageType: StorageType;
  categoryId?: number;
  onClose: () => void;
  urlSlug: string;
}

const SaveCategoryModal: React.FC<SaveCategoryModalProps> = (props) => {
  const { message } = App.useApp();
  const theme = useTheme();
  const { createCategoryLoading, handleCreateCategory } = useStorage(
    props.storageType
  );
  const { editCategoryMutation } = useCategoryMutation(props.urlSlug);
  const { onClose, categoryId, defaultValues, urlSlug, ...modalProps } = props;

  const isEditMode = !!categoryId;
  const [isPublic, setIsPublic] = React.useState<boolean>(
    defaultValues ? defaultValues.isPublic : true
  );
  const [examType, setExamType] = React.useState<ExamType | null>(
    isEditMode ? defaultValues.examType : null
  );
  const [step, setStep] = React.useState<number>(0);

  const [name, setName] = React.useState<string>(
    defaultValues ? defaultValues.name : ''
  );
  const [description, setDescription] = React.useState<string>(
    defaultValues ? defaultValues.description || '' : ''
  );
  const handleSaveFolder = async () => {
    if (!name) return message.error('제목을 입력해주세요.');
    categoryId
      ? editCategoryMutation.mutate({
          mutationInput: {
            id: categoryId,
            name,
            description,
            isPublic,
          },
          onSuccess: onClose,
        })
      : await handleCreateCategory(
          {
            name,
            description,
            isPublic,
            examType,
          },
          onClose
        );
  };

  return (
    <SaveCategoryModalBlock
      {...modalProps}
      onOk={handleSaveFolder}
      okText={isEditMode ? '수정하기' : '만들기'}
      cancelText="취소"
      footer={examType && step === 1 ? undefined : null}
      okButtonProps={{
        loading: createCategoryLoading || editCategoryMutation.isPending,
      }}
    >
      {examType && step === 1 ? (
        <div className="save-category-modal-content">
          <p className="save-category-modal-title">
            {isEditMode ? '폴더 수정하기' : '폴더 만들기'}
          </p>
          <Radio.Group
            className="save-category-access-radio-group"
            onChange={(e) => setIsPublic(e.target.value)}
            size="large"
            value={isPublic}
          >
            <Radio value={true}>공개</Radio>
            <Radio value={false}>비공개</Radio>
          </Radio.Group>
          <Input
            size="large"
            placeholder="제목을 입력하세요."
            value={name}
            onChange={(e) =>
              setName(replaceSpaceSlashAndSpecialCharsToHyphen(e.target.value))
            }
          />
          <Input.TextArea
            className="save-category-modal-description"
            placeholder="설명(선택)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {isPublic && (
            <div
              className="mt-2"
              style={{
                color: theme.color('colorTextTertiary'),
              }}
            >
              * 암기장을 공개하면 모든 사람들이 볼 수 있습니다.
            </div>
          )}
        </div>
      ) : (
        <div className="save-category-modal-exam-type-wrapper">
          <p className="save-category-modal-exam-type-title">
            암기장 유형을 선택해주세요.
          </p>
          <p className="save-category-modal-exam-type-description">
            암기장 유형은 한번 선택하면 변경할 수 없습니다.
          </p>
          <div className="save-category-modal-exam-type-radio-group-wrapper">
            <Radio.Group
              size="large"
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
            >
              <Radio.Button value={ExamType.Subjective}>주관식</Radio.Button>
              <Radio.Button value={ExamType.Objective}>객관식</Radio.Button>
            </Radio.Group>
            <Button
              size="large"
              onClick={() => setStep(1)}
              type="primary"
              disabled={!examType}
            >
              다음
            </Button>
          </div>
        </div>
      )}
    </SaveCategoryModalBlock>
  );
};

export default SaveCategoryModal;
