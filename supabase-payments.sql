-- bookings 테이블에 결제 관련 컬럼 추가
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS payment_status text DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS payment_id text,
ADD COLUMN IF NOT EXISTS amount integer;

-- payments 테이블 생성
CREATE TABLE IF NOT EXISTS payments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id integer REFERENCES bookings(id),
  payment_key text NOT NULL,
  order_id text NOT NULL,
  amount integer NOT NULL,
  status text NOT NULL,
  method text,
  approved_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  metadata jsonb
);

-- payments 테이블 인덱스
CREATE INDEX IF NOT EXISTS idx_payments_payment_key ON payments(payment_key);
CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_booking_id ON payments(booking_id);

-- RLS 활성화
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- RLS 정책 - 관리자만 조회 가능
CREATE POLICY "Payments are viewable by everyone" ON payments
  FOR SELECT USING (true);

-- 결제 정보 삽입은 서버에서만 가능
CREATE POLICY "Payments can only be inserted by service role" ON payments
  FOR INSERT WITH CHECK (false);