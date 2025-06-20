import { useState } from 'react';
import styled from '@emotion/styled';
import data from 'data.json';
import AccountCard from './AccountCard';

const Account = () => {
  const { hostInfo } = data;

  const [openGroom, setOpenGroom] = useState(false);
  const [openBride, setOpenBride] = useState(false);

  const groomData = hostInfo.find((host) => host.host === '신랑측');
  const brideData = hostInfo.find((host) => host.host === '신부측');

  return (
    <Container>
      <Section>
        <Toggle onClick={() => setOpenGroom(!openGroom)}>
          신랑측 계좌번호
          <Arrow isOpen={openGroom} />
        </Toggle>

        <Collapse isOpen={openGroom}>
          {groomData?.accountInfo.map((account, idx) => (
            <AccountCard key={idx} {...account} />
          ))}
        </Collapse>
      </Section>

      <Section>
        <Toggle onClick={() => setOpenBride(!openBride)}>
          신부측 계좌번호
          <Arrow isOpen={openBride} />
        </Toggle>

        <Collapse isOpen={openBride}>
          {brideData?.accountInfo.map((account, idx) => (
            <AccountCard key={idx} {...account} />
          ))}
        </Collapse>
      </Section>
    </Container>
  );
};

export default Account;

// styled-components
const Container = styled.div`
  max-width: 350px;
  width: 100%;
  margin: 20px auto;
  padding: 10px;
  font-family: 'SUITE-Regular', 'Noto Serif KR', serif;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Toggle = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  background:rgb(255, 255, 255);
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Arrow = styled.span<{ isOpen: boolean }>`
  display: inline-block;
  width: 8px;
  height: 8px;
  border: solid #333;
  border-width: 0 2px 2px 0;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(-135deg)' : 'rotate(45deg)')};
  transition: transform 0.3s ease;
`;

const Collapse = styled.div<{ isOpen: boolean }>`
  overflow: hidden;
  transition: max-height 0.4s ease;
  max-height: ${({ isOpen }) => (isOpen ? '500px' : '0')};
  margin-top: ${({ isOpen }) => (isOpen ? '10px' : '0')};
`;
