-- ====================================================
-- SUPABASE POSTGRESQL SCHEMA FOR REACT PORTFOLIO
-- ====================================================

-- 1. Create Profile Table
CREATE TABLE IF NOT EXISTS public.profile (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'นายธนาพล ตริสกุล',
  role TEXT DEFAULT 'Full-Stack Developer & Educator',
  bio TEXT DEFAULT 'เว็บไซต์ Portfolio แสดงผลงานและบทความ พัฒนาด้วย React (Vite) เชื่อมต่อฐานข้อมูล Supabase (PostgreSQL) ฟรี พร้อมระบบ Admin CMS ในตัว โฮสต์บน GitHub Pages',
  avatar_url TEXT DEFAULT 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 2. Create Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  image_url TEXT,
  github_url TEXT,
  demo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 3. Create Articles Table
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'General',
  read_time TEXT DEFAULT '3 min read',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies for Profile
DROP POLICY IF EXISTS "Public Read Profile" ON public.profile;
DROP POLICY IF EXISTS "Admin Insert Profile" ON public.profile;
DROP POLICY IF EXISTS "Admin Update Profile" ON public.profile;
DROP POLICY IF EXISTS "Admin Delete Profile" ON public.profile;

CREATE POLICY "Public Read Profile" ON public.profile FOR SELECT USING (true);
CREATE POLICY "Admin Insert Profile" ON public.profile FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin Update Profile" ON public.profile FOR UPDATE TO authenticated USING (true);

-- 6. RLS Policies for Projects
DROP POLICY IF EXISTS "Public Read Projects" ON public.projects;
DROP POLICY IF EXISTS "Admin Insert Projects" ON public.projects;
DROP POLICY IF EXISTS "Admin Update Projects" ON public.projects;
DROP POLICY IF EXISTS "Admin Delete Projects" ON public.projects;

CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Admin Insert Projects" ON public.projects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin Update Projects" ON public.projects FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin Delete Projects" ON public.projects FOR DELETE TO authenticated USING (true);

-- 7. RLS Policies for Articles
DROP POLICY IF EXISTS "Public Read Articles" ON public.articles;
DROP POLICY IF EXISTS "Admin Insert Articles" ON public.articles;
DROP POLICY IF EXISTS "Admin Update Articles" ON public.articles;
DROP POLICY IF EXISTS "Admin Delete Articles" ON public.articles;

CREATE POLICY "Public Read Articles" ON public.articles FOR SELECT USING (true);
CREATE POLICY "Admin Insert Articles" ON public.articles FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin Update Articles" ON public.articles FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin Delete Articles" ON public.articles FOR DELETE TO authenticated USING (true);

-- ====================================================
-- INITIAL SEED DATA
-- ====================================================

INSERT INTO public.profile (name, role, bio, avatar_url) VALUES
('นายธนาพล ตริสกุล', 'Full-Stack Developer & Educator', 'เว็บไซต์ Portfolio แสดงผลงานและบทความ พัฒนาด้วย React (Vite) เชื่อมต่อฐานข้อมูล Supabase (PostgreSQL) ฟรี พร้อมระบบ Admin CMS ในตัว โฮสต์บน GitHub Pages', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80')
ON CONFLICT DO NOTHING;

INSERT INTO public.projects (title, description, tags, image_url, github_url, demo_url) VALUES
('E-Learning Platform', '### ระบบจัดการการเรียนการสอนออนไลน์\nรองรับวิดีโอและแบบทดสอบสำหรับนักเรียน **มีระบบตรวจคะแนนอัตโนมัติ**\n- รองรับผู้เรียนพร้อมกัน 1,000+ คน\n- ระบบจัดการเนื้อหาคอร์สเรียลไทม์', ARRAY['React', 'Supabase', 'Tailwind'], 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80', 'https://github.com', 'https://demo.com'),
('Smart Classroom App', '### แอปพลิเคชันเช็คชื่อและบันทึกคะแนน\nระบบบันทึกคะแนนเก็บแบบ Realtime พร้อมออกรายงานประจำภาคเรียน\n- สแกน QR Code เช็คชื่อ\n- คำนวณเกรดอัตโนมัติ', ARRAY['React', 'Vite', 'PostgreSQL'], 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80', 'https://github.com', 'https://demo.com');

INSERT INTO public.articles (title, content, category, read_time) VALUES
('เริ่มต้นสร้าง Portfolio ฟรีด้วย React + Supabase', '## บทนำ\nการสร้าง **Portfolio** ไม่จำเป็นต้องเสียค่าโฮสติ้งรายเดือน คุณสามารถใช้ **GitHub Pages** ร่วมกับ **Supabase PostgreSQL Free Tier** ได้เลย!\n\n### สิ่งที่จะได้เรียนรู้:\n- การตั้งค่า Supabase RLS\n- การเขียน React UI ด้วย Tailwind v4\n- การนำขึ้น GitHub Pages ด้วย `npm run deploy`', 'Web Dev', '5 นาที'),
('แนวทางการจัดการ State ใน React สำหรับผู้เริ่มต้น', '## สรุปแนวทางจัดการ State\nในโปรเจกต์ขนาดเล็กถึงปานกลาง การใช้ **useState** และ **useEffect** ร่วมกับ Supabase Client SDK เพียงพอสำหรับแอปพลิเคชันทุกรูปแบบ', 'React', '4 นาที');
