import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { onValue, ref } from 'firebase/database';
import { realtimeDb } from '../../firebase';

interface RsvpData {
  type: '신랑 측' | '신부 측';
  name: string;
  count: number;
  companion: string;
  meal: '예정' | '안함' | '미정';
  timestamp: number;
}

const AttendStats = () => {
  const [mealStats, setMealStats] = useState({ 예정: 0, 안함: 0, 미정: 0 });
  const [sideStats, setSideStats] = useState({ '신랑 측': 0, '신부 측': 0 });

  useEffect(() => {
    const rsvpRef = ref(realtimeDb, 'rsvp');
    const unsubscribe = onValue(rsvpRef, (snapshot) => {
      const value = snapshot.val() as Record<string, RsvpData> | null;

      if (value) {
        const mealCount = { 예정: 0, 안함: 0, 미정: 0 };
        const sideCount = { '신랑 측': 0, '신부 측': 0 };

        Object.values(value).forEach((entry) => {
          const { meal, count, type } = entry;

          if (meal in mealCount) {
            mealCount[meal] += count;
          }
          if (type in sideCount) {
            sideCount[type] += count;
          }
        });

        setMealStats(mealCount);
        setSideStats(sideCount);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <StatsWrap>
      <StatBlock>
        <h3> 식사 여부</h3>
        <p>예정: {mealStats.예정}명</p>
        <p>안함: {mealStats.안함}명</p>
        <p>미정: {mealStats.미정}명</p>
      </StatBlock>
      <StatBlock>
        <h3> 참석 구분</h3>
        <p>신랑 측: {sideStats['신랑 측']}명</p>
        <p>신부 측: {sideStats['신부 측']}명</p>
      </StatBlock>
    </StatsWrap>
  );
};

export default AttendStats;

const StatsWrap = styled.div`
  margin-top: 32px;
  padding: 24px;
  border-radius: 12px;
  background:rgb(255, 255, 255);
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;

const StatBlock = styled.div`
  margin-bottom: 16px;

  h3 {
    font-size: 1.1rem;
    margin-bottom: 8px;
    
  }

  p {
    margin: 2px 0;
    font-size: 0.95rem;
    font-family: 'SUITE-Regular', 'Noto Serif KR', serif;
    
  }
`;
