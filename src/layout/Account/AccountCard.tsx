import styled from '@emotion/styled';
import CopyIcon from '@/assets/icons/copy.svg?react';
import kakaopay from '@/assets/icons/kakaopay.png?url';

interface IAccountProps {
  name: string;
  relation: string;
  bank: string;
  account: string;
  kakaopayAccount?: string;
}

const AccountCard = ({ name, relation, bank, account, kakaopayAccount }: IAccountProps) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(account);
      alert('계좌번호가 복사되었습니다.');
    } catch (error) {
      alert('복사에 실패했습니다.');
    }
  };

  return (
    <ItemWrapper>
      <AccountInfo>
        <BankText>{bank} {account}</BankText>
        <NameText>{name} ({relation})</NameText>
      </AccountInfo>
      <ActionWrapper>
        <IconButton onClick={() => void handleCopy()}>
            <CopyIcon fill="#666" />
        </IconButton>
        {kakaopayAccount && (
            <KakaoButton href={kakaopayAccount} target="_blank" rel="noreferrer">
            <KakaoImg src={kakaopay} alt="kakaopay" />
            </KakaoButton>
        )}
        </ActionWrapper>

    </ItemWrapper>
  );
};

export default AccountCard;

const ItemWrapper = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AccountInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const BankText = styled.div`
  font-weight: bold;
`;

const NameText = styled.div`
  font-size: 14px;
  color: #555;
`;

const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const IconButton = styled.button`
  background: #eee;
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

const KakaoButton = styled.a`
  background: #ffe812;
  padding: 5px 10px;
  border-radius: 5px;
`;

const KakaoImg = styled.img`
  width: 40px;
`;
