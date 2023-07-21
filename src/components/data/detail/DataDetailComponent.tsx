import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Button, Card, message } from 'antd';
import palette from '@styles/palette';
import parse from 'html-react-parser';
import { useLazyReadPost } from '@lib/graphql/user/hook/usePost';
import { convertToKST } from '@lib/utils/utils';
import EditorStyle from '@styles/editorStyle';
import { FavoriteBorderOutlined, FavoriteOutlined } from '@mui/icons-material';
import {
  useAppDispatch,
  useAppSelector,
} from '@modules/redux/store/configureStore';
import { useRouter } from 'next/router';
import { dataActions } from '@modules/redux/slices/data';
import { Post } from 'types';
import Link from 'next/link';
import { useEditPostLike } from '@lib/graphql/user/hook/usePostLike';

const DataDetailComponentBlock = styled.div`
  .data-detail-title {
    font-size: 20px;
    padding-bottom: 15px;
    border-bottom: 2px solid ${palette.gray_100};
  }
  .data-detail-description {
    ${EditorStyle}
    margin-top: 25px;
  }
  .data-detail-info {
    color: ${palette.gray_700};
  }
  .data-detail-info-wrapper {
    display: flex;
    gap: 25px;
    margin-top: 15px;
    color: ${palette.gray_700};
    border-bottom: 2px solid ${palette.gray_100};
    padding-bottom: 15px;
  }
  .data-detail-info-left-side {
    display: flex;
    flex-direction: column;
  }
  .data-detail-info-right-side {
    justify-content: center;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .data-detail-vote-count {
    font-size: 20px;
    text-align: center;
  }
  .data-detail-vote-button {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s;
    svg {
      width: 25px;
      height: 25px;
      color: ${palette.red_500};
    }
  }
  .data-detail-info-content-wrapper {
    display: flex;
  }
  .data-detail-info-content-key {
    width: 100px;
  }
  .data-detail-download-button {
    margin-top: 15px;
    width: 200px;
  }
`;

interface DataDetailComponentProps {}

const DataDetailComponent: React.FC<DataDetailComponentProps> = ({}) => {
  const [readPost] = useLazyReadPost();
  const [editPostLike] = useEditPostLike();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const post = useAppSelector((state) => state.data.dataDetail);

  const handleLike = async () => {
    if (!post) return;
    const res = await editPostLike({
      variables: {
        input: {
          postId: post.id,
        },
      },
    });
    if (res.data?.editPostLike.ok) {
      const newPost = {
        ...post,
        likesCount: res.data.editPostLike.currentState
          ? post.likesCount + 1
          : post.likesCount - 1,
        likeState: res.data.editPostLike.currentState,
      };
      dispatch(dataActions.setDataDetail(newPost));
      return;
    }
    return message.error(res.data?.editPostLike.error);
  };

  useEffect(() => {
    (async () => {
      const res = await readPost({
        variables: {
          input: {
            id: Number(router.query.Id),
          },
        },
      });
      if (!res.data?.readPost.post) return;
      dispatch(dataActions.setDataDetail(res.data.readPost.post as Post));
    })();
  }, [router.query.Id]);

  if (!post) return null;
  return (
    <DataDetailComponentBlock>
      <Card>
        <h1 className="data-detail-title">{post.title}</h1>
        <div className="data-detail-info-wrapper">
          <div className="data-detail-info-left-side">
            <div className="data-detail-info-content-wrapper">
              <p className="data-detail-info-content-key">제작자</p>
              <p className="data-detail-info-content-value">
                {post.user.nickname}
              </p>
            </div>
            <div className="data-detail-info-content-wrapper">
              <p className="data-detail-info-content-key">등록일</p>
              <p className="data-detail-info-content-value">
                {convertToKST(post.created_at, 'yyyy.MM.dd')}
              </p>
            </div>
            <div className="data-detail-info-content-wrapper">
              <p className="data-detail-info-content-key">수정일</p>
              <p className="data-detail-info-content-value">
                {convertToKST(post.updated_at, 'yyyy.MM.dd')}
              </p>
            </div>
            <div className="data-detail-info-content-wrapper">
              <p className="data-detail-info-content-key">페이지</p>
              <p className="data-detail-info-content-value">{`${
                post.data?.postFile[0].page || 0
              } 페이지`}</p>
            </div>
            <div className="data-detail-info-content-wrapper">
              <p className="data-detail-info-content-key">가격</p>
              <p className="data-detail-info-content-value">
                {post.data?.price ? `${post.data.price}원` : '무료'}
              </p>
            </div>

            <a
              href={post.data?.postFile[0].url || ''}
              target="_blank"
              rel="noreferrer"
            >
              <Button
                className="data-detail-download-button"
                type="primary"
                size="large"
              >
                다운로드
              </Button>
            </a>
          </div>
          <div className="data-detail-info-right-side">
            <button className="data-detail-vote-button" onClick={handleLike}>
              {post.likeState ? (
                <FavoriteOutlined />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </button>
            <div className="data-detail-vote-count">{post.likesCount}</div>
          </div>
        </div>
        <div className="data-detail-description">{parse(post.content)}</div>
      </Card>
    </DataDetailComponentBlock>
  );
};

export default DataDetailComponent;
