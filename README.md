# 📱 Mobile Wedding Invitation

모바일 기반의 청첩장 웹 애플리케이션 프로젝트  
> **개발기간:** 개인 프로젝트 (지속 업데이트 중)

---

## 📖 프로젝트 개요

이 프로젝트는 모바일 환경에 최적화된 **온라인 청첩장 웹 서비스**입니다.  
링크를 통해 손쉽게 청첩장 열람, 하객 방명록 작성, 결혼식장 위치 확인 및 공유가 가능합니다.  
Kakao API, Naver Map API 등 다양한 외부 API와 연동하여 풍부한 사용자 경험을 제공합니다.

---

## 🚀 주요 기능

- 📱 **모바일 최적화** : React + Vite 기반 반응형 청첩장 웹 페이지
- 📝 **하객 방명록 시스템** : Firebase Realtime Database 기반 실시간 방명록
- 🔗 **SNS 공유 기능** : KakaoTalk 공유 연동 (Kakao JavaScript SDK 활용)
- 📍 **결혼식장 위치 안내** : Naver Map API 연동 (위치, 확대/축소 지원)
- ⚙️ **간편 데이터 관리** : invitation.json 기반 데이터 관리 및 수정 용이
- 🖥️ **관리자 기능** : 추후 관리자 페이지 개발 예정

---

## 🛠️ 기술 스택

| 구분 | 사용 기술 |
| :--- | :--- |
| **Frontend** | React, TypeScript, Vite |
| **Backend** | Firebase (Realtime Database, Hosting) |
| **API 연동** | Kakao Share API, Naver Map API |
| **Styling** | Emotion, Styled Components |
| **Version Control** | Git, GitHub |

---

## 🖥️ 시스템 아키텍처

```bash
[ React + Vite ]
        ↓
[ Firebase Hosting ]
        ↓
[ Firebase Realtime Database ]
        ↓
[ Naver Map API, Kakao Share API ]


✨ 프로젝트 회고
React + Vite 실전 프로젝트 경험 확보

Firebase Realtime Database를 통한 NoSQL 데이터 구조 설계 경험

외부 API(Kakao, Naver) 연동 실습 및 디버깅 경험

TypeScript 기반 컴포넌트 아키텍처 설계 능력 향상
