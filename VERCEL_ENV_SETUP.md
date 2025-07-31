# Vercel 환경변수 설정 가이드

## 필수 환경변수

Vercel 프로젝트 설정에서 다음 환경변수를 추가해야 합니다:

### 1. Vercel 대시보드에서 환경변수 추가하기
1. https://vercel.com 로그인
2. green-terrarium 프로젝트 선택
3. Settings 탭 클릭
4. Environment Variables 메뉴 선택

### 2. 추가해야 할 환경변수

```
# Supabase (이미 설정됨)
NEXT_PUBLIC_SUPABASE_URL=https://ahetvvodpednhlumqxyb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoZXR2dm9kcGVkbmhsdW1xeHliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5NDkxNTgsImV4cCI6MjA2OTUyNTE1OH0.LvlBFjli1bdBCjXgdv7yi-dTYg88HJYAZw7IBASb7NA

# 토스페이먼츠 (새로 추가 필요)
NEXT_PUBLIC_TOSS_CLIENT_KEY=test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq
TOSS_SECRET_KEY=test_sk_BX7zk2yd8y6NKRMdOd2L3x9POLqK
```

### 3. 환경변수 추가 방법
1. "Add New" 버튼 클릭
2. Key 입력 (예: NEXT_PUBLIC_TOSS_CLIENT_KEY)
3. Value 입력 (예: test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq)
4. Production, Preview, Development 모두 체크
5. "Save" 클릭

### 4. 재배포
환경변수 추가 후 재배포가 필요합니다:
- Deployments 탭에서 최신 배포의 ... 메뉴 클릭
- "Redeploy" 선택

## 토스페이먼츠 테스트 정보

### 테스트 카드 정보
- 카드번호: 4242-4242-4242-4242
- 유효기간: 미래 날짜 아무거나 (예: 12/25)
- CVC: 아무 숫자 3자리 (예: 123)
- 비밀번호: 아무 숫자 2자리 (예: 00)

### 디버깅 방법
1. 브라우저 개발자 도구 열기 (F12)
2. Console 탭에서 오류 메시지 확인
3. Network 탭에서 API 호출 확인

### 주의사항
- 현재 테스트 키를 사용하므로 실제 결제는 불가능
- 프로덕션 환경에서는 실제 키로 교체 필요