import styled from '@emotion/styled';
import CopyIcon from '@/assets/icons/copy.svg?react';
import kakaopay from '@/assets/icons/kakaopay.png?url';

interface IAccountProps {
  name: string;
  bank: string;
  account: string;
  kakaopayAccount?: string;
}

const AccountCard = ({ name, bank, account, kakaopayAccount }: IAccountProps) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(account);
      alert('계좌번호가 복사되었습니다.');
    } catch (error) {
      alert('복사에 실패했습니다.');
    }
  };

  return (
    <Card>
      <TextInfo>
        <NameLine>{name} ({bank})</NameLine>
        <AccountLine>{account}</AccountLine>
      </TextInfo>

      <Actions>
        <CopyBtn onClick={() => void handleCopy()}>
          <CopyIcon width={18} height={18} />
          복사
        </CopyBtn>

        {kakaopayAccount && (
          <KakaoLink href={kakaopayAccount} target="_blank" rel="noreferrer">
            <KakaoImg src={kakaopay} alt="kakaopay" />
          </KakaoLink>
        )}
      </Actions>
    </Card>
  );
};

export default AccountCard;

// --- styles ---

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TextInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14px;
`;

const NameLine = styled.div`
  font-weight: 600;
  color: #333;
`;

const AccountLine = styled.div`
  font-size: 14px;
  color: #111;
  word-break: break-all;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CopyBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background: #f2f2f2;
  border: none;
  padding: 6px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
`;

const KakaoLink = styled.a`
  background: #ffe812;
  padding: 6px 12px;
  border-radius: 5px;
`;

const KakaoImg = styled.img`
  height: 16px;
`;
