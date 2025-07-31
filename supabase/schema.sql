-- Bookings 테이블 생성
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  program TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  participants TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Reviews 테이블 생성
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- RLS (Row Level Security) 활성화
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Bookings 정책
CREATE POLICY "Enable read access for all users" ON bookings
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON bookings
  FOR INSERT WITH CHECK (true);

-- Reviews 정책
CREATE POLICY "Enable read access for all users" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON reviews
  FOR INSERT WITH CHECK (true);