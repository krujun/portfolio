import { createClient } from '@supabase/supabase-js'

// อ่านค่าจาก Environment Variable
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo-placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-placeholder-key'

// ตรวจสอบว่าผู้ใช้ได้ใส่ค่ารหัสจริงหรือยัง
export const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && 
  import.meta.env.VITE_SUPABASE_ANON_KEY &&
  !import.meta.env.VITE_SUPABASE_URL.includes('your-project-id')
)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
