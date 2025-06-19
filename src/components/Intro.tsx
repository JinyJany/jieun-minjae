import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import introImage from '@/assets/images/intro.jpg'; // 이미지 경로 맞게 수정하세요

const Intro = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <IntroWrapper visible={visible}>
      <IntroImage src={introImage} alt="intro" />
    </IntroWrapper>
  );
};

export default Intro;


const IntroWrapper = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;

  opacity: ${({ visible }) => (visible ? 1 : 0)};
  pointer-events: ${({ visible }) => (visible ? 'auto' : 'none')};
  transition: opacity 1s ease-in-out;

  /* ✅ PC에서 숨김 */
  @media screen and (min-width: 500px) {
    display: none;
  }
`;

const IntroImage = styled.img`
  width: 100vw;
  height: 100vh;
  object-fit: cover;         // 화면 비율에 맞춰 이미지 꽉 채움 (비율 무시)
  background-color: white;   // 여백이 있을 경우 흰색으로 채움
`;
