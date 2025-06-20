import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import introImage from '@/assets/images/intro.jpg';

const Intro = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3000); // ⏱ 더 길게 유지
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <IntroWrapper>
      <IntroImage src={introImage} alt="intro" />
    </IntroWrapper>
  );
};

export default Intro;


const IntroWrapper = styled.div`
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

  animation: fadeZoomInOut 3s ease-in-out forwards;

  @media screen and (min-width: 500px) {
    display: none;
  }
  @keyframes fadeZoomInOut {
      0% {
        opacity: 0;
        transform: scale(1.05);
      }
      20% {
        opacity: 1;
        transform: scale(1);
      }
      85% {
        opacity: 1;
        transform: scale(1);
      }
      100% {
        opacity: 0;
        transform: scale(0.98);
      }
    }
  `;


const IntroImage = styled.img`
  width: 100vw;
  height: 100vh;
  object-fit: contain;
  background-color: white;
`;
