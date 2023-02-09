import palette from '@styles/palette';
import React from 'react';
import styled from 'styled-components';
import DropBox, { DropBoxOption, DropBoxProps } from './DropBox';
import ClearIcon from '@mui/icons-material/Clear';
import {
  useDeleteAllNotices,
  useDeleteNotice,
  useEditNotice,
} from '@lib/graphql/user/hook/useNotice';
import { useApollo } from '@modules/apollo';
import { convertWithErrorHandlingFunc } from '@lib/utils/utils';
import { MeQuery } from '@lib/graphql/user/query/userQuery.generated';
import { ME_QUERY } from '@lib/graphql/user/query/userQuery';
import Link from 'next/link';
import { responsive } from '@lib/utils/responsive';

export interface NoticeDropBoxOption extends DropBoxOption {
  confirmed: boolean;
  time: string;
  link?: string | null;
}

interface NoticeDropBoxProps extends Omit<DropBoxProps, 'options'> {
  options: NoticeDropBoxOption[] | [];
}

const NoticeDropBox: React.FC<NoticeDropBoxProps> = ({ isOpen, options }) => {
  const [editNotice] = useEditNotice();
  const [deleteNotice] = useDeleteNotice();
  const [deleteAllNotices] = useDeleteAllNotices();
  const client = useApollo({}, '');
  const requestNoticeClick = async (noticeId: number) => {
    const res = await editNotice({
      variables: { input: { noticeId, confirm: true } },
    });
    if (res.data?.editNotice.ok) {
      client.cache.modify({
        id: `Notice:${noticeId}`,
        fields: {
          confirm() {
            return true;
          },
        },
      });
    }
  };
  const tryNoticeClick = (noticeId: number) =>
    convertWithErrorHandlingFunc({
      callback: () => requestNoticeClick(noticeId),
    });
  const requestDeleteNotice = async (noticeId: number) => {
    const res = await deleteNotice({ variables: { input: { noticeId } } });
    if (res.data?.deleteNotice.ok) {
      const queryResult = client.readQuery<MeQuery>({
        query: ME_QUERY,
      });

      if (queryResult) {
        const prevNotices = queryResult.me.notices;
        const newNotices = prevNotices?.filter(
          (notice) => notice.id !== noticeId
        );
        client.writeQuery({
          query: ME_QUERY,
          data: {
            ...queryResult,
            me: {
              ...queryResult.me,
              notices: newNotices,
            },
          },
        });
      }
    }
  };
  const requestDeleteAllNotices = async () => {
    const res = await deleteAllNotices();
    if (res.data?.deleteAllNoticesOfMe.ok) {
      const queryResult = client.readQuery<MeQuery>({
        query: ME_QUERY,
      });
      if (queryResult) {
        client.writeQuery({
          query: ME_QUERY,
          data: {
            ...queryResult,
            me: {
              ...queryResult.me,
              notices: null,
            },
          },
        });
      }
    }
  };
  const tryDeleteNotice = (noticeId: number) =>
    convertWithErrorHandlingFunc({
      callback: () => requestDeleteNotice(noticeId),
    });
  const tryDeleteAllNotices = convertWithErrorHandlingFunc({
    callback: requestDeleteAllNotices,
  });
  const hasNotices = options.length >= 1;
  return (
    <NoticeDropBoxContainer>
      <DropBox isOpen={isOpen} className="notice-drop-box">
        <div className="notice-top-content">
          <h3>알림</h3>
          <button onClick={tryDeleteAllNotices}>모든알림 지우기</button>
        </div>
        <ul className="notice-content-list">
          {hasNotices &&
            options?.map((option) =>
              !option.link ? (
                <li key={option.value}>
                  <div
                    className={`notice-content-confirm-check ${
                      !option.confirmed && 'active'
                    }`}
                  />
                  <button
                    onClick={tryNoticeClick(Number(option.value))}
                    className="notice-content-click-button"
                  >
                    <pre>{option.label}</pre>
                    <div className="notice-content-time">{option.time}</div>
                  </button>
                  <button
                    onClick={tryDeleteNotice(Number(option.value))}
                    className="notice-content-clear-button"
                  >
                    <ClearIcon />
                  </button>
                </li>
              ) : (
                <li key={option.value}>
                  <div
                    className={`notice-content-confirm-check ${
                      !option.confirmed && 'active'
                    }`}
                  />
                  <button
                    onClick={tryNoticeClick(Number(option.value))}
                    className="notice-content-click-button"
                  >
                    <Link href={option.link}>
                      <pre>{option.label}</pre>
                    </Link>
                    <div className="notice-content-time">{option.time}</div>
                  </button>
                  <button
                    onClick={tryDeleteNotice(Number(option.value))}
                    className="notice-content-clear-button"
                  >
                    <ClearIcon />
                  </button>
                </li>
              )
            )}
          {!hasNotices && <li className="not-draggable">알림이 없습니다.</li>}
        </ul>
      </DropBox>
    </NoticeDropBoxContainer>
  );
};

export default NoticeDropBox;

const NoticeDropBoxContainer = styled.div`
  .notice-drop-box {
    left: 20px;
    transform: translateX(-100%);
    min-width: 250px;
    max-width: 350px;
    width: max-content;
  }
  .notice-top-content {
    display: flex;
    justify-content: space-between;
    padding: 0px 10px 5px 10px;
    border-bottom: 1px solid ${palette.gray_200};
    font-size: 0.9rem;
    button {
      color: ${palette.antd_blue_01};
      font-size: 0.8rem;
    }
  }
  .notice-content-list {
    display: flex;
    flex-direction: column;
    .notice-content-click-button {
      width: 100%;
      :hover {
        background-color: ${palette.gray_50};
      }
    }
    .notice-content-time {
      font-size: 0.7rem;
      padding: 0 10px;
      text-align: right;
      margin-right: 10px;
      color: ${palette.gray_300};
      font-weight: bold;
    }
    pre {
      text-align: left;
      white-space: pre-wrap;
      word-break: break-all;
      cursor: pointer;
      padding: 10px;
      border-radius: 5px;
    }
    li {
      display: flex;
      align-items: center;
      cursor: unset;
      :hover {
        background-color: unset;
      }
      border-bottom: 1px solid ${palette.gray_100};
    }
    .notice-content-clear-button {
      transition: color 0.2s ease-in;
      :hover {
        color: ${palette.antd_blue_01};
      }
      svg {
        font-size: 1rem;
      }
    }
    .notice-content-confirm-check {
      width: 20px;
      height: 20px;
      position: relative;

      ::before {
        position: absolute;
        transform: translateY(-50%);
        top: 50%;
        left: 0;
        border-radius: 50%;
        content: '';
        width: 7px;
        height: 7px;
        background-color: ${palette.gray_100};
      }
    }
    .notice-content-confirm-check.active {
      ::before {
        background-color: ${palette.antd_blue_01};
      }
    }
  }
  @media (max-width: ${responsive.medium}) {
    .notice-drop-box {
      max-width: none;
      width: unset;
      top: 58px;
      transform: translate(0%);
      position: fixed;
      max-height: 400px;
      overflow-y: auto;
      left: 0;
      right: 0;
    }
  }
`;
