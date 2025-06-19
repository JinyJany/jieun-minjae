import styled from '@emotion/styled';

const Container = styled.div`
  border: 30px solid transparent;
  border-image-source: url('/background.png');
  border-image-slice: 30% 49%;
  border-image-width: 280px;
  background-color: #ffffff;

  width: 85vw;
  margin: 0 auto;

  /* ✅ 모바일 화면 높이 100% 사용 */
  min-height: 100dvh;

  /* ✅ 가로 스크롤 방지 */
  overflow-x: hidden;

  /* ✅ 폰트와 중앙 정렬 */
  font-family: 'Noto Serif KR', serif;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (min-width: 500px) {
    width: 500px;
  }
`;

export default Container;
