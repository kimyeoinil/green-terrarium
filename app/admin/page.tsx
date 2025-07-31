'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string;
  program: string;
  date: string;
  time: string;
  participants: string;
  message: string;
  createdAt: string;
}

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState<'bookings' | 'reviews'>('bookings');

  const programs: { [key: string]: string } = {
    'lizard': '도마뱀 체험',
    'terrarium': '테라리움 만들기',
    'feeding': '먹이주기 체험',
    'vet': '꼬마 수의사 체험'
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
      fetchReviews();
    }
  }, [isAuthenticated]);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings');
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews');
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm('정말로 이 리뷰를 삭제하시겠습니까?')) {
      return;
    }

    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // 삭제 성공 시 리뷰 목록 다시 불러오기
        fetchReviews();
      } else {
        alert('리뷰 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Failed to delete review:', error);
      alert('리뷰 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 간단한 비밀번호 체크 (실제로는 더 안전한 인증 사용)
    if (password === 'green2025') {
      setIsAuthenticated(true);
    } else {
      alert('비밀번호가 올바르지 않습니다.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex items-center justify-center">
        <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">관리자 로그인</h2>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            로그인
          </button>
          <Link href="/" className="block text-center mt-4 text-gray-600 hover:text-primary-600">
            홈으로 돌아가기
          </Link>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <span className="text-2xl">🦎</span>
              <h1 className="ml-2 text-xl font-bold text-primary-700">초록빛 테라리움 - 관리자 v2</h1>
            </Link>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-gray-700 hover:text-primary-600"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 p-1 rounded-lg inline-flex">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'bookings'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              예약 관리
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'reviews'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              리뷰 관리
            </button>
          </div>
        </div>
        
        {/* Bookings Table */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
              <thead className="bg-primary-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    예약일시
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    이름
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    연락처
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    프로그램
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    인원
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    요청사항
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    예약일
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                      예약이 없습니다.
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.date} {booking.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.phone}
                        {booking.email && (
                          <div className="text-xs text-gray-500">{booking.email}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {programs[booking.program] || booking.program}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.participants}명
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                        {booking.message || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(booking.createdAt).toLocaleDateString('ko-KR')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        )}

        {/* Reviews Table */}
        {activeTab === 'reviews' && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      작성일
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      이름
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      평점
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      리뷰 내용
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      작업
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reviews.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                        리뷰가 없습니다.
                      </td>
                    </tr>
                  ) : (
                    reviews.map((review) => (
                      <tr key={review.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(review.created_at).toLocaleDateString('ko-KR')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {review.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>
                                ★
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                          {review.comment}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <button
                            onClick={() => handleDeleteReview(review.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            삭제
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-8 bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>💡 관리자 안내:</strong> 이제 Supabase 데이터베이스와 연동되어 있습니다.
            모든 예약과 리뷰 데이터는 안전하게 저장됩니다.
          </p>
        </div>
      </section>
    </div>
  );
}