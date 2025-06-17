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
          <Arrow>{openGroom ? '▲' : '▼'}</Arrow>
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
          <Arrow>{openBride ? '▲' : '▼'}</Arrow>
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

const Container = styled.div`
  max-width: 450px;
  width: 100%;
  margin: 20px auto;  // 기존 margin: 50px → 20px으로 변경
  padding: 10px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Toggle = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  background: #f9f9f9;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: center;  // 가운데 정렬
  align-items: center;
  gap: 10px;
`;

const Arrow = styled.span`
  font-size: 18px;
`;

const Collapse = styled.div<{ isOpen: boolean }>`
  overflow: hidden;
  transition: max-height 0.4s ease;
  max-height: ${({ isOpen }) => (isOpen ? '500px' : '0')};
  margin-top: ${({ isOpen }) => (isOpen ? '10px' : '0')};
`;
