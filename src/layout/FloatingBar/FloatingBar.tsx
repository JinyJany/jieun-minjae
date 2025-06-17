import { useEffect } from 'react';
import styled from '@emotion/styled';
import data from 'data.json';
import JSConfetti from 'js-confetti';

import Heart from '@/assets/icons/heart_plus.svg?react';
import Share from '@/assets/icons/share.svg?react';
import Upward from '@/assets/icons/upward.svg?react';
import Button from '@/components/Button.tsx';

// ✅ 카카오 window 타입 선언
declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendCustom: (params: {
          templateId: number;
          templateArgs?: Record<string, string>;
        }) => void;
      };
    };
  }
}

const FloatingBar = ({ isVisible }: { isVisible: boolean }) => {
  const { emojis } = data;

  const jsConfetti = new JSConfetti();

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init('00d19e6740522363021e52adc3617542');  // ✅ 너의 JavaScript 키
    }
  }, []);

  const handleCount = () => {
    void jsConfetti.addConfetti({ emojis });
  };

  // ✅ 기존 handleCopy → 카카오톡 공유로 변경
  const handleShare = () => {
    window.Kakao.Share.sendCustom({
      templateId: 121279,  // ✅ 너의 템플릿 ID
      templateArgs: {
        REGI_WEB_DOMAIN: 'https://mobile-wedding-invitation-swart.vercel.app',
        A_N: '서일',
        A_E: '도연',
      },
    });
  };

  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Nav isVisible={isVisible}>
      <Button onClick={handleCount}>
        <Heart fill="#e88ca6" />
      </Button>
      <Button onClick={handleShare}>
        <Share fill="#e88ca6" />
        공유
      </Button>
      <Button onClick={handleScroll}>
        <Upward fill="#e88ca6" />
        위로
      </Button>
    </Nav>
  );
};

export default FloatingBar;

const Nav = styled.nav<{ isVisible: boolean }>`
  min-width: 280px;
  position: fixed;
  bottom: 30px;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  gap: 5px;
  display: ${(props) => (props.isVisible ? 'flex' : 'none')};
`;
