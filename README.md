📊 Mobile Wedding Invitation
<p align="center"> <b>모바일 기반의 청첩장 서비스 개발 프로젝트</b><br> 개발기간: 개인 프로젝트 (지속 업데이트 중) </p>
📖 프로젝트 개요
모바일 환경에 최적화된 청첩장 웹 애플리케이션을 개발하여 사용자가 청첩장 링크를 통해 손쉽게 결혼식 정보를 확인하고, 하객들의 메시지까지 수집할 수 있는 시스템입니다. 반응형 웹, 지도 API 연동, 방명록 기능, 카카오톡 공유 기능 등을 포함하고 있습니다.

🎯 문제 해결 목표
기존 오프라인 청첩장의 불편함 해소 → 모바일 기반으로 쉽게 접근 가능하도록 개발

하객 관리, 방명록, 지도 링크 제공 등 실용적 기능 구현

Kakao API, Naver Map API 등 외부 서비스 연동 실습

🛠️ 기술 스택
분야	기술
Frontend	React, TypeScript, Vite
Backend	Firebase (Realtime Database, Hosting)
API 연동	Kakao Share API, Naver Map API
Styling	Emotion, Styled Components
Version Control	Git, GitHub

🚀 상세 기능
✅ 모바일 청첩장 페이지 구현
React + Vite 기반 프로젝트 구성

반응형 웹으로 모든 기기에서 최적화

✅ 하객 방명록 시스템
Firebase Realtime Database 기반 방명록 저장

실시간 데이터 동기화 및 출력 구현

✅ KakaoTalk 공유 기능
Kakao JavaScript SDK 연동

청첩장 URL을 카카오톡으로 간편 공유 가능

✅ Naver Map API 연동
결혼식장 위치를 Naver Map으로 제공

커스텀 마커 및 확대 축소 기능 구현

✅ 관리자 환경 설정 (간이 데이터 구조)
invitation.json 파일 기반 데이터 분리

손쉬운 청첩장 내용 수정 가능

🖥️ 시스템 아키텍처
bash
복사
편집
[React+Vite] → [Firebase Hosting]
                  ↓
           [Firebase Realtime DB]
                  ↓
        [Naver Map API, Kakao API]
⚙️ 성능 개선 및 최적화
Vite 기반 빠른 번들링

Firebase Hosting 활용한 배포 간소화

Firebase Realtime DB로 실시간 데이터 반영

🧪 테스트 및 검증
실제 모바일/PC 환경에서 반응형 테스트 수행

카카오톡, 네이버맵 API 연동 테스트 완료

🔧 차후 개선 방향
관리용 어드민 페이지 추가 개발

초대장 사용자별 URL 구분 기능 개발

하객 RSVP 관리 기능 추가

CI/CD 자동 배포 적용

✨ 프로젝트 회고
React + Vite 기반 실전 프로젝트 경험 확보

Firebase Realtime DB 실습을 통해 NoSQL 데이터 구조 경험

외부 API(Kakao, Naver)의 실제 연동 실습 및 디버깅 능력 향상

Typescript 기반 컴포넌트 아키텍처 설계 역량 향상


📂 실행 방법
bash
복사
편집
# 프로젝트 클론
git clone https://github.com/parkseoill/mobile-wedding-invitation.git
cd mobile-wedding-invitation

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# .env 파일에 API KEY 설정 필요 (Kakao, Naver Map)
