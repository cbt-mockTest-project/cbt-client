import useRevenueRequestForm from '@lib/hooks/useRevenueRequestForm';
import { handleError } from '@lib/utils/utils';
import { Modal, ModalProps, message } from 'antd';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const RequestRevenueModalBlock = styled(Modal)``;

interface RequestRevenueModalProps extends Omit<ModalProps, 'children'> {
  categoryId: number;
  onClose: () => void;
}

const RequestRevenueModal: React.FC<RequestRevenueModalProps> = (props) => {
  const { onClose, categoryId, ...modalProps } = props;
  const { useCreateRevenueRequestForm } = useRevenueRequestForm();
  const createRevenueRequestForm = useCreateRevenueRequestForm(categoryId);
  const onOk = async () => {
    try {
      const res = await createRevenueRequestForm.mutateAsync({
        categoryId,
      });

      if (res.ok) {
        message.success('수익창출 신청이 완료되었습니다.');
        onClose();
        return;
      }
      message.error(res.error);
    } catch (e) {
      message.error('수익창출 신청에 실패했습니다.');
      console.log(e);
      handleError(e);
    }
  };
  return (
    <RequestRevenueModalBlock
      {...modalProps}
      title="수익창출 신청하기"
      okButtonProps={{
        loading: createRevenueRequestForm.isPending,
      }}
      onOk={onOk}
      okText="신청하기"
      cancelText="취소"
    >
      <div className="text-[16px] text-gray-700 font-bold">
        아래와 같은 항목을 만족할 경우 수익창출 신청이 가능합니다
      </div>
      <div className="text-[15px] text-gray-700 mt-4 border-l-4 border-blue-500 pl-4 border-solid">
        <div>- 타 암기장과 중복되지 않는 내용</div>
        <div>- 시험지수 2개 이상</div>
        <div>- 문제수 50개 이상</div>
      </div>
      <div className="text-gray-700 mt-4 ">
        <div>
          승인이 완료되면 수익창출이 가능하며, 승인까지 1~2일이 소요될 수
          있습니다.
        </div>
        <div>수익창출에 대한 자세한 내용은 아래 링크를 참고해주세요.</div>
        <Link
          href="https://pinto-buffalo-54c.notion.site/be660af277984f78ac8be42940b61a8c"
          target="_blank"
          rel="noopener noreferrer"
        >
          수익창출 안내 자세히 보기
        </Link>
      </div>
    </RequestRevenueModalBlock>
  );
};
export default RequestRevenueModal;
