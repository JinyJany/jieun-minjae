import styled from '@emotion/styled';
import data from 'data.json';
import mainImg from '@/assets/images/05.jpg';

const Main = () => {
  const { greeting } = data;

  return (
    <Container>
      <TopText>
        <TopLine>THE WEDDING OF</TopLine>
       <NameLine>
        박서일  <And>  그리고  </And>  김도연
      </NameLine>
      </TopText>

      <MainImg src={mainImg} alt="main wedding" />

      <WeAreMarried>{"We’re getting married!"}</WeAreMarried>

      <SubTitle>{greeting.eventDetail}</SubTitle>
    </Container>
  );
};

export default Main;

// ================= styled components =================

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px; // 텍스트를 이미지 쪽으로 더 끌어올림
`;

const TopText = styled.div`
  text-align: center;
  margin-top: 0px;
  margin-bottom: 8px; // 이미지와의 간격 최소화
`;

const TopLine = styled.div`
  font-family: 'Noto Serif KR', serif;
  font-size: 1.05rem;          // 글씨 크기 살짝 키움
  font-weight: 400;
  letter-spacing: 0.18em;
  color: #999;
`;

const NameLine = styled.div`
  font-family: 'Noto Serif KR', serif;
  font-size: 1.1rem;
  font-weight: 700;           // ← 이름을 더 굵게
  letter-spacing: 0.1em;
  color: #444;
  margin-top: 10px;           // ← THE WEDDING OF 와 간격 증가
`;

const And = styled.span`
  font-size: 0.9rem;
  position: relative;
  top: -2px; // 살짝 위로 띄움
`;

const MainImg = styled.img`
  width: 90%;
  max-width: 450px;
  border-radius: 200px 200px 0 0;
  display: block;
  margin-top: 30px; // ← 여백 추가로 이미지가 아래로 내려감
`;

const WeAreMarried = styled.p`
  font-family: 'Great Vibes', cursive;
  font-size: 2.6rem;
  color: #9a7b6d;
  margin: 28px 0 8px 0;
  text-align: center;
`;


const SubTitle = styled.p`
  font-size: 1.1rem;
  color: #2F2120;
  line-height: 140%;
  white-space: pre-line;
  font-family: 'Noto Serif KR', serif;
`;
