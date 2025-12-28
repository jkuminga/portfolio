---
title: BookChain
summary: 블록체인 기반 중고 전공책 거래 앱 서비스
role: 프론트앤드 · 통합
stack: [Flutter, Firebase]
period: 2025
links:
  demo: ""
  github: "https://github.com/jkuminga/Bookchain_FE"
  presentation: "https://www.canva.com/design/DAGpk7epC4Q/MaBOHwRDoJjeeKcTX9Iuyw/edit"
thumbnail: /assets/projects/bookchain/cover.png
---

## 한 줄 소개
블록체인과 스마트 컨트랙트를 활용한 블록체인 기반 중고 전공책 거래 앱 서비스

## 내가 맡은 역할
- 프론트앤트 설계 및 구현
- Web3Auth 기반 로그인 기능 구현
- Google Search API 기반 도서 검색 기능 구현

## 트러블 슈팅 
- 문제 : 사용자 진입 장벽을 낮추기 위해 지갑 생성 및 관리 자동화 도구인 Web3Auth 도입을 검토하였으나, 웹 환경에서는 서비스 요구사항을 충족하기 어려운 제약이 존재
- 해결 : Web3Auth를 안정적으로 사용할 수 있는 환경을 위해 React 기반 웹 기반 구현 대신 Flutter 를 학습하고 모바일 앱 형태로 프론트앤드를 전환하여 구현
- 결과 : 모바일 앱 환경에서 사용자가 별도의 어려운 인증 과정 없이 지갑을 생성하고 이용할 수 있는 구조 확보

## 핵심 기능
- 도서 검색 및 필터링 ( 도서명 / 작가 / 출판사 )
- 도서 상세 정보 조회 ( 책 정보 / 거래 내역 )
- 거래 요청 및 진행


## 스크린샷
![](/assets/projects/bookchain/ui-1.png)
![](/assets/projects/bookchain/ui-2.png)
