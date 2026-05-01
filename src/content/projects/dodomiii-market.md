---
title: "DODOMIII MARKET"
summary: "뜨개 및 핸드메이드 상품 판매를 위한 웹 스토어"
role: "Full Stack"
stack: ["React", "TypeScript", "NestJS", "Prisma", "Supabase Postgres", "Redis", "Jest"]
period: "2026.02 - 2026.04"
priority: 1
links:
  demo: ""
  github: "https://github.com/jkuminga/dodomiii-market"
  presentation: ""
thumbnail: /assets/projects/dodomiii-market/cover.jpg
---

## 한 줄 소개
DODOMIII MARKET은 뜨개 상품 판매자가 상품 등록부터 주문 접수, 무통장 입금 확인, 배송 상태 관리, 고객 알림까지 한 흐름으로 운영할 수 있도록 만든 웹 스토어 서비스입니다.

## 내가 맡은 역할
- Codex와 OMX를 활용해 요구사항 정리, 설계, 구현, 테스트를 진행했습니다.
- React, Vite, TypeScript 기반으로 스토어 및 관리자 페이지를 구현하였습니다.
- NestJS, Prisma, Supabase Postgres 기반으로 상품, 주문, 입금, 배송, 관리자 인증 API를 설계하고 구현했습니다.
- 주문 상태 전이, 가격 계산, 입금 요청, 커스텀 주문 링크 등 핵심 도메인 로직을 구현하고 테스트를 작성했습니다.
* 세션 기반 관리자 인증 기능을 구현하고, Redis를 세션 저장소로 활용해 로그인 상태를 관리했습니다.
- Jest 기반 단위 테스트 및 통합 테스트를 설계하고 진행하였습니다.
- API 명세, DB 설계 문서, 구현 체크리스트, 테스트 체크리스트를 관리하며 개발 진행 상황을 문서화했습니다.

## 트러블 슈팅
### 트러블 슈팅 1
- 문제 : Supabase 무료 플랜의 유휴 상태로 인해 장시간 요청이 없다가 재접속할 경우, 응답 속도가 기존 대비 약 5배 느린 4000~5000ms 수준까지 증가하는 것을 테스트를 통해 확인했습니다.
- 해결 : GitHub Actions를 활용해 10분마다 자동으로 DB에 요청을 보내는 Warm-up 로직을 구성했습니다.
- 결과: 10회 테스트 기준 Warm-up 로직 적용 전 평균 5.1364ms에서 적용 후 0.4688ms까지 개선되어 약 11배의 응답 속도 향상을 확인했습니다.


## 핵심 기능
- 상품 관련 : 상품 목록, 상품 상세보기, 카테고리별 상품 출력, 검색 등 
- 주문 및 결제 : 장바구니 및 즉시 주문을 통한 주문 및 결제
- 주문 조회 : 주문번호 기반 배송 및 주문 상태 조회
- 관리자 기능 : 상품, 카테고리, 주문, 배송 상태 관리, 홈 팝업 관리, 홈 테마 및 히어로 이미지 관리
- 알림 기능 : 주문 관련 변경사항 발생 시 구매자/관리자에게 SMS로 알림 기능

## 이미지
![](/assets/projects/dodomiii-market/ui-1.png)
![](/assets/projects/dodomiii-market/ui-2.png)
![](/assets/projects/dodomiii-market/ui-3.png)
