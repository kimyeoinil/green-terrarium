import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 타입 정의
export interface Booking {
  id?: number;
  name: string;
  phone: string;
  email: string;
  program: string;
  date: string;
  time: string;
  participants: string;
  message?: string;
  created_at?: string;
}

export interface Review {
  id?: number;
  name: string;
  rating: number;
  comment: string;
  created_at?: string;
}