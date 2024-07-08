import InviteComponent from '../../app/_components/invite/InviteComponent';
import withAuth from '../../app/_lib/hocs/withAuth';
import { NextPage } from 'next';

const InvitePage: NextPage = () => {
  return <InviteComponent />;
};

export default withAuth(InvitePage);
