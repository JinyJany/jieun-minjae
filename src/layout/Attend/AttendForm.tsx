import { useState } from 'react';
import styled from '@emotion/styled';
import { push, ref } from 'firebase/database';
import AttendStats from './AttendStats'; // 경로 조정 필요 시 수정
import { realtimeDb } from '../../firebase';

const AttendForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState<'신랑 측' | '신부 측'>('신랑 측');
  const [name, setName] = useState('');
  const [count, setCount] = useState<number | ''>('');
  const [companion, setCompanion] = useState('');
  const [meal, setMeal] = useState<'예정' | '안함' | '미정'>('예정');
  const [showStats, setShowStats] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !count) {
      alert('이름과 참석 인원을 입력해주세요.');
      return;
    }

    const newRsvp = {
      type,
      name,
      count,
      companion,
      meal,
      timestamp: Date.now(),
    };

    await push(ref(realtimeDb, 'rsvp'), newRsvp);
    alert('참석 정보가 저장되었습니다.');
    resetForm();
  };

  const resetForm = () => {
    setType('신랑 측');
    setName('');
    setCount('');
    setCompanion('');
    setMeal('예정');
    setShowForm(false);
  };

  return (
    <>
      {!showForm ? (
        <>
          <RsvpBox>
            <Message>
              축하의 마음으로 참석해주시는<br />
              모든 분들을 귀하게 모실 수 있도록<br />
              참석 의사를 전달 부탁드립니다.
            </Message>
            <SubmitBtn onClick={() => setShowForm(true)}>✓ 참석 의사 전달하기</SubmitBtn>
          </RsvpBox>

          <StatsToggleWrapper>
            <StatsToggle onClick={() => setShowStats(prev => !prev)}>
              {showStats ? '닫기' : '통계보기'}
            </StatsToggle>
          </StatsToggleWrapper>

          {showStats && <AttendStats />}
        </>
      ) : (
        <FormWrap onSubmit={(e) => void handleSubmit(e)}>
          <TitleRow>
            <FormTitle>참석 의사 작성</FormTitle>
            <CloseBtn type="button" onClick={resetForm}>✕</CloseBtn>
          </TitleRow>

          <Field>
            <label>구분</label>
            <ToggleBox>
              <ToggleBtn active={type === '신랑 측'} onClick={() => setType('신랑 측')}>신랑측</ToggleBtn>
              <ToggleBtn active={type === '신부 측'} onClick={() => setType('신부 측')}>신부측</ToggleBtn>
            </ToggleBox>
          </Field>

          <Field>
            <label>성함</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름 입력" />
          </Field>

          <Field>
            <label>참석인원</label>
            <input
              type="number"
              value={count}
              min={1}
              onChange={(e) => setCount(e.target.value ? Number(e.target.value) : '')}
              placeholder="본인 포함 총 참석인원"
            />
          </Field>


          <Field>
            <label>식사여부</label>
            <ToggleBox>
              <ToggleBtn active={meal === '예정'} onClick={() => setMeal('예정')}>예정</ToggleBtn>
              <ToggleBtn active={meal === '안함'} onClick={() => setMeal('안함')}>안함</ToggleBtn>
              <ToggleBtn active={meal === '미정'} onClick={() => setMeal('미정')}>미정</ToggleBtn>
            </ToggleBox>
          </Field>

          <SubmitBtn type="submit">참석 의사 전달하기</SubmitBtn>
        </FormWrap>
      )}
    </>
  );
};

export default AttendForm;

const RsvpBox = styled.div`
  padding: 24px;
  border: 2px solid #f2f2f2;
  border-radius: 16px;
  text-align: center;
  width: 80%;
  max-width: 480px;
  margin: 0 auto;
`;

const Message = styled.p`
  color: #444;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 16px;
`;

const SubmitBtn = styled.button`
  border: 1px solid #ccc;
  border-radius: 999px;
  padding: 8px 24px;
  background: #fff;
  font-weight: 500;
  cursor: pointer;
`;

const StatsToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const StatsToggle = styled.button`
  background: #f9f8f6;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  color: #333;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(37, 9, 9, 0.05);
  transition: background 0.2s;
  &:hover {
    background: #ececec;
  }
`;

const FormWrap = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  background: #fff;
  border-radius: 12px;
  width: 80%;
  max-width: 480px;
  box-shadow: 0 0 12px rgba(0,0,0,0.05);
  margin: 0 auto;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FormTitle = styled.h2`
  font-size: 1.1rem;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-weight: 600;
    font-size: 0.9rem;
  }

  input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 6px;
  }
`;

const ToggleBox = styled.div`
  display: flex;
  gap: 8px;
`;

const ToggleBtn = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: ${({ active }) => (active ? '#c8d8ff' : '#f2f2f2')};
  color: ${({ active }) => (active ? '#000' : '#666')};
  font-weight: ${({ active }) => (active ? 600 : 400)};
  cursor: pointer;
`;
