import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ProjectsPage from './pages/ProjectsPage'
import ArticlesPage from './pages/ArticlesPage'
import AdminModal from './components/AdminModal'
import ProfileModal from './components/ProfileModal'
import ProjectFormModal from './components/ProjectFormModal'
import ArticleFormModal from './components/ArticleFormModal'
import { supabase, isSupabaseConfigured } from './lib/supabaseClient'
import { AlertTriangle } from 'lucide-react'

// Demo Fallback Data
const DEFAULT_PROFILE = {
  id: 'demo-profile',
  name: 'นายธนาพล ตริสกุล',
  role: 'Full-Stack Developer & Educator',
  bio: 'เว็บไซต์ Portfolio แสดงผลงานและบทความ พัฒนาด้วย React (Vite) เชื่อมต่อฐานข้อมูล Supabase (PostgreSQL) ฟรี พร้อมระบบ Admin CMS ในตัว โฮสต์บน GitHub Pages',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'
}

const MOCK_PROJECTS = [
  {
    id: 'mock-1',
    title: 'E-Learning Platform System',
    description: '### ระบบจัดการการเรียนการสอนออนไลน์\nรองรับวิดีโอและแบบทดสอบสำหรับนักเรียน **มีระบบตรวจคะแนนอัตโนมัติ**\n- รองรับผู้เรียนพร้อมกัน 1,000+ คน\n- ระบบจัดการเนื้อหาคอร์สเรียลไทม์',
    tags: ['React', 'Supabase', 'Tailwind'],
    image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
    github_url: 'https://github.com',
    demo_url: 'https://demo.com'
  },
  {
    id: 'mock-2',
    title: 'Smart Classroom Management',
    description: '### แอปพลิเคชันเช็คชื่อและบันทึกคะแนน\nระบบบันทึกคะแนนเก็บแบบ Realtime พร้อมออกรายงานประจำภาคเรียน\n- สแกน QR Code เช็คชื่อ\n- คำนวณเกรดอัตโนมัติ',
    tags: ['React', 'Vite', 'PostgreSQL'],
    image_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80',
    github_url: 'https://github.com',
    demo_url: 'https://demo.com'
  }
]

const MOCK_ARTICLES = [
  {
    id: 'mock-a1',
    title: 'เริ่มต้นสร้าง Portfolio ฟรีด้วย React + Supabase บน GitHub Pages',
    content: '## บทนำ\nการสร้าง **Portfolio** ไม่จำเป็นต้องเสียค่าโฮสติ้งรายเดือน คุณสามารถใช้ **GitHub Pages** ร่วมกับ **Supabase PostgreSQL Free Tier** ได้เลย!\n\n### สิ่งที่จะได้เรียนรู้:\n- การตั้งค่า Supabase RLS\n- การเขียน React UI ด้วย Tailwind v4\n- การนำขึ้น GitHub Pages ด้วย `npm run deploy`',
    category: 'Web Dev',
    read_time: '5 นาที',
    created_at: new Date().toISOString()
  },
  {
    id: 'mock-a2',
    title: 'สรุปการใช้งาน Row Level Security (RLS) บน Supabase',
    content: '## สรุปแนวทางจัดการ State\nในโปรเจกต์ขนาดเล็กถึงปานกลาง การใช้ **useState** และ **useEffect** ร่วมกับ Supabase Client SDK เพียงพอสำหรับแอปพลิเคชันทุกรูปแบบ',
    category: 'Database',
    read_time: '4 นาที',
    created_at: new Date().toISOString()
  }
]

