import Modal, { ModalProps } from '@components/common/modal/Modal';
import { useCreateFeedback } from '@lib/graphql/user/hook/useFeedBack';
import TextArea from 'antd/lib/input/TextArea';
import useInput from '@lib/hooks/useInput';
import { handleError } from '@lib/utils/utils';
import { Button, message } from 'antd';
import React, { FormEvent } from 'react';
import styled from 'styled-components';

const CreateExamFeedbackModalBlock = styled(Modal)`
  padding: 30px 20px;
  .modal-close-button {
    right: 0;
  }

  .create-exam-feedback-modal-wrapper {
    margin-top: 20px;
  }

  .create-exam-feedback-modal-submit-button {
    margin-top: 10px;
    width: 100%;
  }
`;

interface CreateExamFeedbackModalProps extends Omit<ModalProps, 'children'> {}

const CreateExamFeedbackModal: React.FC<CreateExamFeedbackModalProps> = (
  props
) => {
  const { value, setValue, onChange } = useInput('');
  const [createFeedback, { loading: createFeedbackLoading }] =
    useCreateFeedback();
  const { ...modalProps } = props;

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (!value) return;
      const res = await createFeedback({
        variables: {
          input: {
            content: value,
          },
        },
      });
      if (res.data?.createFeedback.ok) {
        setValue('');
        message.success('피드백이 등록되었습니다.');
        modalProps.onClose();
        return;
      }
      return message.error(res.data?.createFeedback.error);
    } catch (e) {
      handleError(e);
    }
  };
  return (
    <CreateExamFeedbackModalBlock {...modalProps}>
      <form
        className="create-exam-feedback-modal-wrapper"
        onSubmit={handleSubmit}
      >
        <TextArea
          value={value}
          onChange={onChange}
          autoSize={{ minRows: 5, maxRows: 5 }}
          placeholder="서비스 이용에 대한 피드백을 남겨주세요."
        ></TextArea>
        <Button
          className="create-exam-feedback-modal-submit-button"
          size="large"
          type="primary"
          htmlType="submit"
          disabled={!value}
          loading={createFeedbackLoading}
        >
          제출하기
        </Button>
      </form>
    </CreateExamFeedbackModalBlock>
  );
};

export default CreateExamFeedbackModal;
