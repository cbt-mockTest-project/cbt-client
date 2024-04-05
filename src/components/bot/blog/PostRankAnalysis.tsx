import { Input } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import usePostSearchRank from './hooks/usePostSearchRank';
import { useRouter } from 'next/router';
import { LocalStorage } from '@lib/utils/localStorage';
import { DeleteOutlined } from '@ant-design/icons';
import { uniqueId } from 'lodash';
import { useQueryClient } from '@tanstack/react-query';
import palette from '@styles/palette';

const PostRankAnalysisBlock = styled.div`
  .rank-list {
    margin-top: 10px;
    display: flex;
    gap: 10px;
    flex-direction: column;
    .rank-list-item {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding-right: 10px;
      border-bottom: 1px solid ${palette.colorBorder};
      .rank-list-item-left {
      }
    }
  }
`;
const RANK_HISTORY_KEY = 'rankHistory';

interface PostRankAnalysisProps {
  logNo: string;
}

interface RankHistory {
  keyword: string;
  naver: number;
  daum: number;
  id: string;
}

interface SaveRankHistoryArgs {
  keyword: string;
  naver: number;
  daum: number;
  id: string;
}

const PostRankAnalysis: React.FC<PostRankAnalysisProps> = ({ logNo }) => {
  const router = useRouter();
  const blogId = router.query.b as string;
  const storage = new LocalStorage();
  const queryclient = useQueryClient();
  const saveRankHistory = ({
    keyword,
    naver,
    daum,
    id,
  }: SaveRankHistoryArgs) => {
    if (!blogId) return;
    const histories = storage.get(RANK_HISTORY_KEY);
    const newRankHistory = {
      [blogId]: {
        [logNo]: [
          {
            keyword,
            naver,
            daum,
            id,
          },
        ],
      },
    };
    if (!histories) {
      return storage.set(RANK_HISTORY_KEY, newRankHistory);
    }
    const prevMyHistory = histories[blogId];
    if (!prevMyHistory) {
      return storage.set(RANK_HISTORY_KEY, newRankHistory);
    }
    const prevMyLogNo = Object.keys(prevMyHistory).includes(logNo);
    if (!prevMyLogNo) {
      return storage.set(RANK_HISTORY_KEY, {
        ...histories,
        [blogId]: {
          ...prevMyHistory,
          [logNo]: [
            {
              keyword,
              naver,
              daum,
              id,
            },
          ],
        },
      });
    }
    return storage.set(RANK_HISTORY_KEY, {
      ...histories,
      [blogId]: {
        ...prevMyHistory,
        [logNo]: [
          {
            keyword,
            naver,
            daum,
            id,
          },
          ...prevMyHistory[logNo],
        ],
      },
    });
  };
  const delelteRankHistory = (id: string, keyword: string) => {
    setHistories((prev) => prev.filter((history) => history.id !== id));
    const histories = storage.get(RANK_HISTORY_KEY);
    if (!histories) return;
    if (!blogId) return;
    const myHistories = histories[blogId];
    if (!myHistories) return;
    const myLogNo = myHistories[logNo];
    if (!myLogNo) return;
    const newHistories = myLogNo.filter((history) => history.id !== id);
    storage.set(RANK_HISTORY_KEY, {
      ...histories,
      [blogId]: {
        ...myHistories,
        [logNo]: newHistories,
      },
    });
    setKeyword('');
    queryclient.removeQueries({ queryKey: ['searchRank', blogId, keyword] });
  };
  const [keyword, setKeyword] = useState<string>('');
  const [histories, setHistories] = useState<RankHistory[]>([]);
  const { data, isLoading } = usePostSearchRank(keyword);

  useEffect(() => {
    if (data) {
      const id = uniqueId('history-');
      setHistories((prev) => [
        {
          keyword,
          naver: data.naverBlogSearchRank,
          daum: data.daumBlogSearchRank,
          id,
        },
        ...prev,
      ]);
      saveRankHistory({
        keyword,
        naver: data.naverBlogSearchRank,
        daum: data.daumBlogSearchRank,
        id,
      });
    }
  }, [data]);

  useEffect(() => {
    const histories = storage.get(RANK_HISTORY_KEY);
    if (!histories) return;
    if (!blogId) return;
    const myHistories = histories[blogId];
    if (!myHistories) return;
    const myLogNo = myHistories[logNo];
    if (!myLogNo) return;
    setHistories(myLogNo);
  }, []);
  return (
    <PostRankAnalysisBlock>
      <Input.Search
        placeholder="키워드"
        enterButton="검색"
        loading={isLoading}
        onSearch={(value) => {
          setKeyword(value);
        }}
      />
      <div className="rank-list">
        {histories.map((history) => (
          <div className="rank-list-item" key={history.id}>
            <div className="rank-list-item-left">
              <div className="rank-list-item-left-keyword">
                {history.keyword}
              </div>
              <div>{`네이버: ${history.naver || 'x'} / 다음: ${
                history.daum || 'x'
              }`}</div>
            </div>
            <button
              className="rank-delete-button"
              onClick={() => {
                delelteRankHistory(history.id, history.keyword);
              }}
            >
              ✖
            </button>
          </div>
        ))}
      </div>
    </PostRankAnalysisBlock>
  );
};

export default PostRankAnalysis;
