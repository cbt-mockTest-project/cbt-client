import InviteComponent from '@components/invite/InviteComponent';
import withAuth from '@lib/hocs/withAuth';
import { NextPage } from 'next';

const InvitePage: NextPage = () => {
  return <InviteComponent />;
};

export default withAuth(InvitePage);
