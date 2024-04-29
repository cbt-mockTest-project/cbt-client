import React from 'react';
import StoreCreateForm from './StoreCreateForm';
import StoreContentAgreement from './StoreContentAgreement';

interface StoreCreateComponentProps {}

const StoreCreateComponent: React.FC<StoreCreateComponentProps> = () => {
  return (
    <div className="flex flex-col py-5 px-7 overflow-auto">
      <div className="flex flex-col w-1/3">
        <p className="text-lg font-bold ">자료등록</p>
        <p className="text-sm text-gray-500 mt-2">
          자신만의 노하우가 담긴 자료를 등록해보세요.
        </p>
      </div>
      <div className="flex gap-20 mt-5 ">
        <StoreContentAgreement />
        <StoreCreateForm />
      </div>
    </div>
  );
};

export default StoreCreateComponent;
