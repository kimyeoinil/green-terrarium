import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const message = searchParams.get('message');
  
  console.error('Payment failed:', { code, message });
  
  // 실패 정보와 함께 예약 페이지로 리다이렉트
  return NextResponse.redirect(new URL(`/booking?error=payment_cancelled&code=${code}`, request.url));
}