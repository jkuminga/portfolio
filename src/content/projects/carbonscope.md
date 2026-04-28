---
title: CarbonScope
summary: 전 세계 자발적 탄소 시장 프로젝트를 통합해 한 곳에서 조회 · 비교할 수 있도록 만든 데이터 중심 서비스
role: 백앤드 · 데이터 모델링 · 통합 · 배포
stack: [Node.js, Express, MySQL, AWS, Docker, Nginx]
period: 2025.09 - 2025.12
priority: 2
links:
  demo: ""
  github: "https://github.com/jkuminga/CarbonScope_Deploy"
  presentation: "https://www.canva.com/design/DAG5lcBD0eg/_pzKqtmT_ZZFt8GmUUjtUw/edit"
thumbnail: /assets/projects/carbonscope/cover.png
---

## 한 줄 소개
전 세계 자발적 탄소 시장에 분산된 프로젝트 및 크레딧 데이터를 수집·정규화하여, 하나의 대시보드에서 통합 조회·비교할 수 있도록 만든 데이터 기반 웹 서비스

## 내가 맡은 역할
- 백엔드 API를 설계하고 구현했습니다.
- 데이터베이스를 모델링하고 정규화를 진행했습니다.
- Google OAuth API를 활용한 로그인 로직과 Redis 기반 세션 관리를 구현했습니다.
- 내부 데이터 업데이트를 위한 Cron 로직을 설계하고 구현했습니다.
- 배포 환경을 설계하고 구축했습니다.

## 트러블 슈팅
### 트러블 슈팅 1
- 문제 : n8n 기반 자동화 시스템으로 사용자가 등록한 프로젝트를 외부 크래딧 레지스트리에 자동 등록 요청하는 구조로 기획했으나, 레지스트리마다 검토·승인 절차가 달라 실제 운영 방식과 맞지 않았습니다.
- 해결 : 자동 등록 구조를 폐기하고, 외부 레지스트리 관리자가 관리자 페이지에서 프로젝트를 직접 검토·승인·관리할 수 있는 구조로 서비스 방향을 전환했습니다.
- 결과 : 실제 자발적 탄소 시장의 프로젝트 등록 절차를 반영할 수 있었으며, 일반 사용자도 프로젝트를 열람하고 지지할 수 있는 참여형 서비스 구조를 구축했습니다.


## 핵심 기능
- 자발적 탄소시장 프로젝트 목록 조회 및 검색
- 새 프로젝트 등록 및 관리
- 프로젝트 상세 정보 및 동향 조회
- 프로젝트별 크래딧 및 트랜잭션 내역, 통계 조회
- 등록된 프로젝트에 대한 사용자 공감 및 코멘트
- 외부 관리자 관점에서 등록된 프로젝트 조회 및 관리 

## 이미지
![](/assets/projects/carbonscope/title.jpg)
![](/assets/projects/carbonscope/summary.png)
![](/assets/projects/carbonscope/diagram.png)
![](/assets/projects/carbonscope/deploy-structure.jpg)
![](/assets/projects/carbonscope/ui-1.png)
![](/assets/projects/carbonscope/ui-2.png)
![](/assets/projects/carbonscope/ui-3.png)
![](/assets/projects/carbonscope/ui-4.png)
