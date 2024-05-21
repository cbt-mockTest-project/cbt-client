import { InboxOutlined } from '@ant-design/icons';
import Dragger, { DraggerProps } from 'antd/lib/upload/Dragger';
import React from 'react';

interface StoreCustomDraggerProps extends DraggerProps {
  mainText?: string;
  subText?: string;
}

const StoreCustomDragger: React.FC<StoreCustomDraggerProps> = (props) => {
  const { mainText, subText, ...dragerProps } = props;
  return (
    <Dragger {...dragerProps}>
      <p>
        <InboxOutlined />
      </p>
      {mainText && <p>{mainText}</p>}
      {subText && <p>{subText}</p>}
    </Dragger>
  );
};

export default StoreCustomDragger;
