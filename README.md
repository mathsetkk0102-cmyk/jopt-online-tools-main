# 조PT의 온라인 교구 — Main Hub V2

메인페이지 UI/IA와 9개 과목 카테고리는 유지하며, 등록 교구는 `tools.json`에서 관리합니다.

## 운영 원칙

- 메인 화면의 디자인과 네비게이션 구조는 변경하지 않습니다.
- 개별 교구는 독립 URL로 배포합니다.
- 메인 Registry Source of Truth는 `tools.json`입니다.
- GitHub `main` 브랜치와 Netlify를 연결하면 변경 시 자동배포됩니다.
- `.github/workflows/validate-registry.yml`에서 Registry 구문과 필드를 검증합니다.
- 주의: GitHub Actions 검사는 비동기로 실행되며, 별도 배포 차단 설정이 없는 경우 Netlify 배포를 자동으로 막지는 못합니다.

## 파일 구조

- `index.html` — 온라인 교구 메인
- `tools.json` — 등록 교구 목록
- `_headers`, `netlify.toml` — Netlify 캐시 설정
- `scripts/validate-registry.mjs` — Registry 검증기
- `.github/workflows/validate-registry.yml` — 검증 워크플로
- `07_JOPT_WORKFLOW_V2.md` — 프로젝트 워크플로
- `05_jopt_online_tools_main_v2.html` — 메인 구조 참고 사본

## 교구 등록

`tools.json` 배열에 객체 1개를 추가합니다.

```json
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
```

로컬 검증: `node scripts/validate-registry.mjs`

## Netlify 연결

기존 메인 Netlify 사이트가 있다면 **새 사이트 생성 대신 기존 사이트의 Repository 연결**을 우선합니다.

- Repository: `mathsetkk0102-cmyk/jopt-online-tools-main`
- Production branch: `main`
- Base directory: 비움
- Build command: 비움
- Publish directory: `.`

Git에 변경을 반영하면 Netlify의 Git 기반 자동배포가 작동합니다. 배포 전 성공 여부는 Netlify에서 확인하세요.
