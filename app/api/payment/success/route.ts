import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const orderId = searchParams.get('orderId');
  const paymentKey = searchParams.get('paymentKey');
  const amount = searchParams.get('amount');
  
  if (!orderId || !paymentKey || !amount) {
    return NextResponse.redirect(new URL('/booking?error=missing_params', request.url));
  }

  try {
    // 토스페이먼츠 결제 승인 API 호출
    const tossSecretKey = process.env.TOSS_SECRET_KEY || 'test_sk_BX7zk2yd8y6NKRMdOd2L3x9POLqK';
    const base64Key = Buffer.from(tossSecretKey + ':').toString('base64');
    
    const confirmResponse = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${base64Key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentKey,
        orderId,
        amount: parseInt(amount),
      }),
    });

    if (!confirmResponse.ok) {
      throw new Error('Payment confirmation failed');
    }

    const paymentData = await confirmResponse.json();
    
    // 메타데이터에서 예약 정보 추출
    let bookingData;
    try {
      bookingData = JSON.parse(paymentData.metadata?.bookingData || '{}');
    } catch {
      bookingData = {};
    }

    // Supabase에 예약 정보 저장
    const supabase = createClient();
    const { error: bookingError } = await supabase
      .from('bookings')
      .insert({
        name: bookingData.name,
        phone: bookingData.phone,
        email: bookingData.email,
        program: bookingData.program,
        date: bookingData.date,
        time: bookingData.time,
        participants: parseInt(bookingData.participants),
        message: bookingData.message,
        payment_status: 'completed',
        payment_id: paymentKey,
        amount: parseInt(amount),
      });

    if (bookingError) {
      console.error('Booking save error:', bookingError);
      // 결제는 성공했지만 예약 저장 실패
      return NextResponse.redirect(new URL('/booking?success=payment_only', request.url));
    }

    // 성공 페이지로 리다이렉트
    return NextResponse.redirect(new URL('/booking?success=true', request.url));
  } catch (error) {
    console.error('Payment process error:', error);
    return NextResponse.redirect(new URL('/booking?error=payment_failed', request.url));
  }
}