---
title: AI 가계부 서비스
summary: LLM을 활용하여 영수증 이미지를 자동으로 분석하고 지출 내역을 기록하는 가계부 앱
role: 개인 프로젝트 (Full Stack)
stack: [React Native, FastAPI, OpenAI, PostgreSQL]
period: 2025
links:
  github: "https://github.com/jkuminga/ai-ledger"
thumbnail: https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1000&auto=format&fit=crop
---

## 한 줄 소개
영수증 사진을 찍기만 하면 AI가 자동으로 날짜, 금액, 카테고리를 분류해주는 스마트 가계부 서비스입니다.

## 주요 기능
- OCR 기술을 활용한 영수증 텍스트 추출
- LLM 기반 지출 카테고리 자동 분류
- 월간 지출 분석 리포트 및 시각화 차트
- 다크 모드 및 반응형 디자인 지원

## 기술적 도전
- 서버 부하를 줄이기 위해 이미지 리사이징 라이브러리를 클라이언트 단에 적용
- 프로덕션 환경에서의 API 비용 절감을 위한 프롬프트 엔지니어링 및 캐싱 로직 구현
