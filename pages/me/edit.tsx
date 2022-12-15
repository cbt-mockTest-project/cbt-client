import React from 'react';
import styled from 'styled-components';
import { GetServerSideProps, NextPage } from 'next';
import Layout from '@components/common/layout/Layout';
import Label from '@components/common/label/Label';
import { Button, Input } from 'antd';
import palette from '@styles/palette';
import { addApolloState, initializeApollo } from '@modules/apollo';
import { ME_QUERY } from '@lib/graphql/user/query/userQuery';
import { MeQuery } from '@lib/graphql/user/query/userQuery.generated';

interface EditPageProps {
  user: MeQuery['me']['user'];
}

const Edit: NextPage<EditPageProps> = ({ user }) => {
  return (
    <Layout>
      <EditBlock>
        <h1>회원정보 변경</h1>
        <div className="edit-block">
          <Label content={'닉네임'} htmlFor="nickname" />
          <div className="edit-input-and-button-wrapper">
            <Input id="nickname" defaultValue={user?.nickname} />
            <Button>변경하기</Button>
          </div>
        </div>
        <div className="edit-block">
          <Label content={'비밀번호'} />
          <Label content={'현재 비밀번호'} className="edit-sub-label" />
          <div className="edit-input-and-button-wrapper">
            <Input />
            <Button>확인하기</Button>
          </div>
          <Label content={'변경할 비밀번호'} className="edit-sub-label" />
          <div className="edit-input-and-button-wrapper">
            <Input />
            <Button>변경하기</Button>
          </div>
        </div>
        <div className="edit-block">
          <Label content={'탈퇴하기'} />
          <div className="edit-input-and-button-wrapper">
            <Label
              content={'회원 탈퇴 시 재가입이 불가능 합니다.'}
              className="edit-sub-label"
            />
          </div>
          <Button className="edit-withdrawal-button">탈퇴하기</Button>
        </div>
      </EditBlock>
    </Layout>
  );
};

export default Edit;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient = initializeApollo({}, String(context.req.headers.cookie));
  const res = await apolloClient.query<MeQuery>({
    query: ME_QUERY,
  });
  let user: MeQuery['me']['user'];
  if (res.data.me) {
    user = res.data.me.user;
  }
  return addApolloState(apolloClient, { props: { user } });
};

const EditBlock = styled.div`
  max-width: 300px;
  margin: 0 auto;
  h1 {
    font-size: 1.2rem;
    font-size: bold;
  }
  .edit-input-and-button-wrapper {
    display: flex;
    gap: 10px;
  }
  .edit-sub-label {
    font-size: 0.8rem;
    color: ${palette.gray_500};
    margin-top: 5px;
  }
  .edit-block {
    display: flex;
    flex-direction: column;
    padding: 10px 0;
  }
  .edit-withdrawal-button {
    margin-top: 10px;
  }
`;
