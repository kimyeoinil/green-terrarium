import Link from "next/link";

export default function Home() {
  const programs = [
    {
      id: 1,
      emoji: "🦎",
      title: "도마뱀 체험",
      subtitle: "만져도 될까요? 네, 됩니다!",
      description: "레오파드게코, 크레스티드게코 직접 만지기",
      price: "15,000원",
      duration: "30분",
      items: [
        "수의사 선생님의 안전 교육",
        "도마뱀 생태 이해하기",
        "직접 만지고 교감하기"
      ]
    },
    {
      id: 2,
      emoji: "🌵",
      title: "테라리움 만들기",
      subtitle: "나만의 작은 생태계를 만들어요",
      description: "유리병 속 미니 정원 만들기",
      price: "25,000원",
      duration: "60분",
      items: [
        "다육식물, 이끼, 장식품 제공",
        "완성품은 집으로 가져가세요",
        "생태계 원리 교육"
      ]
    },
    {
      id: 3,
      emoji: "🥗",
      title: "먹이주기 체험",
      subtitle: "동물 친구들의 식사시간",
      description: "거북이, 도마뱀, 토끼 먹이주기",
      price: "10,000원",
      duration: "20분",
      items: [
        "각 동물의 먹이 습성 배우기",
        "올바른 먹이주기 방법 교육",
        "동물과 교감하기"
      ]
    },
    {
      id: 4,
      emoji: "👨‍⚕️",
      title: "꼬마 수의사 체험",
      subtitle: "나도 수의사가 될래요!",
      description: "청진기로 심장소리 듣기",
      price: "35,000원",
      duration: "90분",
      items: [
        "동물 건강검진 체험",
        "수의사 가운 착용",
        "수료증 발급"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl">🦎</span>
              <h1 className="ml-2 text-xl font-bold text-primary-700">초록빛 테라리움</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-primary-600">홈</Link>
              <Link href="/booking" className="text-gray-700 hover:text-primary-600">예약하기</Link>
              <Link href="/reviews" className="text-gray-700 hover:text-primary-600">리뷰</Link>
              <Link href="/stories" className="text-gray-700 hover:text-primary-600">동물 이야기</Link>
              <Link href="/admin" className="text-gray-700 hover:text-primary-600">관리자</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-20 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-4">
          도시 속 작은 정글
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          가족과 함께하는 생태 체험 공간
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/booking"
            className="bg-primary-600 text-white px-8 py-3 rounded-full font-medium hover:bg-primary-700 transition-colors"
          >
            예약하기
          </Link>
          <a
            href="tel:02-1234-5678"
            className="bg-white text-primary-600 px-8 py-3 rounded-full font-medium border-2 border-primary-600 hover:bg-primary-50 transition-colors"
          >
            전화 문의
          </a>
        </div>
      </section>

      {/* Programs Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">체험 프로그램</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {programs.map((program) => (
            <div key={program.id} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-start mb-4">
                <span className="text-4xl mr-4">{program.emoji}</span>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900">{program.title}</h4>
                  <p className="text-gray-600 italic">{program.subtitle}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{program.description}</p>
              <ul className="space-y-2 mb-6">
                {program.items.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-primary-600 mr-2">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center pt-4 border-t">
                <div>
                  <span className="text-2xl font-bold text-primary-600">{program.price}</span>
                  <span className="text-gray-600 ml-2">/ {program.duration}</span>
                </div>
                <Link
                  href="/booking"
                  className="bg-primary-100 text-primary-700 px-6 py-2 rounded-full font-medium hover:bg-primary-200 transition-colors"
                >
                  예약하기
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Animal Stories Preview */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold mb-4">동물 친구들을 만나보세요</h3>
          <p className="text-gray-600">수의사가 들려주는 재미있는 동물 이야기</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-primary-100 rounded-full w-24 h-24 mx-auto mb-3 flex items-center justify-center">
              <span className="text-4xl">🦎</span>
            </div>
            <h4 className="font-bold">꼬미</h4>
            <p className="text-sm text-gray-600">레오파드 게코</p>
          </div>
          <div className="text-center">
            <div className="bg-primary-100 rounded-full w-24 h-24 mx-auto mb-3 flex items-center justify-center">
              <span className="text-4xl">🐢</span>
            </div>
            <h4 className="font-bold">토리</h4>
            <p className="text-sm text-gray-600">육지거북</p>
          </div>
          <div className="text-center">
            <div className="bg-primary-100 rounded-full w-24 h-24 mx-auto mb-3 flex items-center justify-center">
              <span className="text-4xl">🦜</span>
            </div>
            <h4 className="font-bold">쿠키</h4>
            <p className="text-sm text-gray-600">앵무새</p>
          </div>
          <div className="text-center">
            <div className="bg-primary-100 rounded-full w-24 h-24 mx-auto mb-3 flex items-center justify-center">
              <span className="text-4xl">🦔</span>
            </div>
            <h4 className="font-bold">콩이</h4>
            <p className="text-sm text-gray-600">고슴도치</p>
          </div>
        </div>
        <div className="text-center mt-8">
          <Link
            href="/stories"
            className="inline-block bg-white text-primary-600 px-6 py-3 rounded-full font-medium border-2 border-primary-600 hover:bg-primary-50 transition-colors"
          >
            동물 이야기 읽어보기 →
          </Link>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-primary-50 px-4 py-16">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6">
            <h4 className="text-xl font-bold mb-4 flex items-center">
              <span className="mr-2">📅</span>운영시간
            </h4>
            <ul className="space-y-2 text-gray-700">
              <li>평일: 10:00 - 18:00</li>
              <li>주말: 10:00 - 19:00</li>
              <li>휴무: 매주 월요일</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl p-6">
            <h4 className="text-xl font-bold mb-4 flex items-center">
              <span className="mr-2">📍</span>오시는 길
            </h4>
            <p className="text-gray-700">
              서울시 마포구 와우산로 123<br />
              2호선 홍대입구역 3번 출구 도보 5분<br />
              주차: 건물 내 주차장 2시간 무료
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 px-4 py-8 text-center text-gray-600">
        <p className="mb-4">&quot;작은 생명도 소중하게, 모든 체험은 교육적으로&quot;</p>
        <div className="flex justify-center space-x-4 mb-4">
          <a href="https://instagram.com/green_terrarium" className="hover:text-primary-600">인스타그램</a>
          <span>|</span>
          <a href="https://blog.naver.com/green_terrarium" className="hover:text-primary-600">네이버 블로그</a>
          <span>|</span>
          <a href="tel:02-1234-5678" className="hover:text-primary-600">02-1234-5678</a>
        </div>
        <p className="text-sm">© 2025 초록빛 테라리움. All rights reserved.</p>
      </footer>
    </div>
  );
}