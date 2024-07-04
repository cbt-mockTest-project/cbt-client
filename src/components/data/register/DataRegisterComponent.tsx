import palette from '@styles/palette';
import { Button, Input, App } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PDFDocument } from 'pdf-lib';
import { responsive } from '@lib/utils/responsive';
import useInput from '@lib/hooks/useInput';
import DataRegisterEditor from './DataRegisterEditor';
import { handleError, removeHtmlTag } from '@lib/utils/utils';
import axios from 'axios';
import {
  useCreatePost,
  useEditPost,
  useLazyReadPost,
} from '@lib/graphql/hook/usePost';
import { CreatePostInput, PostCategory } from 'types';
import { UploadFile } from '../Data.type';
import { useRouter } from 'next/router';
import DataRegisterFileUploadButton from './DataRegisterFileUploadButton';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { useAppDispatch } from '@modules/redux/store/configureStore';
import { dataActions } from '@modules/redux/slices/data';

const DataRegisterComponentBlock = styled.form`
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  .data-register-upload-input {
    display: none;
  }
  .data-register-upload-label {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    height: 40px;
    padding: 0 15px;
    border-radius: 8px;
    border: 1px dashed ${palette.gray_400};
    font-size: 14px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    font-size: 14px;
    color: ${({ theme }) => theme.color('colorTextTertiary')};
    :hover {
      border-color: ${palette.antd_blue_01};
      color: ${palette.antd_blue_01};
    }
  }

  .data-register-uploaded-file-wrapper {
    display: flex;
    border-radius: 8px;
    height: 40px;
    gap: 10px;
    align-items: center;
    padding: 0 15px;
    font-size: 14px;
    border: 1px solid ${palette.gray_400};
  }
  .data-register-uploaded-file-button {
    text-align: left;
    display: inline-block;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px;
    width: 80%;
    :hover {
      text-decoration: underline;
    }
  }
  .data-register-uploaded-file-clear-button {
    height: 24px;
    color: ${palette.gray_500};
    margin-left: auto;
    transition: all 0.2s ease-in-out;
    :hover {
      color: ${palette.antd_blue_01};
    }
  }
  .data-register-uploaded-file-page {
    font-size: 14px;
    color: ${({ theme }) => theme.color('colorTextTertiary')};
  }

  @media (max-width: ${responsive.medium}) {
    padding: 20px;
  }
`;

interface DataRegisterComponentProps {}

const DataRegisterComponent: React.FC<DataRegisterComponentProps> = () => {
  const { message } = App.useApp();
  const router = useRouter();
  const isEditMode = router.query.id ? true : false;
  const { data: meQuery } = useMeQuery();
  const [uploadedFile, setUploadedFile] = useState<UploadFile | null>(null);
  const dispatch = useAppDispatch();
  const [uploadedFileLoading, setUploadedFileLoading] =
    useState<boolean>(false);
  const [pdfPageCount, setPdfPageCount] = useState<number>(0);
  const {
    value: title,
    onChange: onChangeTitle,
    setValue: setTitle,
  } = useInput('');
  const { value: content, setValue: setContent } = useInput('');
  const [createPost, { loading: createPostLoading }] = useCreatePost();
  const [editPost, { loading: editPostLoading }] = useEditPost();
  const [readPost, { data: readPostQuery }] = useLazyReadPost();

  const isSubmitDisabled = !title || !removeHtmlTag(content) || !uploadedFile;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploadedFileLoading(true);
      if (!e.target.files) return;
      const file = e.target.files[0];
      if (!file) return;
      if (file && file.size > 50 * 1024 * 1024) {
        alert('50MB 미만의 파일만 업로드 가능합니다.');
        return;
      }
      if (file && file.type !== 'application/pdf') {
        alert('PDF파일만 업로드 가능합니다.');
        return;
      }
      const formData = new FormData();
      formData.append('file', file);
      formData.append('path', 'data');
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}uploads/pdf`,
        formData
      );
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pageCount = pdfDoc.getPageCount();
      setUploadedFile({
        url: result.data.url,
        name: file.name,
        page: pageCount,
      });
      setPdfPageCount(pageCount);
    } catch (e) {
      handleError(e);
    } finally {
      setUploadedFileLoading(false);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (isSubmitDisabled) return message.error('빈칸을 모두 채워주세요.');
      const createPostInput: CreatePostInput = {
        title,
        content,
        category: PostCategory.Data,
        data: {
          price: 0,
          fileUrl: uploadedFile.url,
          fileName: uploadedFile.name,
          filePage: uploadedFile.page,
        },
      };
      if (isEditMode) {
        const { category, ...editPostInput } = createPostInput;
        const res = await editPost({
          variables: {
            input: {
              ...editPostInput,
              id: Number(router.query.id),
            },
          },
        });
        if (res.data?.editPost.ok) {
          message.success('성공적으로 수정되었습니다.');
          router.push(`/data/${router.query.id}`);
        }
        return;
      }
      const res = await createPost({
        variables: {
          input: createPostInput,
        },
      });
      if (res.data?.createPost) {
        message.success('성공적으로 등록되었습니다.');
        router.push(`/data/${res.data.createPost.postId}`);
      }
      dispatch(dataActions.resetDataList());
    } catch (e) {
      handleError(e);
    }
  };

  useEffect(() => {
    if (!isEditMode) return;
    readPost({
      variables: {
        input: {
          id: Number(router.query.id),
        },
      },
    })
      .then((res) => {
        if (res.data?.readPost.ok) {
          const post = res.data.readPost.post;
          if (post) {
            setContent(post.content);
            setTitle(post.title);
            if (post.data) {
              setUploadedFile({
                url: post.data.postFile[0].url,
                name: post.data.postFile[0].name,
                page: post.data.postFile[0].page,
              });
              setPdfPageCount(post.data.postFile[0].page);
            }
          }
          return;
        }
        return message.error(res.data?.readPost.error);
      })
      .catch((e) => {
        handleError(e);
      });
  }, [router.query.id]);

  useEffect(() => {
    if (
      readPostQuery?.readPost.ok &&
      meQuery?.me.user &&
      meQuery.me.user.id !== readPostQuery.readPost.post?.user.id
    ) {
      message.error('잘못된 접근입니다.');
      router.push('/data');
    }
  }, [meQuery, readPostQuery]);

  return (
    <DataRegisterComponentBlock onSubmit={onSubmit}>
      <Input
        className="data-register-title-input"
        placeholder="제목을 입력해주세요."
        value={title}
        onChange={onChangeTitle}
        size="large"
      />
      <DataRegisterEditor content={content} setContent={setContent} />
      <DataRegisterFileUploadButton
        uploadedFile={uploadedFile}
        uploadedFileLoading={uploadedFileLoading}
        setUploadedFile={setUploadedFile}
        handleFileChange={handleFileChange}
        pdfPageCount={pdfPageCount}
      />
      <Button
        type="primary"
        size="large"
        htmlType="submit"
        disabled={isSubmitDisabled}
        loading={createPostLoading || editPostLoading}
      >
        {router.query.id ? '수정하기' : '등록하기'}
      </Button>
    </DataRegisterComponentBlock>
  );
};

export default DataRegisterComponent;
