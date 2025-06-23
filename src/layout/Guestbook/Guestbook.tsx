import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { onValue, push, ref, remove } from 'firebase/database';
import { realtimeDb } from '../../firebase';

interface GuestbookEntry {
  id: string;
  sender: string;
  message: string;
  createdAt: number;
  date: string;
}

const CommentForm = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<GuestbookEntry[]>([]);
  const [showCount, setShowCount] = useState(4);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const guestbookRef = ref(realtimeDb, 'guestbook');
    const unsubscribe = onValue(guestbookRef, (snapshot) => {
      const data = snapshot.val() as Record<string, Omit<GuestbookEntry, 'id'>> | null;
      if (!data) return;

      const entries: GuestbookEntry[] = Object.entries(data).map(([key, val]) => ({
        id: key,
        ...val,
      }));

      entries.sort((a, b) => b.createdAt - a.createdAt);
      setMessages(entries);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = (id: string) => {
    const confirmDelete = confirm('정말 삭제하시겠습니까?');
    if (!confirmDelete) return;

    const messageRef = ref(realtimeDb, `guestbook/${id}`);
    void remove(messageRef);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !message) {
      alert('이름과 메시지를 입력해주세요.');
      return;
    }

  const now = new window.Date();

  const guestbookMessage = {
    sender: name,
    message,
    createdAt: now.getTime(),
    date: now.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }),
}


    const guestbookRef = ref(realtimeDb, 'guestbook');
    void push(guestbookRef, guestbookMessage);
    alert('메시지를 보냈습니다. 💌');
    setName('');
    setMessage('');
    setFormVisible(false);
  };

  return (
    <Wrapper>
      <List>
        {messages.slice(0, showCount).map((msg) => (
          <Item key={msg.id}>
            <TopRow>
              <Sender>{msg.sender}</Sender>
              <DateDelete>
                <Date>{msg.date}</Date>
                <DeleteBtn onClick={() => handleDelete(msg.id)}>✕</DeleteBtn>
              </DateDelete>
            </TopRow>
            <Message>{msg.message}</Message>
          </Item>
        ))}
      </List>

      {messages.length > showCount && (
        <MoreButton onClick={() => setShowCount(showCount + 4)}>더보기</MoreButton>
      )}

      {formVisible ? (
        <Form onSubmit={handleSubmit}>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름"
          />
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="예쁜 마음을 전해보세요 💌"
          />
          <SubmitButton type="submit">작성 완료</SubmitButton>
        </Form>
      ) : (
        <OpenFormButton onClick={() => setFormVisible(true)}>작성하기</OpenFormButton>
      )}
    </Wrapper>
  );
};

export default CommentForm;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  align-items: center;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 420px;
`;

const Item = styled.li`
  background: #f9f8f6;
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-width: 380px;
  margin-bottom: 10px; /* ✅ 위아래 간격 추가 */
  text-align: left;    /* ✅ 글자 왼쪽 정렬 */
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Sender = styled.span`
  font-weight: bold;
  color: #333;
`;

const DateDelete = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  color: #aaa;
`;

const DeleteBtn = styled.button`
  background: none;
  border: none;
  color: #bbb;
  font-size: 1rem;
  cursor: pointer;
`;

const Date = styled.span`
  font-size: 0.75rem;
`;

const Message = styled.p`
  font-size: 0.95rem;
  margin: 0;
  margin-top: 4px;
  color: #444;
  white-space: pre-line;
`;

const MoreButton = styled.button`
  padding: 8px 12px;
  font-size: 0.9rem;
  background: #f2f2f2;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 420px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Textarea = styled.textarea`
   padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: none;
  height: 80px;
  font-family: inherit; /* ✅ 글꼴 상속 */
  font-size: 0.95rem;

  &::placeholder {
    color: #999;
    font-family: inherit;   /* ✅ placeholder 글꼴 상속 */
    font-size: 0.95rem;     /* ✅ placeholder 글씨 크기 맞추기 */
  }
`;

const SubmitButton = styled.button`
  align-self: flex-end;
  background: #d8b5b5;
  color: white;
  padding: 8px 20px;
  font-size: 0.9rem;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  margin-bottom: 32px;
    margin-bottom: 100px; /* ✅ 여백 추가 */
`;

const OpenFormButton = styled.button`
  align-self: flex-end;
  background: #d8b5b5;
  color: white;
  padding: 8px 20px;
  font-size: 0.9rem;
  border: none;
  border-radius: 999px;
  cursor: pointer;
    margin-bottom: 100px; /* ✅ 여백 추가 */
`;

