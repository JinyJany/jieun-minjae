// src/layout/Guestbook/CommentForm.tsx
import { useEffect, useState } from 'react';
import { onValue, push, ref } from 'firebase/database';
import { realtimeDb } from '../../firebase'; // 경로를 '@/firebase'로 사용하려면 tsconfig에 path alias 설정 필요

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
      date: new Date().toLocaleString(),
    };

    const guestbookRef = ref(realtimeDb, 'guestbook');
    void push(guestbookRef, guestbookMessage);
    alert('메시지를 보냈습니다. 💌');
    setName('');
    setMessage('');
    console.log("보낼 메시지:", guestbookMessage);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름"
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지"
          style={{ width: '100%', height: '80px', padding: '8px' }}
        />
        <button type="submit" style={{ marginTop: '10px', padding: '8px 16px' }}>
          작성하기
        </button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
        {messages.map((msg) => (
          <li
            key={msg.id}
            style={{
              background: '#f9f9f9',
              marginBottom: '12px',
              padding: '10px',
              borderRadius: '8px',
            }}
          >
            <strong>{msg.sender}</strong>{' '}
            <span style={{ fontSize: '0.8rem', color: '#888' }}>({msg.date})</span>
            <p style={{ marginTop: '4px' }}>{msg.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentForm;
