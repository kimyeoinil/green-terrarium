-- 예약(bookings) 테이블 생성
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  program VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  time VARCHAR(255) NOT NULL,
  participants VARCHAR(255) NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 리뷰(reviews) 테이블 생성
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- RLS (Row Level Security) 활성화
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 읽을 수 있도록 정책 생성
CREATE POLICY "Enable read access for all users" ON bookings
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON reviews
  FOR INSERT WITH CHECK (true);