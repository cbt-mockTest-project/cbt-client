import { ClearOutlined } from '@ant-design/icons';
import { useGetMyCategories } from '@lib/graphql/hook/useExam';
import Clear from '@mui/icons-material/Clear';
import { Select } from 'antd';
import React from 'react';

interface StoreCategorySelectProps {
  defalutValue?: number;
  onChange: (value: number | null) => void;
}

const StoreCategorySelect: React.FC<StoreCategorySelectProps> = ({
  defalutValue,
  onChange,
}) => {
  const { data } = useGetMyCategories();
  const [selectedCategory, setSelectedCategory] = React.useState<number | null>(
    null
  );
  const categories = data?.getMyExamCategories.categories;
  const options =
    categories?.length > 0
      ? [
          {
            label: <div className="text-gray-500">등록 취소</div>,
            value: null,
          },
          ...categories.map((category) => ({
            label: category.name,
            value: category.id,
          })),
        ]
      : [];
  return (
    <div className="w-full">
      <Select
        className="w-full"
        size="large"
        placeholder="등록 할 암기장을 선택해주세요."
        defaultValue={defalutValue}
        value={selectedCategory === null ? undefined : selectedCategory}
        options={options}
        onChange={(value) => {
          setSelectedCategory(value);
          onChange(value);
        }}
      />
    </div>
  );
};

export default StoreCategorySelect;
