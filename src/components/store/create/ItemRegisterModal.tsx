import { Modal, ModalProps } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';

const ItemRegisterModalBlock = styled(Modal)``;

interface ItemRegisterModalProps extends Omit<ModalProps, 'children'> {
  onSubmit: () => Promise<void>;
}

const ItemRegisterModal: React.FC<ItemRegisterModalProps> = (props) => {
  const { ...modalProps } = props;
  const [isLoading, setIsLoading] = useState(false);
  const onClickOk = async () => {
    setIsLoading(true);
    await props.onSubmit();
    setIsLoading(false);
  };
  return (
    <ItemRegisterModalBlock
      {...modalProps}
      okButtonProps={{
        loading: isLoading,
      }}
      okText="판매 신청"
      onOk={onClickOk}
      cancelText="취소"
      title="판매 상품 등록신청"
    >
      <div className=" text-gray-500 mb-2 font-bold">
        판매 상품등록 유의사항
      </div>
      <ul className="list-inside list-disc text-sm text-gray-500 mb-4">
        <li className="list-disc">
          중복된 내용의 자료일 경우, 판매가 거절 될 수 있습니다.
        </li>
        <li className="list-disc">
          자료의 품질이 낮거나, 부적절한 내용일 경우, 판매가 거절 될 수
          있습니다.
        </li>
        <li className="list-disc">
          유료 자료 등록 시, 자료는 검수 후 판매가 시작됩니다.
        </li>
      </ul>
    </ItemRegisterModalBlock>
  );
};
export default ItemRegisterModal;
