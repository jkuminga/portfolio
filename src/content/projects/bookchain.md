---
title: BookChain
summary: 블록체인 기반 중고 전공책 거래 앱 서비스
role: 프론트앤드 · 통합
stack: [Flutter, Firebase]
period: 2025.05 - 2025.06
priority: 4
links:
  demo: ""
  github: "https://github.com/jkuminga/Bookchain_FE"
  presentation: "https://www.canva.com/design/DAGpk7epC4Q/MaBOHwRDoJjeeKcTX9Iuyw/edit"
thumbnail: /assets/projects/bookchain/cover.png
---

## 한 줄 소개
블록체인과 스마트 컨트랙트를 활용한 블록체인 기반 중고 전공책 거래 앱 서비스

## 내가 맡은 역할
- 프론트엔드 구조를 설계하고 구현하였습니다.
- Web3Auth 기반 로그인 및 지갑 연동 기능을 구현하였습니다.
- Google Search API 기반 도서 검색 기능을 구현하였습니다.

## 트러블 슈팅 
### 트러블 슈팅 1
- 문제 : 사용자의 지갑 생성 경험 개선을 위해 간편 지갑 생성 도구인 Web3Auth를 도입하였으나, Web3Auth가 브라우저 환경에 대한 지원이 제한적이고 호환성이 낮아 웹 환경에서는 안정적인 구현이 어려웠습니다.
- 해결 : Web3Auth를 안정적으로 사용할 수 있는 모바일 환경으로 전환하기 위해 Flutter를 새롭게 학습했으며, 기존 React 웹 구조 대신 모바일 앱 형태로 프론트엔드를 구현했습니다.
- 결과 : 모바일 앱 환경에서 사용자가 복잡한 인증 절차 없이 간편하게 지갑을 생성하고 서비스를 이용할 수 있는 구조를 확보했습니다.

## 핵심 기능
- 도서 탐색 및 검색 기능 제공
- 도서 거래 내역 및 거래 상태 확인
- 실시간 채팅 기반 거래 진행
- 에스크로 거래 시스템을 통한 안전한 거래 지원
- 연동된 지갑을 통한 자동 코인 거래 및 NFT 전송 지원


## 이미지
![](/assets/projects/bookchain/ui-1.png)
![](/assets/projects/bookchain/ui-2.png)
![](/assets/projects/bookchain/ui-3.png)
