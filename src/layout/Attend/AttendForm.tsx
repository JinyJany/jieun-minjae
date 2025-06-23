import { useState } from 'react';
import styled from '@emotion/styled';
import { push, ref } from 'firebase/database';
import { realtimeDb } from '../../firebase';

interface RsvpFormProps {
  onClose: () => void;
}

const AttendForm = ({ onClose }: RsvpFormProps) => {
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [count, setCount] = useState(1);
  const [meal, setMeal] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!type || !name || !meal) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    const newRsvp = {
      type,
      name,
      count,
      meal,
      timestamp: Date.now(),
    };

    await push(ref(realtimeDb, 'rsvp'), newRsvp);
    alert('참석 정보가 저장되었습니다.');
    onClose();
  };

  return (
    <FormWrap onSubmit={(e) => { void handleSubmit(e); }}>
      <Field>
        <label>구분</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">선택</option>
          <option value="신랑 측">신랑 측</option>
          <option value="신부 측">신부 측</option>
        </select>
      </Field>
      <Field>
        <label>성함</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름 입력" />
      </Field>
      <Field>
        <label>참석 인원</label>
        <input
          type="number"
          value={count}
          min={1}
          onChange={(e) => setCount(Number(e.target.value))}
        />
      </Field>
      <Field>
        <label>식사 여부</label>
        <select value={meal} onChange={(e) => setMeal(e.target.value)}>
          <option value="">선택</option>
          <option value="식사 예정">식사 예정</option>
          <option value="식사 안함">식사 안함</option>
        </select>
      </Field>
      <SubmitBtn type="submit">제출하기</SubmitBtn>
      <CancelBtn type="button" onClick={onClose}>닫기</CancelBtn>
    </FormWrap>
  );
};

export default AttendForm;

const FormWrap = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: #f9f8f6;
  border-radius: 12px;
  max-width: 400px;
  margin: 0 auto;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  label {
    font-weight: bold;
    font-size: 0.9rem;
  }

  input, select {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 6px;
  }
`;

const SubmitBtn = styled.button`
  background: #333;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const CancelBtn = styled.button`
  background: #aaa;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;
