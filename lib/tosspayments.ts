// 토스페이먼츠 설정
export const tossPaymentsConfig = {
  clientKey: process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq', // 테스트 클라이언트 키
  secretKey: process.env.TOSS_SECRET_KEY || 'test_sk_BX7zk2yd8y6NKRMdOd2L3x9POLqK', // 테스트 시크릿 키
};

// 프로그램 가격 정보
export const programPrices = {
  lizard: {
    name: '도마뱀 체험',
    price: 15000,
    duration: '30분'
  },
  terrarium: {
    name: '테라리움 만들기',
    price: 25000,
    duration: '60분'
  },
  feeding: {
    name: '먹이주기 체험',
    price: 10000,
    duration: '20분'
  },
  vet: {
    name: '꼬마 수의사 체험',
    price: 35000,
    duration: '90분'
  }
};