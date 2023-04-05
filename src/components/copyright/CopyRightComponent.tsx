import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import React from 'react';
import styled from 'styled-components';

interface CopyRightComponentProps {}

const CopyRightComponent: React.FC<CopyRightComponentProps> = () => {
  return (
    <CopyRightComponentContainer>
      <p>{`본 사이트는 국가고시 실기시험을 준비하는 수험생들이 효율적으로 학습 할 수 있도록 돕기 위한 순수한 의도로 만들어졌습니다.\n또한 회사가 아닌 개인으로 서비스를 개발 및 운영하고 있습니다.`}</p>
      <br />
      <br />
      <h2>문제 저작권 안내</h2>
      <br />
      <p>{`본 사이트에 올라와 있는 문제는 대부분 국가공인자격 등 공공성 있는 시험의 기출문제로 문제의 저작권은 출제기관 등 원저작권자에게 있습니다.
      \n인터넷이나 수험서에서 쉽게 찾을 수 있는 기출 문제를 토대로 제작되고 있으며, 서비스 이용자 분들과 함께 추가적인 수정작업을 거치고 있습니다.
      \n만약 시험 주최·주관측에서 본 사이트에서 문제를 공개하는 것이 문제가 된다면 공문을 보내주시기 바랍니다.\n공문확인 후 해당 문제를 바로 삭제 조치하도록 하겠습니다.`}</p>
      <br />
      <h2>2차 저작권 안내</h2>
      <br />
      <p>{`사이트에서 직접 복원하거나 이용자들이 복원하여 등록하는 과정에서 문제의 보기, 그림 등 일부 컨텐츠가 자체적으로 제작되는 경우가 있습니다.\n다만, 본 사이트는 그러한 2차 저작물의 권리를 일절 주장하지 않습니다.\n이용자들이 복원하여 등록하는 문제 또한 오로지 원저작권자의 권리만 인정하는 것을 원칙으로 합니다.\n따라서 이용자가 등록한 문제이더라도 원저작권자의 삭제 요청이 있을 경우 즉시 삭제하는 것을 방침으로 하고 있습니다. 
      \n일부 문제는 복원,등록되는 과정에서 제3자에 의해 만들어진 내용을 포함할 수 있는데, 관련된 저작권자일 경우 연락주시면 조치하도록 하겠습니다.`}</p>
      <p>{`\n아래 메일로 저작권자임을 확인 할 수 있는 자료, 조치가 필요한 시험,회차,문제를 명시하여 보내주시면 감사하겠습니다.\n시험 출제를 주관으로 하는 공공기관의 경우 공문을 보내주시면 조치하도록 하겠습니다.`}</p>
      <br />
      <a href="mailto:moducbt@gmail.com">moducbt@gmail.com</a>
    </CopyRightComponentContainer>
  );
};

export default CopyRightComponent;

const CopyRightComponentContainer = styled.div`
  h2 {
    font-size: 1.5rem;
  }
  p {
    white-space: pre-wrap;
  }
  a {
    color: ${palette.antd_blue_01};
  }
  @media (max-width: ${responsive.medium}) {
    padding: 30px 20px;
  }
`;
