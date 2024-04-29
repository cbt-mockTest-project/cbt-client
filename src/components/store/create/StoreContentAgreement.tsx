import { Checkbox, Collapse } from 'antd';
import React from 'react';
import { copyrightRulesText, pledgeDocumentText } from './StoreCreate.texts';

interface StoreContentAgreementProps {}

const StoreContentAgreement: React.FC<StoreContentAgreementProps> = () => {
  return (
    <div className="mt-4 w-2/5">
      <p className="text-lg font-bold mb-2">약관 동의</p>
      <Collapse className="w-full">
        <Collapse.Panel header="서약서" key="1">
          <pre className="whitespace-pre-line break-all font-sm text-gray-500">
            {pledgeDocumentText}
          </pre>
        </Collapse.Panel>
        <Collapse.Panel header="저작권 규정" key="2">
          <pre className="whitespace-pre-line break-all font-sm text-gray-500">
            {copyrightRulesText}
          </pre>
        </Collapse.Panel>
      </Collapse>
      <Checkbox
        className="mt-4 font-sm text-gray-500"
        style={{
          fontSize: '0.=75rem',
        }}
      >
        위 내용을 모두 확인하였으며, 이에 동의합니다.
      </Checkbox>
    </div>
  );
};

export default StoreContentAgreement;
