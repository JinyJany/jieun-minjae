import { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import dayjs from 'dayjs';

// 날짜 타입 명시
interface TimeDiff {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const WeddingCalendar = () => {
  const weddingDate = dayjs('2026-03-01T13:40:00');

  const calculateDiff = useCallback((): TimeDiff => {
    const now = dayjs();
    const diffInSeconds = weddingDate.diff(now, 'second');
    const days = Math.floor(diffInSeconds / (60 * 60 * 24));
    const hours = Math.floor((diffInSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((diffInSeconds % (60 * 60)) / 60);
    const seconds = diffInSeconds % 60;
    return { days, hours, minutes, seconds };
  }, [weddingDate]);

  const [diff, setDiff] = useState<TimeDiff>(calculateDiff());

  useEffect(() => {
    const timer = setInterval(() => {
      setDiff(calculateDiff());
    }, 1000);
    return () => clearInterval(timer);
  }, [calculateDiff]);

  const renderCalendar = () => {
    const daysInMonth = weddingDate.daysInMonth();
    const firstDay = weddingDate.startOf('month').day();
    const dates = [];

    // 빈 칸 생성
    for (let i = 0; i < firstDay; i++) {
      dates.push(<DateCell key={`empty-${i}`} />);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const isWeddingDay = i === weddingDate.date();
      dates.push(<DateCell key={i} active={isWeddingDay}>{i}</DateCell>);
    }

    return dates;
  };

  return (
    <Container>
      <Header>
        <WeddingDate>2026.03.01</WeddingDate>
        <WeddingTime>일요일 오후 1시 40분</WeddingTime>
      </Header>

      <Calendar>
        <WeekHeader>
          <span>일</span><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span>
        </WeekHeader>
        <DateGrid>
          {renderCalendar()}
        </DateGrid>
      </Calendar>

      <Countdown>
        <CountItem>{diff.days}일</CountItem>
        <CountItem>{diff.hours}시간</CountItem>
        <CountItem>{diff.minutes}분</CountItem>
        <CountItem>{diff.seconds}초</CountItem>
      </Countdown>

      <DDayText>서일 ❤️ 도연의 결혼식이 {diff.days}일 남았습니다.</DDayText>
    </Container>
  );
};

export default WeddingCalendar;


// styled-components
const Container = styled.div`text-align: center;padding: 20px;`;
const Header = styled.div`margin-bottom: 20px;`;
const WeddingDate = styled.h2`font-size: 24px; font-weight: bold;`;
const WeddingTime = styled.p`color: #777;`;

const Calendar = styled.div`margin: 20px auto; width: 280px;`;
const WeekHeader = styled.div`display: flex; justify-content: space-between; font-weight: bold; margin-bottom: 10px;`;
const DateGrid = styled.div`display: flex; flex-wrap: wrap; gap: 8px;`;

const DateCell = styled.div<{ active?: boolean }>`
  width: 30px; height: 30px; line-height: 30px; border-radius: 50%;
  background: ${({ active }) => (active ? '#eee' : 'transparent')};
  color: ${({ active }) => (active ? '#555' : '#333')};
  text-align: center;
`;

const Countdown = styled.div`display: flex; justify-content: center; gap: 10px; margin: 20px 0;`;
const CountItem = styled.div`background: #fafafa; padding: 10px; border-radius: 10px; font-weight: bold; min-width: 60px;`;
const DDayText = styled.p`color: #777; margin-top: 10px;`;