export default function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [user, setUser] = useState(null)
  
  const [profile, setProfile] = useState(DEFAULT_PROFILE)
  const [projects, setProjects] = useState([])
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  // Modals
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [isArticleFormOpen, setIsArticleFormOpen] = useState(false)
  const [editingArticle, setEditingArticle] = useState(null)

  useEffect(() => {
    fetchData()

    if (isSupabaseConfigured) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null)
      })

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null)
      })

      return () => subscription.unsubscribe()
    }
  }, [])

  const fetchData = async () => {
    setLoading(true)
    if (!isSupabaseConfigured) {
      setProjects(MOCK_PROJECTS)
      setArticles(MOCK_ARTICLES)
      setProfile(DEFAULT_PROFILE)
      setLoading(false)
      return
    }

    try {
      // Fetch Profile
      const { data: profData, error: profErr } = await supabase.from('profile').select('*').limit(1)
      if (profErr) {
        console.warn('Error fetching profile:', profErr.message)
      } else if (profData && profData.length > 0) {
        setProfile(profData[0])
      }

      // Fetch Projects
      const { data: projData, error: projErr } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (projErr) throw projErr
      setProjects(projData || [])

      // Fetch Articles
      const { data: artData, error: artErr } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false })

      if (artErr) throw artErr
      setArticles(artData || [])
    } catch (err) {
      console.warn('Error fetching Supabase data, using fallback:', err.message)
      setProjects(MOCK_PROJECTS)
      setArticles(MOCK_ARTICLES)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (email, password) => {
    if (!isSupabaseConfigured) {
      setUser({ email: 'admin@demo.com', id: 'mock-admin' })
      return
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    setUser(data.user)
  }

  const handleLogout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut()
    }
    setUser(null)
  }

  // Profile Save
  const handleSaveProfile = async (formData) => {
    if (!isSupabaseConfigured) {
      setProfile({ ...profile, ...formData })
      return
    }

    // Check if a profile record exists in DB
    const { data: existingProf } = await supabase.from('profile').select('id').limit(1)
    
    if (existingProf && existingProf.length > 0) {
      const { error } = await supabase.from('profile').update({
        name: formData.name,
        role: formData.role,
        bio: formData.bio,
        avatar_url: formData.avatar_url,
        updated_at: new Date().toISOString()
      }).eq('id', existingProf[0].id)
      if (error) throw error
    } else {
      const { error } = await supabase.from('profile').insert([{
        name: formData.name,
        role: formData.role,
        bio: formData.bio,
        avatar_url: formData.avatar_url
      }])
      if (error) throw error
    }
    await fetchData()
  }

  // Projects CRUD
  const handleSaveProject = async (formData, projectId) => {
    if (!isSupabaseConfigured) {
      if (projectId) {
        setProjects(projects.map(p => p.id === projectId ? { ...p, ...formData } : p))
      } else {
        setProjects([{ id: 'mock-' + Date.now(), ...formData }, ...projects])
      }
      return
    }

    if (projectId) {
      const { error } = await supabase.from('projects').update(formData).eq('id', projectId)
      if (error) throw error
    } else {
      const { error } = await supabase.from('projects').insert([formData])
      if (error) throw error
    }
    fetchData()
  }

  const handleDeleteProject = async (id) => {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบผลงานนี้?')) return
    if (!isSupabaseConfigured) {
      setProjects(projects.filter(p => p.id !== id))
      return
    }
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) alert('เกิดข้อผิดพลาดในการลบ: ' + error.message)
    else fetchData()
  }

  // Articles CRUD
  const handleSaveArticle = async (formData, articleId) => {
    if (!isSupabaseConfigured) {
      if (articleId) {
        setArticles(articles.map(a => a.id === articleId ? { ...a, ...formData } : a))
      } else {
        setArticles([{ id: 'mock-a' + Date.now(), created_at: new Date().toISOString(), ...formData }, ...articles])
      }
      return
    }

    if (articleId) {
      const { error } = await supabase.from('articles').update(formData).eq('id', articleId)
      if (error) throw error
    } else {
      const { error } = await supabase.from('articles').insert([formData])
      if (error) throw error
    }
    fetchData()
  }

  const handleDeleteArticle = async (id) => {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบบทความนี้?')) return
    if (!isSupabaseConfigured) {
      setArticles(articles.filter(a => a.id !== id))
      return
    }
    const { error } = await supabase.from('articles').delete().eq('id', id)
    if (error) alert('เกิดข้อผิดพลาดในการลบ: ' + error.message)
    else fetchData()
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-sky-500/30 selection:text-sky-200">
      {/* Demo Warning Banner */}
      {!isSupabaseConfigured && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 text-center text-xs text-amber-300 font-medium flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
          <span>
            <strong>Demo Mode:</strong> คุณยังไม่ได้ระบุคีย์ Supabase ในไฟล์ `.env` ระบบจึงรันด้วยข้อมูลจำลองสำหรับทดสอบ UI & Admin CMS
          </span>
        </div>
      )}

      {/* Header Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        user={user}
        onOpenLogin={() => setIsLoginOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main View */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <Home 
            profile={profile}
            projects={projects} 
            articles={articles} 
            isAdmin={Boolean(user)}
            onNavigate={setActiveTab}
            onOpenEditProfile={() => setIsProfileModalOpen(true)}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsPage 
            projects={projects} 
            isAdmin={Boolean(user)}
            onOpenAdd={() => { setEditingProject(null); setIsProjectFormOpen(true) }}
            onEdit={(proj) => { setEditingProject(proj); setIsProjectFormOpen(true) }}
            onDelete={handleDeleteProject}
          />
        )}

        {activeTab === 'articles' && (
          <ArticlesPage 
            articles={articles} 
            isAdmin={Boolean(user)}
            onOpenAdd={() => { setEditingArticle(null); setIsArticleFormOpen(true) }}
            onEdit={(art) => { setEditingArticle(art); setIsArticleFormOpen(true) }}
            onDelete={handleDeleteArticle}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-8 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4">
          <p>© {new Date().getFullYear()} KruJun Dev Portfolio. Powered by React, Tailwind CSS v4 & Supabase PostgreSQL.</p>
        </div>
      </footer>

      {/* Admin Modals */}
      <AdminModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onSave={handleSaveProfile}
        profile={profile}
      />

      <ProjectFormModal 
        isOpen={isProjectFormOpen} 
        onClose={() => setIsProjectFormOpen(false)}
        onSave={handleSaveProject}
        editingProject={editingProject}
      />

      <ArticleFormModal 
        isOpen={isArticleFormOpen} 
        onClose={() => setIsArticleFormOpen(false)}
        onSave={handleSaveArticle}
        editingArticle={editingArticle}
      />
    </div>
  )
}
