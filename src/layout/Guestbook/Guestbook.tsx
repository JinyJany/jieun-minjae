// Guestbook.tsx
import styled from '@emotion/styled';
import CommentForm from './CommentForm';
import { Heading2 } from '@/components/Text';

const Guestbook = () => {
  return (
    <Wrapper>
      <Heading2>방명록</Heading2>
      <Description>메시지를 남겨주세요. 결혼식 하루 뒤, 신랑 신부에게 전달됩니다.</Description>
      <CommentForm />
    </Wrapper>
  );
};

export default Guestbook;

const Wrapper = styled.div`
  padding: 16px;
  font-family: 'SUITE-Regular', sans-serif;
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
`;
