import { debounce } from 'lodash';
import { useState, useMemo } from 'react';
import { MockExamCategory } from '../../types';

interface SearchFilterStorageOptions<MockExamCategory> {
  data: MockExamCategory[] | undefined;
  limit: number;
  hasOrderOption?: boolean;
}

export function useSearchFilterStorage({
  data,
  limit,
  hasOrderOption = false,
}: SearchFilterStorageOptions<MockExamCategory>) {
  const [page, setPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [order, setOrder] = useState<'popular' | 'latest'>('popular');

  const filteredData = useMemo(() => {
    if (!data || searchKeyword.trim() === '') return data;
    return data.filter(
      (item) =>
        String(item.name).toLowerCase().includes(searchKeyword.toLowerCase()) ||
        String(item.user.nickname)
          .toLowerCase()
          .includes(searchKeyword.toLowerCase()) ||
        String(item.description)
          .toLowerCase()
          .includes(searchKeyword.toLowerCase())
    );
  }, [data, searchKeyword]);

  const sortedAndFilteredData = useMemo(() => {
    if (!filteredData) return [];
    return [...filteredData].sort((a, b) => {
      if (order === 'popular') {
        return (
          (b.categoryEvaluations.length || 0) -
          (a.categoryEvaluations.length || 0)
        );
      } else {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      }
    });
  }, [filteredData, order]);

  const paginatedData = useMemo(() => {
    return hasOrderOption
      ? sortedAndFilteredData?.slice((page - 1) * limit, page * limit) || []
      : filteredData?.slice((page - 1) * limit, page * limit) || [];
  }, [page, limit, sortedAndFilteredData]);

  const handleSearch = debounce((keyword: string) => {
    setSearchKeyword(keyword);
    setPage(1);
  }, 300);

  const handleSort = (order: 'popular' | 'latest') => {
    setOrder(order);
    setPage(1);
  };

  return {
    searchKeyword,
    handleSearch,
    handleSort,
    filteredData,
    paginatedData,
    page,
    setPage,
    totalItems: filteredData?.length || 0,
    order,
  };
}
