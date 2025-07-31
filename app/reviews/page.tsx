'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Review {
  id: string;
  name: string;
  program: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    program: '',
    rating: '5',
    comment: ''
  });

  const programs = [
    { value: 'lizard', label: '도마뱀 체험' },
    { value: 'terrarium', label: '테라리움 만들기' },
    { value: 'feeding', label: '먹이주기 체험' },
    { value: 'vet', label: '꼬마 수의사 체험' }
  ];

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews');
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          rating: parseInt(formData.rating)
        }),
      });

      if (response.ok) {
        alert('리뷰가 등록되었습니다!');
        setShowForm(false);
        setFormData({
          name: '',
          program: '',
          rating: '5',
          comment: ''
        });
        fetchReviews();
      } else {
        alert('리뷰 등록 중 오류가 발생했습니다.');
      }
    } catch {
      alert('리뷰 등록 중 오류가 발생했습니다.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const renderStars = (rating: number) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
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
              <Link href="/booking" className="text-gray-700 hover:text-primary-600">예약하기</Link>
              <Link href="/reviews" className="text-primary-600 font-medium">리뷰</Link>
              <Link href="/admin" className="text-gray-700 hover:text-primary-600">관리자</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Reviews Section */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">방문 후기</h2>
        
        <div className="text-center mb-8">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary-600 text-white px-6 py-3 rounded-full font-medium hover:bg-primary-700 transition-colors"
          >
            {showForm ? '취소' : '리뷰 작성하기'}
          </button>
        </div>

        {/* Review Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h3 className="text-xl font-bold mb-6">리뷰 작성</h3>
            
            <div className="mb-4">
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

            <div className="mb-4">
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

            <div className="mb-4">
              <label htmlFor="rating" className="block text-gray-700 font-medium mb-2">
                별점 *
              </label>
              <select
                id="rating"
                name="rating"
                required
                value={formData.rating}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="5">⭐⭐⭐⭐⭐ (5점)</option>
                <option value="4">⭐⭐⭐⭐☆ (4점)</option>
                <option value="3">⭐⭐⭐☆☆ (3점)</option>
                <option value="2">⭐⭐☆☆☆ (2점)</option>
                <option value="1">⭐☆☆☆☆ (1점)</option>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="comment" className="block text-gray-700 font-medium mb-2">
                후기 *
              </label>
              <textarea
                id="comment"
                name="comment"
                required
                rows={4}
                value={formData.comment}
                onChange={handleChange}
                placeholder="체험 후기를 남겨주세요."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              리뷰 등록
            </button>
          </form>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.length === 0 ? (
            <p className="text-center text-gray-600 py-8">아직 등록된 리뷰가 없습니다.</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-lg">{review.name}</h4>
                    <p className="text-gray-600 text-sm">
                      {programs.find(p => p.value === review.program)?.label || review.program}
                    </p>
                  </div>
                  <span className="text-lg">{renderStars(review.rating)}</span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
                <p className="text-gray-500 text-sm mt-4">
                  {new Date(review.createdAt).toLocaleDateString('ko-KR')}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}