# 학교 과제

## 목표

팀원들과 리액트와 json server를 이용해서 어플리케이션 만들어보기

## 디렉터리 구조

assets (사진)

auth (인증관리)

components (공통으로 사용하는 컴포넌트)

hooks (커스텀 훅)

page (페이지)

router (라우팅)

store (개인 프로필, 다크모드 관리)

util (유틸함수)

# 깃허브 사용법 & 중요 규칙

---

### 1. 초기 작업 폴더 가져오기 (처음 한번)

git clone https://github.com/kimchiMan0316/localsemester

---

### 2. 현재 브랜치 확인하기

git branch

---

### 3. 개인 작업 브랜치로 이동 (처음 작업물 받아왔을 때)

git checkout -b [성] origin/[성]

- `[성]`에는 본인 성 영문으로 입력 (예: ahn, oh, kim, park)
- 원격에 있는 브랜치에서 새 로컬 브랜치 생성 및 이동

---

### 4. 개인 작업 완료 후 커밋하기

git add .
git commit -m "작업 내용"
git push origin [성]

- `[성]`에는 본인 개인 브랜치명 (예: ahn, oh, kim, park)

---

### 5. 최신 작업물 가져와서 병합하기 (작업 전 필수!)

git checkout [성] # 내 작업 브랜치로 이동
git pull origin dev # dev 브랜치 최신 작업물 가져와 내 작업과 병합

- 작업 시작 전 항상 `dev` 최신 상태를 내 작업 브랜치에 병합해 충돌 최소화

---

### 6. 커밋 규칙 (중요)

- 작업 전  
  git pull origin dev (최신 공통 작업물 가져오기)
- 작업 완료 후  
  git push origin [성] (개인 브랜치에 작업물 업로드)

---

### 설명

- git pull origin dev : 공통 작업 브랜치인 `dev`에서 최신 작업물을 받아와 내 작업물과 병합
- git push origin [성] : 병합된 내 작업물을 원격 저장소 내 개인 브랜치 `[성]`에 업로드
