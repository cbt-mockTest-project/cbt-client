import { revalidatePath } from '@lib/apis/revalidate';
import { Button, Input } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';

interface RevalidateTabProps {}

const RevalidateTab: React.FC<RevalidateTabProps> = () => {
  const [path, setPath] = useState<string>('');
  return (
    <div className="flex gap-4">
      <Input
        value={path}
        onChange={(e) => setPath(e.target.value)}
        placeholder="경로를 입력해주세요"
      />
      <Button
        onClick={() => {
          revalidatePath(path);
        }}
      >
        Revalidate
      </Button>
    </div>
  );
};

export default RevalidateTab;
