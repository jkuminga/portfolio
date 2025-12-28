---
title: CarbonScope
summary: 전 세계 자발적 탄소 시장 프로젝트를 통합해 한 곳에서 조회 · 비교할 수 있도록 만든 데이터 중심 서비스
role: 백앤드 · 데이터 모델링 · 통합 · 배포
stack: [Node.js, Express, MySQL, AWS, Docker, Nginx]
period: 2025
links:
  demo: ""
  github: "https://github.com/jkuminga/CarbonScope_Deploy"
  presentation: "https://www.canva.com/design/DAG5lcBD0eg/_pzKqtmT_ZZFt8GmUUjtUw/edit"
thumbnail: /assets/projects/carbonscope/cover.png
---

## 한 줄 소개
전세계 자발적 탄소 시장에 분산된 프로젝트와 크래딧 데이털르 수집 및 정규화하여 하나의 대시보드에서 조회 비교할 수 있도록 만든 데이터 중심 웹 서비스

## 내가 맡은 역할
- 백앤드 API 설계 및 구현
- 데이터베이스 모델링 및 정규화
- 구글 OAuth API를 이용한 로그인 로직 및 Redis를 이용한 세션 관리 구현
- 내부 데이터 업데이트 Cron 로직 설계
- 배포 환경 설계 및 구현

## 트러블 슈팅
- 문제 : Carbonscope를 통한 자발적 시장 프로젝트 등록 시, n8n을 활용하여 해당 크래딧 레지스트리에 등록 요청 이메일을 자동 전송하는 방식으로 설계했으나, 해당 방식은 자발적 탄소 시장의 실제 프로젝트 등록 요건을 충족하지 못함
- 해결 : 서비스 방향을 프로젝트 자동 등록 요청 방식에서 레지스트리 관리자 검토를 지원하는 구조로 전환함. 사용자 공감 및 코멘트 기능을 추가하여 관리자들이 관심도와 반응이 높은 프로젝트를 먼저 확인할 수 있도록 설계함
- 결과 : 자발적 탄소 시장의 실제 프로젝트 등록 방식에 부합하는 서비스 구조 확립

## 핵심 기능
- 프로젝트 목록 조회 및 필터링 ( 레지스트리 / 태그 / 키워드 )
- 프로젝트 상세 정보 조회
- 사용자 공감 및 코멘트
- 관리자 관점에서 관심 프로젝트 확인 가능

## 스크린샷
![](/assets/projects/carbonscope/ui-1.png)
![](/assets/projects/carbonscope/ui-2.png)
![](/assets/projects/carbonscope/ui-3.png)
