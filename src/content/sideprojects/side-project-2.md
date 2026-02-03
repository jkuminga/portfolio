---
title: 실시간 협업 화이트보드
summary: WebRTC를 활용한 실시간 드로잉 및 협업 툴
role: 개인 프로젝트 (Backend & DevOps)
stack: [Node.js, Socket.io, WebRTC, Redis, AWS]
period: 2024
links:
  demo: "https://board-demo.example.com"
  github: "https://github.com/jkuminga/realtime-board"
thumbnail: https://images.unsplash.com/photo-1544391496-1ca7c974b749?q=80&w=1000&auto=format&fit=crop
---

## 한 줄 소개
여러 사용자가 동시에 접속하여 하나의 캔버스에 그림을 그리고 의견을 나눌 수 있는 실시간 협업 화이트보드입니다.

## 주요 기능
- Socket.io를 활용한 실시간 좌표 동기화
- 레이어 기반 드로잉 시스템 (펜, 도형, 텍스트)
- 파일 공유 및 채팅 기능
- 세션 영속성을 위한 Redis 캐싱 적용

## 기술적 도전
- 대규모 접속 시 메시지 브로드캐스팅 최적화
- 캔버스 렌더링 성능 향상을 위한 알고리즘 개선
