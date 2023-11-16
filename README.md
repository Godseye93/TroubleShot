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

![아키텍처도](https://github.com/Jeongseulho/INBEST_README/assets/110578739/8b774bdb-b7db-4eb0-9672-d16b2e3fc9b9)

## 💻주요 화면 스크린샷, gif

<img width="1280" alt="image" src="https://github.com/Jeongseulho/CSstudy/assets/110578739/8ff27851-c786-4779-81b4-34bd35df7811">

## 마이페이지, 전적

![마이페이지,전적](https://github.com/Jeongseulho/CSstudy/assets/110578739/357a2a9d-204e-4957-9f32-957fcf947dd8)

### 로그인 회원가입

![로그인회원가입](https://github.com/Jeongseulho/CSstudy/assets/110578739/28403132-da96-4aa0-a29c-8ba05e1c7ef0)

## 프로필 사진 편집 및 변경

![chrome-capture-2023-9-102 (1)](https://github.com/KwonJongryul/mirror/assets/122791001/78e4c1d2-0eb0-476e-b3b6-3670f93d2b8e)

## 랭킹

### 개인 랭킹

<img width="1280" alt="image" src="https://github.com/Jeongseulho/CSstudy/assets/110578739/c9871109-ffcb-4b82-b6d9-f8a91e181a8d">

### 그룹 랭킹

<img width="1280" alt="image" src="https://github.com/Jeongseulho/CSstudy/assets/110578739/bf09a3fb-c414-41c1-8f7e-0fb33cdd461c">

## 그룹 관리

### 그룹 생성

![그룹 생성](https://github.com/Jeongseulho/CSstudy/assets/110578739/533032e5-30ca-4456-a922-fdd0f3c41727)

### 참여가능 그룹 필터링

![필터모달](https://github.com/Jeongseulho/CSstudy/assets/110578739/2c90334d-9d87-4194-adc7-1063c09ca3d3)

### 초대 알림

![초대알림](https://github.com/Jeongseulho/CSstudy/assets/110578739/c3f7abb8-533a-448f-afc6-4b27b322e172)

### 그룹 참여

![참여모달](https://github.com/Jeongseulho/CSstudy/assets/110578739/ee631462-8adb-49cc-8fc4-ff0b12a46881)

### 그룹채팅

![그룹채팅](https://github.com/Jeongseulho/CSstudy/assets/110578739/8eea3274-3267-484e-a738-69ffc5979c06)

## 게시판

### 게시글 등록

![게시글등록](https://github.com/Jeongseulho/CSstudy/assets/110578739/32399609-6b59-4b46-9c09-7aa9c57e95db)

### 댓글 등록

![댓글등록](https://github.com/Jeongseulho/CSstudy/assets/110578739/3bbe6aa7-68e1-458e-bc8d-c4672a91e62e)

### 대댓글 등록

![대댓글등록](https://github.com/Jeongseulho/CSstudy/assets/110578739/a989befa-303b-4e30-8e94-b7967864e9e7)

## 금융 사전

![금융사전](https://github.com/Jeongseulho/CSstudy/assets/110578739/79f09d44-92ab-405a-a6d8-4ed1768f0c7b)

## 모의투자

### 모의투자 그룹현황

![모의투자그룹현황](https://github.com/Jeongseulho/CSstudy/assets/110578739/9cbcf7bd-99cd-4d70-804f-bf3a7c6ba362)

### 모의투자 내현황

![모의투자내현황](https://github.com/Jeongseulho/CSstudy/assets/110578739/2c2a7dfb-dbd2-48a1-9873-c8a1db671b79)

### 주요주식목록

![주요주식목록](https://github.com/Jeongseulho/CSstudy/assets/110578739/8b07d7d2-bfd1-4543-a3e0-83cf810cd290)

### 뉴스

![주요뉴스,속보,산업별뉴스](https://github.com/Jeongseulho/CSstudy/assets/110578739/79b62a50-8588-490f-9852-5c0606ac503d)

### 기업 상세정보

![기업상세정보](https://github.com/Jeongseulho/CSstudy/assets/110578739/3397468d-c61d-4fa1-b66d-208179525077)

### 캔들차트 튜토리얼

![캔들차트튜토리얼](https://github.com/Jeongseulho/CSstudy/assets/110578739/fe46f1f7-80d4-464d-a69e-501f8e59597f)

### 주식 주문

![주식주문](https://github.com/Jeongseulho/CSstudy/assets/110578739/2d3d3437-40dd-429d-b174-ce846d64c90c)

### 체결 알림

![체결알림](https://github.com/Jeongseulho/CSstudy/assets/110578739/8d08803c-7d8f-4539-8912-ef68b4c1e25d)
