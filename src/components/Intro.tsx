// src/components/Intro.tsx
import styled from '@emotion/styled';
import introImage from '@/assets/images/intro.jpg'; // 이미지 경로에 맞게 수정하세요

const Intro = () => {
  return (
    <Wrapper>
      <Image />
    </Wrapper>
  );
};

export default Intro;

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  background: #fff;
  z-index: 9999;
  animation: fadeOut 2s ease-in-out 2s forwards;

  @keyframes fadeOut {
    to {
      opacity: 0;
      visibility: hidden;
    }
  }
`;

const Image = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${introImage});
  background-size: cover;
  background-position: center;
`;
