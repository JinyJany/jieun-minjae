import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { onValue, ref } from 'firebase/database';
import { realtimeDb } from '../../firebase';

interface RsvpEntry {
  type: string;
  name: string;
  count: number;
  meal: string;
  timestamp: number;
}

const AttendStats = () => {
  const [data, setData] = useState<RsvpEntry[]>([]);

  useEffect(() => {
    const rsvpRef = ref(realtimeDb, 'rsvp');
    onValue(rsvpRef, (snapshot) => {
      const raw = snapshot.val() as Record<string, RsvpEntry> | null;
      if (!raw) return;

      const entries = Object.values(raw);
      setData(entries);
    });
  }, []);

  const groomCount = data.filter((d) => d.type === '신랑 측').reduce((sum, d) => sum + d.count, 0);
  const brideCount = data.filter((d) => d.type === '신부 측').reduce((sum, d) => sum + d.count, 0);
  const mealYes = data.filter((d) => d.meal === '식사 예정').length;
  const mealNo = data.filter((d) => d.meal === '식사 안함').length;

  return (
    <StatsWrap>
      <StatItem>신랑 측 참석: {groomCount}명</StatItem>
      <StatItem>신부 측 참석: {brideCount}명</StatItem>
      <StatItem>식사 예정: {mealYes}명</StatItem>
      <StatItem>식사 안함: {mealNo}명</StatItem>
      <StatItem>총 응답자 수: {data.length}명</StatItem>
    </StatsWrap>
  );
};

export default AttendStats;

const StatsWrap = styled.div`
  padding: 16px;
  background: #f0f0f0;
  border-radius: 12px;
  margin: 20px auto;
  max-width: 400px;
`;

const StatItem = styled.div`
  font-size: 0.95rem;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
`;
