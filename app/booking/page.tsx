'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function BookingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    program: '',
    date: '',
    time: '',
    participants: '1',
    message: ''
  });

  const programs = [
    { value: 'lizard', label: '도마뱀 체험 (30분) - 15,000원' },
    { value: 'terrarium', label: '테라리움 만들기 (60분) - 25,000원' },
    { value: 'feeding', label: '먹이주기 체험 (20분) - 10,000원' },
    { value: 'vet', label: '꼬마 수의사 체험 (90분) - 35,000원' }
  ];

  const timeSlots = [
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('예약이 완료되었습니다! 확인 문자를 보내드렸습니다.');
        router.push('/');
      } else {
        alert('예약 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } catch {
      alert('예약 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <span className="text-2xl">🦎</span>
              <h1 className="ml-2 text-xl font-bold text-primary-700">초록빛 테라리움</h1>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-primary-600">홈</Link>
              <Link href="/booking" className="text-primary-600 font-medium">예약하기</Link>
              <Link href="/reviews" className="text-gray-700 hover:text-primary-600">리뷰</Link>
              <Link href="/admin" className="text-gray-700 hover:text-primary-600">관리자</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Booking Form */}
      <section className="max-w-2xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">체험 예약하기</h2>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              이름 *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
              전화번호 *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              placeholder="010-1234-5678"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              이메일
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="program" className="block text-gray-700 font-medium mb-2">
              체험 프로그램 *
            </label>
            <select
              id="program"
              name="program"
              required
              value={formData.program}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">프로그램을 선택해주세요</option>
              {programs.map((program) => (
                <option key={program.value} value={program.value}>
                  {program.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
                예약 날짜 *
              </label>
              <input
                type="date"
                id="date"
                name="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label htmlFor="time" className="block text-gray-700 font-medium mb-2">
                예약 시간 *
              </label>
              <select
                id="time"
                name="time"
                required
                value={formData.time}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">시간을 선택해주세요</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="participants" className="block text-gray-700 font-medium mb-2">
              참가 인원 *
            </label>
            <select
              id="participants"
              name="participants"
              required
              value={formData.participants}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num}명
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
              요청사항
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="특별한 요청사항이 있으시면 적어주세요."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="bg-primary-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium text-gray-800 mb-2">예약 안내</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 예약은 최소 1일 전까지 가능합니다.</li>
              <li>• 예약 변경/취소는 전화로 문의해주세요.</li>
              <li>• 체험 10분 전까지 도착해주세요.</li>
            </ul>
          </div>

          <button
            type="submit"
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            예약하기
          </button>
        </form>
      </section>
    </div>
  );
}