import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ahetvvodpednhlumqxyb.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoZXR2dm9kcGVkbmhsdW1xeHliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5NDkxNTgsImV4cCI6MjA2OTUyNTE1OH0.LvlBFjli1bdBCjXgdv7yi-dTYg88HJYAZw7IBASb7NA'

export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey)
export const createClient = () => createSupabaseClient(supabaseUrl, supabaseAnonKey)

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