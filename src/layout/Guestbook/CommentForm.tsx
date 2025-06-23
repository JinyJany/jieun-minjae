import { useEffect, useState } from 'react';
import { onValue, push, ref } from 'firebase/database';
import { realtimeDb } from '../../firebase';
import styled from '@emotion/styled';

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
  const [visibleCount, setVisibleCount] = useState(4);
  const [showForm, setShowForm] = useState(false);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !message) {
      alert('이름과 메시지를 입력해주세요.');
      return;
    }

    const guestbookMessage = {
      sender: name,
      message,
      createdAt: Date.now(),
      date: new Date().toLocaleDateString(),
    };

    const guestbookRef = ref(realtimeDb, 'guestbook');
    void push(guestbookRef, guestbookMessage);
    alert('메시지를 보냈습니다. 💌');
    setName('');
    setMessage('');
    setShowForm(false);
  };

  return (
    <Wrapper>
      {messages.slice(0, visibleCount).map((msg) => (
        <MessageBox key={msg.id}>
          <Sender>{msg.sender}</Sender>
          <Content>{msg.message}</Content>
        </MessageBox>
      ))}

      {visibleCount < messages.length && (
        <MoreButton onClick={() => setVisibleCount((prev) => prev + 4)}>
          더보기
        </MoreButton>
      )}

      {!showForm && (
        <WriteButton onClick={() => setShowForm(true)}>작성하기</WriteButton>
      )}

      {showForm && (
        <Form onSubmit={handleSubmit}>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름"
          />
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지"
          />
          <Submit type="submit">보내기</Submit>
        </Form>
      )}
    </Wrapper>
  );
};

export default CommentForm;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MessageBox = styled.div`
  background: #fafafa;
  padding: 12px;
  border-radius: 10px;
  font-family: 'SUITE-Regular';
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

const Sender = styled.div`
  font-weight: bold;
  margin-bottom: 6px;
`;

const Content = styled.div`
  font-size: 15px;
`;

const MoreButton = styled.button`
  align-self: center;
  padding: 8px 16px;
  background: #eee;
  border: none;
  border-radius: 20px;
  cursor: pointer;
`;

const WriteButton = styled(MoreButton)`
  background: #c5a9a0;
  color: white;
  font-weight: bold;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  resize: none;
  height: 80px;
  font-family: inherit;
`;

const Submit = styled.button`
  padding: 10px;
  background: #a47660;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
`;
