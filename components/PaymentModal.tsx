'use client';

import { useEffect, useState } from 'react';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { tossPaymentsConfig, programPrices } from '@/lib/tosspayments';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: {
    name: string;
    phone: string;
    email: string;
    program: string;
    date: string;
    time: string;
    participants: string;
    message: string;
  };
  onSuccess: () => void;
}

export default function PaymentModal({ isOpen, onClose, bookingData, onSuccess }: PaymentModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      handlePayment();
    }
  }, [isOpen]);

  const handlePayment = async () => {
    if (!isOpen) return;

    try {
      setIsLoading(true);
      const tossPayments = await loadTossPayments(tossPaymentsConfig.clientKey);
      
      const programInfo = programPrices[bookingData.program as keyof typeof programPrices];
      const amount = programInfo.price * parseInt(bookingData.participants);
      const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // 결제 위젯 렌더링
      await tossPayments.requestPayment('카드', {
        amount: amount,
        orderId: orderId,
        orderName: `${programInfo.name} - ${bookingData.participants}명`,
        customerName: bookingData.name,
        customerEmail: bookingData.email,
        customerMobilePhone: bookingData.phone.replace(/-/g, ''),
        successUrl: `${window.location.origin}/api/payment/success`,
        failUrl: `${window.location.origin}/api/payment/fail`,
        metadata: {
          bookingData: JSON.stringify(bookingData)
        }
      });
    } catch (error) {
      console.error('Payment error:', error);
      alert('결제 중 오류가 발생했습니다.');
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">결제 진행 중</h2>
        <p className="text-gray-600 mb-6">
          잠시만 기다려주세요. 결제 페이지로 이동합니다...
        </p>
        {isLoading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        )}
      </div>
    </div>
  );
}