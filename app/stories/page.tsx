import Link from "next/link";

export default function StoriesPage() {
  const stories = [
    {
      id: 1,
      emoji: "🦎",
      name: "레오파드 게코 \"꼬미\"",
      story: "꼬미는 밤에 깨어 있는 친구예요. 낮에는 주로 숨어 지내지만, 밤이 되면 아주 활발해지죠. 좋아하는 음식은 귀뚜라미랍니다.",
      qna: {
        question: "꼬미는 왜 자꾸 혀를 낼름거리나요?",
        answer: "혀를 낼름거리는 행동은 주변 환경을 탐색하기 위한 자연스러운 행동이에요!"
      },
      facts: [
        "레오파드 게코는 꼬리에 영양분을 저장해요",
        "위험할 때 꼬리를 스스로 자를 수 있어요",
        "20년 이상 살 수 있는 장수 도마뱀이에요"
      ]
    },
    {
      id: 2,
      emoji: "🐢",
      name: "육지거북 \"토리\"",
      story: "토리는 천천히 움직이지만 항상 목적지를 향해 나아가죠. 아이들이 먹이를 주면 아주 좋아한답니다.",
      qna: {
        question: "육지거북의 등껍질을 만져도 될까요?",
        answer: "살살 쓰다듬는 것은 괜찮지만, 강하게 두드리거나 누르는 건 거북이에게 스트레스를 줄 수 있어요."
      },
      facts: [
        "거북이의 등껍질은 60개의 뼈로 이루어져 있어요",
        "100년 이상 살 수 있는 장수 동물이에요",
        "채식주의자로 주로 채소와 과일을 먹어요"
      ]
    },
    {
      id: 3,
      emoji: "🦜",
      name: "앵무새 \"쿠키\"",
      story: "쿠키는 말하는 걸 아주 좋아해요. 아이들이 말하는 소리를 곧잘 따라한답니다!",
      qna: {
        question: "앵무새가 말을 따라 하는 이유가 뭔가요?",
        answer: "앵무새는 사회성이 뛰어나서 다른 존재와 소통하려는 욕구가 강하기 때문이에요!"
      },
      facts: [
        "앵무새는 매우 똑똑해서 5살 아이 정도의 지능을 가져요",
        "야생에서는 무리 생활을 하며 서로 대화해요",
        "좋아하는 사람과 평생 함께하는 애정이 깊은 새예요"
      ]
    },
    {
      id: 4,
      emoji: "🦔",
      name: "고슴도치 \"콩이\"",
      story: "콩이는 조금 수줍음이 많아요. 처음엔 공처럼 웅크리지만, 친해지면 코를 내밀고 인사해준답니다.",
      qna: {
        question: "고슴도치 가시는 아프지 않나요?",
        answer: "고슴도치가 편안할 때는 가시가 부드럽게 누워있어서 만져도 아프지 않아요. 무서울 때만 가시를 세운답니다!"
      },
      facts: [
        "고슴도치는 약 5000개의 가시를 가지고 있어요",
        "야행성 동물로 밤에 활발하게 움직여요",
        "곤충을 좋아하는 식충 동물이에요"
      ]
    }
  ];

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
              <Link href="/reviews" className="text-gray-700 hover:text-primary-600">리뷰</Link>
              <Link href="/stories" className="text-primary-600 font-medium">동물 이야기</Link>
              <Link href="/admin" className="text-gray-700 hover:text-primary-600">관리자</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Stories Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            🦜 수의사가 들려주는 재미있는 동물 이야기
          </h2>
          <p className="text-xl text-gray-600">
            우리 실내동물원에 살고 있는 특별한 동물 친구들의 이야기를 소개합니다.
            <br />아이들과 함께 읽으며 동물 친구들과 친해져 보세요!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {stories.map((animal) => (
            <div key={animal.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-primary-100 p-6">
                <div className="flex items-center">
                  <span className="text-5xl mr-4">{animal.emoji}</span>
                  <h3 className="text-2xl font-bold text-gray-900">{animal.name}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  &quot;{animal.story}&quot;
                </p>

                <div className="bg-yellow-50 rounded-xl p-4 mb-6">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                    <span className="mr-2">💬</span>수의사 Q&A
                  </h4>
                  <p className="text-gray-700 mb-2">
                    <strong>Q:</strong> {animal.qna.question}
                  </p>
                  <p className="text-primary-700">
                    <strong>👉 A:</strong> {animal.qna.answer}
                  </p>
                </div>

                <div className="bg-primary-50 rounded-xl p-4">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                    <span className="mr-2">📚</span>재미있는 사실들
                  </h4>
                  <ul className="space-y-2">
                    {animal.facts.map((fact, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-primary-600 mr-2 mt-1">•</span>
                        <span className="text-gray-700">{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/booking"
            className="inline-block bg-primary-600 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-primary-700 transition-colors"
          >
            동물 친구들을 직접 만나러 오세요! 🎉
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 px-4 py-8 text-center text-gray-600 mt-16">
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