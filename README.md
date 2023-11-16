# S09P22D110 주렁주렁팀 프로젝트

## 🔍프로젝트 소개

### 📌서비스 요약

- VSCode와 IntelliJ의 확장으로 작성할 수 있는 트러블 슈팅 문서
- 작성한 트러블 슈팅 문서 관리 및 공유 커뮤니티

### 📌기획 의도

- 개발자들이 개발 중 생기는 트러블 슈팅 문서 작성을 빠르고 편리하게 할 수 있도록 도와주는 서비스
- 트러블 슈팅 문서 공유 커뮤니티를 통해 개발자들이 서로 도움을 주고 받을 수 있는 서비스

### 📌기술 스택

<img src="https://img.shields.io/badge/typescript-3178C6?styleflat&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/Next.js-000000?styleflat&logo=vite&logoColor=white">
<img src="https://img.shields.io/badge/reactquery-FF4154?styleflat&logo=reactquery&logoColor=white">
<img src="https://img.shields.io/badge/tailwindcss-06B6D4?styleflat&logo=tailwindcss&logoColor=white">

<img src="https://img.shields.io/badge/springboot-6DB33F?styleflat&logo=springboot&logoColor=white">
<img src="https://img.shields.io/badge/springsecurity-6DB33F?styleflat&logo=springsecurity&logoColor=white">

### 📌협업 및 배포 툴

<img src="https://img.shields.io/badge/figma-F24E1E?styleflat&logo=figma&logoColor=white">
<img src="https://img.shields.io/badge/gitlab-FC6D26?styleflat&logo=gitlab&logoColor=white">
<img src="https://img.shields.io/badge/docker-2496ED?styleflat&logo=docker&logoColor=white">
<img src="https://img.shields.io/badge/jenkins-D24939?styleflat&logo=jenkins&logoColor=white">
<img src="https://img.shields.io/badge/Notion-000000?styleflat&logo=Notion&logoColor=white">
<img src="https://img.shields.io/badge/mattermost-0058CC?styleflat&logo=mattermost&logoColor=white">
<img src="https://img.shields.io/badge/jira-0052CC?styleflat&logo=jira&logoColor=white">

### 📌프로젝트 기간

- 2023.10.09 ~ 2023.11.17

## 🙍팀원 소개

- 정슬호 : 팀장, VSCode 확장, 트러블 슈팅 문서 분석 및 통계
- 김수현 : 트러블 슈팅 문서 작성 및 관리, 공유 커뮤니티
- 고예림 : IntelliJ 확장
- 손재형 : 로그인/회원가입, 마이 페이지, 메인 페이지
- 장진욱 : 인프라
- 권종률 : 트러블 슈팅 문서 작성 및 관리, 공유 커뮤니티

## 📑Convention

### 📌Git Commit Convention

#### 1. 커밋 유형

- 커밋 제목 첫 글자는 대문자로 작성하기

  | 커밋 유형 | 의미 |
  | --- | --- |
  | Feat | 새로운 기능 추가 |
  | Fix | 버그 수정 |
  | Docs | 문서 수정 |
  | Style | 코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우 |
  | Refactor | 코드 리팩토링 |
  | Test | 테스트 코드, 리팩토링 테스트 코드 추가 |
  | Chore | 패키지 매니저 수정, 그 외 기타 수정 ex) .gitignore |
  | Design | CSS 등 사용자 UI 디자인 변경 |
  | Comment | 필요한 주석 추가 및 변경 |
  | Rename | 파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우 |
  | Remove | 파일을 삭제하는 작업만 수행한 경우 |
  | !BREAKING CHANGE | 커다란 API 변경의 경우 |
  | !HOTFIX | 급하게 치명적인 버그를 고쳐야 하는 경우 |

#### 2. 제목과 본문을 빈행으로 분리

- 커밋 유형 이후 제목과 본문은 한글로 작성하여 내용이 잘 전달될 수 있도록 할 것
- 본문에는 변경한 내용과 이유 설명 (어떻게보다는 무엇 & 왜를 설명)

#### 3. 제목 첫 글자는 대문자로, 끝에는 `.` 금지

#### 4. 제목은 영문 기준 50자 이내로 할 것

#### 5. 무엇을 왜 했는지 적기, 어떻게 했는지 적지 않기

```
<타입> : <제목>

내용
```

### 📌Git Branch Convention

#### CI/CD

- `프론트`
  - `front` 브랜치의 push 이벤트 감지
  - `front` 브랜치 코드 기준 CI/CD
- `백`
  - `back/user` 브랜치의 push 이벤트 감지
    - `back/user` 또는 `back/db` 또는 `back/article` 등
  - `back/user` 브랜치 코드 기준 CI/CD

#### 프론트엔드 브랜치 구조

- `front` : fe 서버
  - `fe/login` : fe서버에서 로그인 기능을 만드는 브랜치
  - `fe/home` : fe서버에서 홈 화면 만드는 브랜치

#### 백엔드 브랜치 구조

- `back/user` : be 유저 서버
  - `be/feat/login` : be 유저 서버에서 로그인 기능을 만드는 브랜치
- `back/db` : be db 동기화 서버
- `back/article` : be 게시판 서버
  - `be/feat/create` : be 게시판 서버에서 게시판 생성하는 기능 만드는 브랜치

## 🔧설계

### 📌아키텍처 설계

## 💻주요 화면 스크린샷, gif

### VSCode 확장

### IntelliJ 확장

### 웹
