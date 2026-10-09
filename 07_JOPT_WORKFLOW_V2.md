# 조PT의 온라인 교구 — WORKFLOW V2.1

## 0. 목적
기존 메인 UI/IA·9개 카테고리와 독립형 교구 구조를 유지하면서 Registry와 배포 작업을 분리합니다.

- 메인 페이지의 카드 데이터는 `tools.json`이 유일한 Source of Truth입니다.
- 단원은 metadata이며 별도 단원 선택 페이지는 없습니다.
- 개별 교구는 독립 URL로 배포하고, 메인 페이지는 Launcher 역할만 합니다.
- 디자인 원칙은 `03_JOPT_TOOL_DESIGN_SYSTEM_v1.0.md`를 따릅니다.

## 1. 최종 작업 흐름
1. 사용자 요청에서 학습 목표와 교구 기능을 파악합니다.
2. 공통 디자인 시스템에 맞는 개별 교구 HTML을 만듭니다.
3. 수학 로직·반응형·터치·키보드·초기화 동작을 검증합니다.
4. 개별 교구를 Netlify URL로 배포합니다.
5. 메인 GitHub 저장소의 `tools.json`에 항목 1개를 추가합니다.
6. JSON 검증을 수행한 후 `main`에 반영합니다.
7. Netlify 자동배포가 설정되어 있다면 배포 상태를 확인합니다.
8. 메인에서 카테고리·교구 카드·새 탭 열기를 확인합니다.

## 2. Registry 필드 규칙
```json
[
  {
    "id": "pythagorean",
    "title": "피타고라스 정리",
    "course": "중2",
    "unit": "도형의 성질",
    "description": "피타고라스 정리",
    "url": "https://example.netlify.app",
    "isNew": true,
    "order": 20,
    "enabled": true
  }
]
```

- id: 중복 없는 kebab-case
- course: 중1·중2·중3·고1·대수·미적분Ⅰ·미적분Ⅱ·확률과 통계·기하 중 하나
- unit: 내부 metadata
- description: 1줄로 짧게
- url: 작동하는 교구 배포 링크 (https 권장)
- isNew: 수동 변경
- order: 수동 지정
- enabled: false면 숨김

## 3. 메인 수정 제한
단순 교구 추가 요청에서는 `index.html`, 색상, Typography, 카테고리 개수, Footer, 카드 UI를 변경하지 않습니다. `tools.json`만 갱신합니다.

## 4. 자동화 구성
메인 저장소: `mathsetkk0102-cmyk/jopt-online-tools-main`

GitHub: main 브랜치 / `tools.json` 변경 시 검증 워크플로 실행

Netlify (기존 메인 사이트 유지 권장):
- Production branch: `main`
- Base directory: 비움
- Build command: 비움
- Publish directory: `.`

검사 워크플로는 별도 실행되므로 **Netlify 빌드를 무조건 차단하는 게 아닙니다.** 검증 결과를 확인하고, 운영 단계에서 필요하면 빌드 단계에도 검사 명령을 넣어 차단할 수 있습니다.

## 5. 회귀 테스트
- 9개 카테고리 고정
- 카테고리 → 교구 2단계 유지
- URL 새 탭 `noopener noreferrer`
- 빈 카테고리 문구
- JSON 오류 시 실패 상태 표시
- disabled 항목 미노출
- NEW chip·order 반영
- 모바일 2열 카테고리 / 교구 1열
- 가로 스크롤 없음
- 브라우저 뒤로가기
- 기존 Design System 보존

## 6. Source Priority
1. 사용자의 최신 명시적 요청
2. 프로젝트 지침
3. `tools.json` — 등록 교구 데이터
4. `index.html` — 메인 기능/구조
5. `03_JOPT_TOOL_DESIGN_SYSTEM_v1.0.md` — 디자인 시스템
6. Base Shell 및 Visual Reference — 하위 교구 제작

## 7. 하지 않는 일
- Supabase/Google Sheets Registry 도입
- 개별 교구의 물리적 통합
- 단원 선택 페이지 추가
- 메인 검색·추천·통계·Hero 추가
- 등록만을 위해 메인 HTML 리디자인

## 8. 향후 요청 예시
> 중2에 피타고라스 정리 교구 추가해줘. URL: https://example.netlify.app

요청 시 기존 Registry를 먼저 읽고, 새 객체 1개만 추가한 후 검증·커밋·배포 확인까지 수행합니다.
