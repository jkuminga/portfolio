---
title: Driver Sleep Detector
summary: YOLO 기반 운전자 졸음 방지 시스템
role: 백앤드 · 통합 · 배포 · 데이터 모델링 · 아두이노 개발
stack: [YOLO, Node.js, Express, MySQL, Socket.io, Arduino SDK]
period: 2025
links:
  demo: ""
  github: "https://github.com/jkuminga/driver_sleep_detector"
  presentation: "https://www.canva.com/design/DAGoPy9IbGQ/Xhr62KSjObmJoeITGRXqQA/edit"
thumbnail: /assets/projects/driver-sleep-detector/cover.png
---

## 한 줄 소개
YOLO 기반 객체 탐지를 활용하여 운전 중 운전자의 졸음상태 와 이상행동을 실시간으로 탐지하는 졸음 방지 시스템

## 내가 맡은 역할
- 백엔드 API 설계 및 구현, 백엔드 · 프론트엔드 병합
- 백엔드와 졸음 감지 시스템 간 WebSocket 통신 구조 설계 및 구현
- 졸음 방지 시스템 파이썬 로직 설계
- 아두이노 제어 로직 설계 및 구현

## 트러블 슈팅 
- 문제 : 운전자 탐지 과정에서 초당 약 4 프레임 수준으로 처리되어 실시간성이 크게 떨어지는 문제가 발생
- 해결 : 단일로 사용하던 무거운 YOLOv12 모델을 이상 행동 탐지 모델과 졸음 탐지 모델로 분리한 YOLOv8 s size 모델 두 개의 구조로 재설계 및 YOLO 예측 로직의 파라미터 최적화
- 결과 : 초당 약 24~26프레임 처리 성능을 확보하여 실시간 졸음 감지 요구사항을 충족

## 핵심 기능
- 운전자 졸음 상태 및 이상현상 탐지 및 피드백 제공
- 운전자 감시 수준 변경

## 스크린샷
![](/assets/projects/driver-sleep-detector/ui-1.png)
![](/assets/projects/driver-sleep-detector/ui-2.png)
