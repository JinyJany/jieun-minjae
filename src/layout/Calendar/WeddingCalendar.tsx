import { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import dayjs from 'dayjs';

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
    <CalendarContainer>
      <WeddingInfo>
        <DateText>2026.03.01</DateText>
        <TimeText>일요일 오후 1시 40분</TimeText>
      </WeddingInfo>

      <CalendarBox>
        <Weekdays>
          {['일', '월', '화', '수', '목', '금', '토'].map(day => (
            <Weekday key={day}>{day}</Weekday>
          ))}
        </Weekdays>
        <Dates>{renderCalendar()}</Dates>
      </CalendarBox>

      <CountdownBox>
        <CountItem data-label="DAYS">{diff.days}</CountItem>
        <CountItem data-label="HOUR">{diff.hours}</CountItem>
        <CountItem data-label="MIN">{diff.minutes}</CountItem>
        <CountItem data-label="SEC">{diff.seconds}</CountItem>
      </CountdownBox>

      <FooterText>
        서일 ❤️ 도연의 결혼식이 <RedText>{diff.days}</RedText>일 남았습니다.
      </FooterText>
    </CalendarContainer>
  );
};

export default WeddingCalendar;
const CalendarContainer = styled.div`
  text-align: center;
  padding: 20px;
  font-family: 'Noto Serif KR', serif;
`;

const WeddingInfo = styled.div`
  margin-bottom: 20px;
`;

const DateText = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

const TimeText = styled.p`
  color: #666;
  font-size: 16px;
`;

const CalendarBox = styled.div`
  width: 280px;
  margin: 0 auto 20px;
`;

const Weekdays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  font-weight: bold;
  margin-bottom: 10px;
`;

const Weekday = styled.div`
  text-align: center;
  color: #aaa;
`;

const Dates = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
`;

const DateCell = styled.div<{ active?: boolean }>`
  width: 36px;
  height: 36px;
  line-height: 36px;
  border-radius: 50%;
  background: ${({ active }) => (active ? '#f0f0f0' : 'transparent')};
  color: ${({ active }) => (active ? '#d35400' : '#555')};
  text-align: center;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
`;

const CountdownBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin: 28px 0 16px;
  flex-wrap: nowrap; /* ✅ 줄바꿈 방지 */
  overflow-x: auto;  /* ✅ 혹시 너무 좁으면 스크롤 생기게 */
`;

const CountItem = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  background: #fff4f4;
  padding: 10px;
  border-radius: 10px;
  min-width: 55px; /* ✅ 기존 70px → 55px */
  font-family: 'Noto Serif KR', serif;
  font-weight: 600;
  font-size: 16px;
  color: #1a1a1a;
  text-transform: uppercase;

  &::before {
    content: attr(data-label);
    font-size: 10px;
    margin-bottom: 4px;
    color: #888;
  }
`;


const FooterText = styled.p`
  color: #333;
  font-size: 14px;
  margin-top: 10px;
`;

const RedText = styled.span`
  color: #e63946;
  font-weight: bold;
`;



