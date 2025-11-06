# ZXIS_YAM

YAM은 대학생들이 편리하게 학식을 예약하고 결제할 수 있도록 도와주는 **앱 기반 예약 서비스**입니다.

사용자는 로그인 후 학식 메뉴를 확인하고, 원하는 메뉴를 장바구니에 담아 예약 결제를 완료할 수 있습니다.



## 주요 기능

| 기능 | 설명 |
|------|------|
| 로그인 기능 | 사용자 로그인 및 세션 유지 |
| 학식 메뉴 조회 | 학식 메뉴 불러오기 (백엔드 연동) |
| 장바구니 기능 | 원하는 메뉴를 장바구니에 추가/삭제 |
| 결제 및 예약 | 선택한 메뉴를 예약하고 결제 처리 |


## 개발 환경
- 백엔드 : Node.js
- 프론트엔드 : React Native


## 프로젝트 구조

``` bach
ZXIS_YAM/
├── frontend/     # React Native 앱
└── backend/      # Node.js + Express 서버
```



## 1. 프로젝트 클론

```bash
git clone https://github.com/your-username/ZXIS_YAM.git
cd ZXIS_YAM
```



## 2. 프론트엔드 실행 (React Native)

### 의존성 설치

```bash
cd frontend
npm install
```

### ▶ 실행 (Android)

```bash
npx react-native run-android
```

##  3. 백엔드 실행 (Node.js + Express)

### 의존성 설치

```bash
cd ../backend
npm install
```

### ▶ 서버 실행

```bash
# 일반 실행
node index.js

# 개발 모드 (파일 변경 감지 자동 재시작)
npx nodemon index.js
```

또는 \`package.json\`에 script가 정의되어 있다면:

```bash
npm run dev //보통 이걸로 하면 됨
```


## 4. API 테스트 예시

- 기본 URL: \`http://localhost:3000\`
- 예시 엔드포인트: \`http://localhost:3000/api/hello\`

---


## GitHub 협업 방식

### 브랜치 전략 (이슈 -> 기능별 브랜치 -> dev -> main)

| 브랜치 | 용도 |
|--------|------|
| `main` | 최종 배포 브랜치 (항상 안정 상태 유지) |
| `dev` | 중간 개발 브랜치 (모든 기능 병합 후 테스트) |
| `front/이슈번호-작업명` | 프론트 개발 브랜치 Ex) `front/13-login-ui`, `front/18-cart-view` |
| `back/이슈번호-작업명` | 백엔드 개발 브랜치 Ex) `back/13-login-api`, `back/22-payment` |

이슈를 기반으로 중간 개발 브랜치인 `dev`에서 작업 브랜치를 만들어 개발하고, 작업 완료 후 Pull Request를 생성,
기능이 완전히 통합되고 테스트된 후에 최종 배포 브랜치인 `main`에 최종 반영


### 이슈 작성 규칙

- 프론트와 백 나눠서 생성
  - Ex) 제목: [front] 로그인 UI 구현, [back] 로그인 API 구현
- 이슈 번호 기준으로 브랜치 및 커밋 작성


### 브랜치 생성 예시

```bash
git checkout dev //dev 브랜치로 이동
git pull origin dev //dev 브랜치 최신 상태로 전환
git checkout -b front/13-login ui //로그인ui 기능 브랜치 생성 및 이동
```

### 커밋 & 푸시

```bash
git add . 
git commit -m "front: 로그인 UI 구현 (#13)" //커밋 메시지 작성 (이슈 번호 포함)
git push origin front/13-login //원격 저장소로 푸시
```

### Pull Request 생성
- PR 제목 예시:
  [front] 로그인 UI 기능 구현 (#13) <- 이슈 번호 포함

- 병합 대상 브랜치는 dev로 설정
- 팀원이 코드 리뷰 진행 후 승인

- CI 테스트 및 충돌 확인

- 문제가 없다면 dev로 병합 (Squash & Merge 권장)

